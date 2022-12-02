import React from "react";
import Card from "./Card"
import "./CardList.css"

function CardList({ cards, f, d}) {
    return (
        <div className="card-list-container">
            {cards.map((card) => {
                return (<Card f={f} d={d} key={card.id} card={card.id} name={card.name}/>)
            })}
        </div>
    )
}

export default CardList;