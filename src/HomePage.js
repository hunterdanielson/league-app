import React, { Component } from 'react'
import request from 'superagent'

export default class HomePage extends Component {

    state = { playerName: '', games: [], champions: [] }
    componentDidMount() {
        fetch('http://ddragon.leagueoflegends.com/cdn/10.12.1/data/en_US/champion.json')
            .then(res => res.json())
            .then(json => this.setState({ champions: json.data }))
    }

    handleChange = (e) => {
        this.setState({ playerName: e.target.value })
    }

    whatChampion = (gamesChampId) => {
        const allChampions = this.state.champions;
        for(const champion in allChampions) {
            if(Number(allChampions[champion].key) === gamesChampId) {
                return allChampions[champion].id
            }
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const playerData = await request.get(`https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.state.playerName}?api_key=${process.env.REACT_APP_API_KEY}`)
        console.log(playerData.body.accountId)

        const gameData = await request.get(`https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${playerData.body.accountId}?api_key=${process.env.REACT_APP_API_KEY}`)

        console.log(gameData, 'game data')
        this.setState({ player: playerData.body, games: gameData.body.matches })
    }

    render() {
        console.log(this.state, 'state')
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Input Sumoner name
                        <input onChange={this.handleChange} />
                    </label>
                    <button>Submit</button>
                </form>
                {
                    this.state.player &&
                    <div>
                        <p>Your accountId: {this.state.player.accountId}</p>
                        <p>Your id: {this.state.player.id}</p>
                    </div>
                }
                {
                    this.state.games && this.state.player &&
                    <ul>
                        {this.state.games.map(game => <li><p>Game Id: {game.gameId}</p><p>Champion id: {game.champion}</p><p>Champion: {this.whatChampion(game.champion)}</p><p>Lane: {game.lane}</p></li>)}
                    </ul>
                }
            </div>
        )
    }
}
