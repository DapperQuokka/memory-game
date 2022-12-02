import React from "react";
import "./Card.css"

function Card({ card, name, f }) {
    const bg = require('../static/bg.jpeg')
    const src = require(`../static/${card}.png`);

    return (
        <div className="card-container" style={{backgroundImage: `url(${bg})`}} onClick={() => f(card)}>
            <div className="card-content" style={{ backgroundImage: `url(${src})` }} />
            <h3>{name}</h3>
        </div>
    )
}

export default Card;