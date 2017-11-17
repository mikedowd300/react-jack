import React, { Component } from 'react';
import axios from 'axios';
import Game from './components/Game';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck : [],
      shufflePoint: 25,
      shouldShuffle : false
    }
  }

  componentWillMount() {
    this.shuffle();
  }

  shuffle() {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then((data) => {
      axios.get(`https://deckofcardsapi.com/api/deck/${data.data.deck_id}/draw/?count=52`)
      .then(data => {
        data.data.cards.forEach((card) => {
          card.isHoleCard=false;
          card.isDealerCard = false;
        });
        this.setState({
          deck: data.data.cards
        });
      });
    })
  }

  updateShouldShuffle(cardsInDeck) {
    if(cardsInDeck >= this.state.shufflePoint) {
      this.setState({
        shouldShuffle: true
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Game deck={this.state.deck}
          updateShouldShuffle={this.updateShouldShuffle}/>
      </div>
    );
  }
}

export default App;
