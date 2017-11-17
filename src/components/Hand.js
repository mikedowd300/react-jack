import React from 'react';
import Card from './Card';

const Hand = props => {
  return(
    <div className="wrapper flexer-center">
      {props.cards.map((card, index) => <Card card={card} key={index} /> )}
    </div>
  )
}

export default Hand;
