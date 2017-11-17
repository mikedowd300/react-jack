import React from 'react';

const Wager = (props) => {

    return (
      <div className="wrapper">
        <div className="message">
          <h1>Place Your Bet!!!!</h1>
        </div>
        <div className="width-wrapper flexer">
          <input className="wager-btn" defaultValue="+" onClick={() => props.changeWager(10)} />
          <p>{props.wager}</p>
          <input className="wager-btn" defaultValue="-" onClick={() => props.changeWager(-10)} />
        </div>
      </div>
    )
}

export default Wager;

