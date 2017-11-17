import React, { Component } from 'react';
import AddPlayerForm from './AddPlayerForm';
import Player from './Player';

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePlayer: 1,
            deck: this.props.deck,
            shufflePoint: 25,
            shouldShuffle: false,
            displayDealBtn: true,
            placedBets: false,
            insuranceOffered: false,
            insuredCount: 0,
            players: [],
            dealer: {
                name: 'Dealer',
                id: 0,
                isDealer: true,
                hands: [
                  {
                    name: 'Dealer',
                    cards: []
                  }
                ],
                bankroll: null
            }
        };
        this.addNewPlayer = this.addNewPlayer.bind(this);
        this.updatePlayerById = this.updatePlayerById.bind(this);
        this.deal = this.deal.bind(this);
        this.updateDealer = this.updateDealer.bind(this);
        this.calculateHardValue = this.calculateHardValue.bind(this);
        this.getCardsVal = this.getCardsVal.bind(this);
        this.calculateSoftValue = this.calculateSoftValue.bind(this);
        this.getHandsValues = this.getHandsValues.bind(this);
    }

    nextId = 0;

    componentWillReceiveProps(nextProps) {
        this.setState({
            deck: nextProps.deck,
            deckIsFull: true
        },() => this.render());
    }

    incActivePlayer() {
        let activePlayer = this.state.activePlayer;
        if(activePlayer > this.state.players.length) {
            activePlayer === 0
        } else {
            activePlayer++;
        }
        this.setState({
            activePlayer
        });
    }

    addNewPlayer(name) {
        if(this.state.players.length < 7) {
            let player = {
                name,
                id: this.nextId++,
                bankroll: 90,
                wager: 10,
                hands: [{cards: []}],
                isDealer: false,
                hasPlayed: false
            }
            let players = this.state.players.slice(0);
            players.push(player);
            this.setState({
                players
            });
        }
    }

    getCardsVal(val) {
      switch(val.split('')[0]) {
        case 'A':
          return 11;
        case '0':
          return 10;
        case 'J':
          return 10;
        case 'Q':
          return 10;
        case 'K':
          return 10;
        default:
          return parseInt(val.split('')[0], 10);
      }
    }

    getAceCount(cards) {
      let count = 0;
      cards.forEach(card => {
        if(card.code.split('')[0] === 'A') {
          count++;
        }
      });
      return count;
    }

    calculateHardValue(cards) {
      let val = 0;
      cards.forEach((card) =>{
        val += this.getCardsVal(card.code)
      });
      return val;
    }

    calculateSoftValue(hard, aceCount) {
      let tempAceCount = aceCount
      let soft = hard;
      if(aceCount > 0 && hard > 21) {
        while(tempAceCount > 0 && hard > 21) {
          soft -= 10;
          tempAceCount--;
        }
      }
      if(aceCount > 0 && hard < 21) {
        soft -= 10;
      }
      return soft;
    }

    getHandsValues(players) {
      players.forEach(player => {
          player.hands.forEach(hand => {
              hand.hardValue = this.calculateHardValue(hand.cards);
              let aceCount = this.getAceCount(hand.cards);
              hand.softValue = this.calculateSoftValue(hand.hardValue, aceCount);
              hand.hardValue = hand.hardValue > 21 ? hand.softValue : hand.hardValue;
              hand.isBusted = hand.softValue > 21;
              hand.isBlackJack =  hand.cards.length === 2 && hand.hardValue === 21;
              hand.isSplittable = hand.cards.length === 2 && this.getCardsVal(hand.cards[0].code) === this.getCardsVal(hand.cards[1].code);
              hand.isDoubleAble = hand.cards.length === 2 && hand.hardValue < 21;
              hand.isHittable = !hand.isBlackJack && !hand.isBusted;
          });
      });
      return players;
    }

    dealFirstTwoCards() {
        console.log('dealing the first 2 cards');
        let deck = this.state.deck.slice(0);
        let players = this.state.players.slice(0);
        let dealer = Object.assign({},this.state.dealer);

        console.log(players);

        for(let i = 0; i < 2; i++) {
            players.forEach(player => {
                player.hands[0].cards.push(deck.pop());
            });
            dealer.hands[0].cards.push(deck.pop());
            dealer.hands[0].cards[i].isDealerCard = true;
            if(i === 1) {
                dealer.hands[0].cards[1].isHoleCard = true;
            }
        }

        console.log(players);

        players = this.getHandsValues(players);

        this.setState({
            deck,
            players,
            dealer
        }, () => console.log(this.state));
    }

    updatePlayerById(player) {
        let players = this.state.players.slice(0);
        players[player.id - 1] = Object.assign({}, player);
        this.setState({
            players
        });
    }

    updateDealer(dealer) {
        this.setState({
            dealer
        });
    }

    deal() {
      console.log(this.state);
        this.setState({
            placedBets: true
        }, () => {
          console.log(this.state);
          this.dealFirstTwoCards();
        });
    }

    render() {
        let players = [];
        this.state.players.forEach((player, index) => {
            players.push(<Player incActivePlayer={this.incActivePlayer}
                player={player}
                placedBets={this.state.placedBets}
                updatePlayerById={this.updatePlayerById}
                key={index}/>)
        });
        return (
        <div className="game-wrapper wrapper">
            <div className="dealer-wrapper">
                <div className={!this.state.placedBets ? 'wrapper' : 'hide'}>
                    <AddPlayerForm
                        addNewPlayer={this.addNewPlayer}
                        deal={this.deal}/>
                </div>
                <div className={this.state.placedBets ? 'wrapper' : 'hide'}>
                    <Player
                        incActivePlayer={this.incActivePlayer}
                        player={this.state.dealer}
                        updateDealer={this.updateDealer}/>
                </div>
            </div>
            <div className="players-wrapper flexer">
                {players}
            </div>
        </div>
        );
    }
}

export default Game;
