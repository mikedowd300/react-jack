import React, { Component } from 'react';
import Wager from './Wager';
import Hand from './Hand';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.player.id,
      name: this.props.player.name,
      bankroll: 90,
      wager: 10,
      hands: [{cards: []}],
      activeHand: 0,
      isDealer: (this.props.player.isDealer ? this.props.player.isDealer : false),
      hasPlayed: false
    };

    let player = Object.assign({}, this.state);
    if(!this.state.isDealer) {
      props.updatePlayerById(player);
    } else {
      props.updateDealer(player);
    }
    this.changeWager = this.changeWager.bind(this);
  }

  changeWager(amt) {
    let wager = this.state.wager;
    let bankroll = this.state.bankroll;
    if(amt < 0) {
      if(-wager > amt) {
        amt = -wager;
      }
    } else {
      if(amt > bankroll) {
        amt = bankroll
      }
    }
    wager += amt;
    bankroll = bankroll - amt;
    this.setState({
      wager,
      bankroll
    }, () => {console.log(this.state.wager, this.state.bankroll)});
  }

  render() {
    let hands = [];
    this.state.hands.forEach((hand, index) => {
      hands.push(<Hand cards={hand.cards} key={index} />);
    });
    return (
    <div className={ this.state.isDealer ? "inner-dealer-wrapper" : "player-wrapper"}>
      <div className="info-wrapper flexer">
        <p>{this.props.player.name}</p>
        <p>{this.props.player.bankroll}</p>
      </div>

      <div className={ !this.props.placedBets ? 'hide' : 'hands-wrapper' }>
        {hands}
      </div>
      <div className={this.state.isDealer || this.props.placedBets ? 'hide' : 'wager-wrapper'}>
        <Wager wager={this.state.wager} changeWager={this.changeWager}/>
      </div>
    </div>
    );
  }
}

export default Player;
