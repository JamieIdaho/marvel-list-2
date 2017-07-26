import React, {Component} from 'react';
import 'whatwg-fetch'
import CryptoJS from 'crypto-js';
import '../../scss/style.scss';

import CharacterListItem from './CharacterListItem';

import config from '../config';

let ts = new Date().getTime();
let hash = CryptoJS.MD5(ts + config.privateKey + config.publicKey).toString();
let marvelUrl = config.marvelEndPoint + '?ts=' + ts + '&apikey=' + config.publicKey + '&hash=' + hash + '&limit=5';

class MarvelCharacterList extends Component {

    state = {
        expandedCharacterId: null,
    };

    componentDidMount() {
        fetch(marvelUrl)
            .then(function (response) {
                return response.json()
            })
            .then(json => {
                this.setState({
                    marvelData: json
                })
            })
    }

    handleExpandClick = (characterId) => () => {
        this.setState({expandedCharacterId: characterId});
    };

    render() {
        const {marvelData, expandedCharacterId} = this.state;

        if (!marvelData) {
            return <p>Loading...</p>
        }

        const characters = marvelData.data.results.map((character) => (
            <CharacterListItem
                character={character}
                isExpanded={expandedCharacterId === character.id}
                onExpandClick={this.handleExpandClick(character.id)}
            />
        ));

        return (
            <div className="marvel-list-container">
                <h1>Meet Your Marvel Characters</h1>
                <ul className="marvel-list">{ characters }</ul>
                <div className="attribution-text"><a href="http://marvel.com">{ marvelData.attributionText }</a></div>
            </div>
        )
    }
}

export default MarvelCharacterList;