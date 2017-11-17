import React, { Component } from 'react';
import Card from './Card';

class Hand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards,
      hardValue: 0,
      softValue: 0,
      isBusted: false,
      isBlackJack: false,
      isHittable: true,
      isDoubleAble: false,
      isSplittable: false,
      isInsurable: false,
      isInsured: false
    }

    // this.cards = props.cards;
    // this.hardValue = 0;
    // this.softValue = 0;
    // this.isBusted = false;
    // this.isBlackJack = false;
    // this.isHittable = true;
    // this.isDoubleAble = false;
    // this.isSplittable = false;
    // this.isInsurable = false;
    // this.isInsured = false;

    this.calculateHardValue = this.calculateHardValue.bind(this);
    this.calculateHandValues = this.calculateHandValues.bind(this);
    this.calculatSoftValue = this.calculatSoftValue.bind(this);
    this.getAceCount = this.getAceCount.bind(this);
    this.getCardsVal = this.getCardsVal.bind(this);
  }

  componentDidMount() {
    this.calculateHandValues();
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

  getAceCount() {
    let count = 0;
    this.state.cards.forEach(card => {
      if(card.code.split('')[0] === 'A') {
        count++;
      }
    });
    return count;
  }

  calculatSoftValue(hard, aceCount) {
    let tempAceCount = aceCount
    let soft = hard;
    if(aceCount > 0 && hard > 21) {
      while(tempAceCount > 0 && soft > 21) {
        soft -= 10;
      }
    }
    if(aceCount > 0 && hard < 21) {
      soft -= 10;
    }
    return soft;
  }

  calculateHardValue() {
    let val = 0;
    console.log(this.state.cards);
    this.state.cards.forEach((card) =>{ 
      console.log(card.code);
      val += this.getCardsVal(card.code)
    });
    console.log(val);
    return val;
  }

  calculateHandValues() {
    let hardValue = this.calculateHardValue();
    let aceCount = this.getAceCount();
    let softValue = this.calculatSoftValue(hardValue, aceCount);
    console.log(hardValue, softValue);
    hardValue = hardValue > 21 ? softValue : hardValue; 
    let isBusted = softValue > 21;
    let isBlackJack =  this.state.cards.length === 2 && hardValue === 21;
    let  isSplittable = this.state.cards.length === 2 && this.getCardsVal(this.state.cards[0].code) === this.getCardsVal(this.state.cards[1].code);
    let isDoubleAble = this.state.cards.length === 2 && hardValue < 21;
    let isHittable = !isBlackJack && !isBusted;
    // this.setState({
    //   hardValue,
    //   softValue,
    //   isBusted,
    //   isBlackJack,
    //   isSplittable,
    //   isDoubleAble,
    //   isHittable,
    //   isInsurable: false,
    //   isInsured: false
    // }, () => console.log(this.state));
  }

  render() {
    let cards = [];
    this.state.cards.forEach((card, index) => {
      cards.push(<Card card={card} key={index}/>);
    });
    return(
      <div className="wrapper flexer-center">
        {cards}
      </div>
    )
  }

}

export default Hand;
