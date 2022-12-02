import React from "react";
import "./Card.css"

function Card({ card, name, f, d }) {
    const bg = require('../static/bg.jpeg')
    const src = require(`../static/${card}.png`);

    return (
        <div className="card-container" style={{ backgroundImage: `url(${bg})` }} onClick={() => f(card)}>
            {d == 12
                ? <div className="card-content" style={{ backgroundImage: `url(${src})`, width: `20vh`, height: `20vh` }} />
                : <div>{d == 24
                    ? <div className="card-content" style={{ backgroundImage: `url(${src})`, width: `14vh`, height: `14vh` }} />
                    : <div className="card-content" style={{ backgroundImage: `url(${src})`, width: `10vh`, height: `10vh` }} />
                }</div>}
            {d == 12 
                ? <h3 style={{fontSize: `1.5rem`}}>{name}</h3>
                : <>{ d== 24
                        ? <h3 style={{fontSize: `1.25rem`}}>{name}</h3>
                        : <h3 style={{fontSize: `1rem`}}>{name}</h3>}
            </>}
        </div>
    )
}

export default Card;