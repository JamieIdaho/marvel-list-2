import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';
import config from '../config';
import CharacterExpandedDetails from './CharacterExpandedDetails';

let ts = new Date().getTime();
let hash = CryptoJS.MD5(ts + config.privateKey + config.publicKey).toString();

class CharacterListItem extends Component {

    static propTypes = {
        character: PropTypes.object.isRequired,
        onExpandClick: PropTypes.func.isRequired,
        isExpanded: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        isExpanded: false,
    };

    state = {
        characterData: null,
    };

    componentWillUpdate(nextProps) {
        if (nextProps.isExpanded && !this.props.isExpanded) {
            this.getCharacter(this.props.character.id);
        }
    }

    getCharacter(characterId) {
        fetch(`http://gateway.marvel.com/v1/public/characters/` + characterId + '?ts=' + ts + '&apikey=' + config.publicKey + '&hash=' + hash)
            .then(function (response) {
                return response.json()
            })
            .then(json => {
                this.setState({
                    characterData: json
                })
            })
    }

    render() {
        const {character, isExpanded, onExpandClick} = this.props;
        const {characterData} = this.state;

        return (
            <li className={`marvel-character ${isExpanded ? 'expanded' : 'collapsed'}`}
                onClick={onExpandClick}>
                <div className="character-image"><img
                    src={character.thumbnail.path + '.' + character.thumbnail.extension}
                    alt={character.name}/></div>


                <div className="character-info">
                    <div className="character-name">{character.name}</div>
                    <div className="character-description">{ character.description }</div>
                    {characterData && (
                        <CharacterExpandedDetails character={character} details={characterData}/>
                    )}
                </div>
            </li>
        );
    }
}

export default CharacterListItem;