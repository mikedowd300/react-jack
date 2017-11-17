import React, { Component } from 'react';
import Card from './Card';

const Hand = props => {
  let cards = props.cards;
  // let hardValue = props.hardValue;
  // let softValue = props.softValue;
  // let isBusted = props.isBusted;
  // let isBlackJack = props.isBlackJack;
  // let isHittable = props.isHittable;
  // let isDoubleAble = props.isDoubleAble;
  // let isSplittable = props.isSplittable;
  // let isInsurable = false;
  // let isInsured = false;

  cards = cards.map((card, index) => {
    cards.push(<Card card={card} key={index}/>);
  });

  return(
    <div className="wrapper flexer-center">
      {cards}
    </div>
  )
}

export default Hand;
