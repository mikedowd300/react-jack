import React from 'react';

const Card = (props) => {
  let backOfCardUrl = 'http://www.murphysmagicsupplies.com/images_email/Mandolin_BACK.jpg';

  return (
    <div className={props.card.isDealerCard ? "dealer-card-wrapper" : "card-wrapper"}>
      <img className="wrapper" src={props.card.isHoleCard ? backOfCardUrl : props.card.image} alt={props.code} />
    </div>
  )
}

export default Card;

