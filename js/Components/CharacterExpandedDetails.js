import React, {Component} from 'react';

class CharacterExpandedDetails extends Component {
    render() {
        const {character, characterData} = this.props;
        return (
            <div className="character-expanded-content">
                <div>{JSON.stringify(characterData)}</div>
                <div className="character-details">
                    <div>{ character.name } has appeared in <span>{ character.comics.available }</span> comics,
                        <span>{ character.series.available }</span> series,
                        and <span>{ character.stories.available }</span> stories.
                    </div>
                </div>
            </div>
        );
    }
}

export default CharacterExpandedDetails;