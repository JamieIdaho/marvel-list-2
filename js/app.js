import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../scss/style.scss';
import MarvelCharacterList from './Components/MarvelCharacterList.js';


class App extends Component {
    render() {
        return (
            <div>
                <MarvelCharacterList  />
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));