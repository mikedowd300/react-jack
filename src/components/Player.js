import React from 'react';
import Wager from './Wager';
import Hand from './Hand';

const Player = (props) => {

  let changeWager = (amt) => {
    let wager = props.player.wager;
    let bankroll = props.player.bankroll;
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
    props.updateWager(wager, bankroll, props.player.id);
  }
    
  return (
    <div className={ props.player.isDealer ? "inner-dealer-wrapper" : "player-wrapper"}>
      <div className="info-wrapper flexer">
        <p>{ props.player.name }</p>
        { !props.player.isDealer ? <p>{ props.player.bankroll }</p> : ''}
      </div>

      <div className={ !props.placedBets ? 'hide' : 'hands-wrapper' }>
        {props.player.hands.map((hand, index) => <Hand cards={hand.cards} key={index} /> )}
      </div>
      <div className={props.player.isDealer || props.placedBets ? 'hide' : 'wager-wrapper'}>
        <Wager wager={props.player.wager} changeWager={changeWager}/>
      </div>
    </div>
  )
}

export default Player;
