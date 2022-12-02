import React, { useEffect, useState } from "react";
import CardList from "./components/CardList"
import "./App.css"
function App() {

  const [cards] = useState([
    { id: 1, name: "Bulbasaur" },
    { id: 2, name: "Charmander" },
    { id: 3, name: "Squirtle" },
    { id: 4, name: "Pikachu" },
    { id: 5, name: "Chikorita" },
    { id: 6, name: "Cyndaquil" },
    { id: 7, name: "Totodile" },
    { id: 8, name: "Teddiursa" },
    { id: 9, name: "Phanpy" },
    { id: 10, name: "Treecko" },
    { id: 11, name: "Torchic" },
    { id: 12, name: "Mudkip" },]);

  const [guess, setGuess] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [time, setTime] = useState(60);
  const [intrvl, setIntrvl] = useState(undefined);
  const [gameOver, setGameOver] = useState(false);

  function handleClick(card) {
    if (guess.includes(card)) {
      if (score > highScore) {
        setHighScore(score)
      }
      setGameOver(true);
      // setGuess([])
      // setScore(0)
      // shuffleCards(cards);
      // setTime(60)
    } else {
      setScore(score + 1);
      setGuess([...guess, card]);
      shuffleCards(cards);
    }
    if (guess.length === 0) {
      setIntrvl(tick());
    }
  }

  const bulb = require("./static/bulb.png");
  const char = require("./static/char.png");
  const pika = require("./static/pika.png");
  const squi = require("./static/squi.png");
  const bulbD = require("./static/bulbD.png");
  const charD = require("./static/charD.png");
  const pikaD = require("./static/pikaD.png");
  const squiD = require("./static/squiD.png");

  function restart() {
    setGuess([])
    setScore(0)
    shuffleCards(cards)
    setTime(60);
    setGameOver(false);
    clearInterval(intrvl);
  }

  function shuffleCards(cards) {
    cards.sort(() => Math.random() - 0.5)
  }

  function tick() {
    const interval = setInterval(() => {
      setTime(time => (time - 1));
    }, 1000);
    return interval
  }

  useEffect(() => {
    if (time === 0) {
      clearInterval(intrvl)
      setGameOver(true);
    }
  }, [time, intrvl])


  return (
    <div className="App">
      {score < 12
        ?
        <div> {gameOver ? <div className="win-screen">
          <div className="sad">
            <div className="endCard" style={{ backgroundImage: `url(${bulbD})` }} />
            <div className="endCard" style={{ backgroundImage: `url(${charD})` }} />
            <div className="endCard" style={{ backgroundImage: `url(${squiD})` }} />
            <div className="endCard" style={{ backgroundImage: `url(${pikaD})` }} />
          </div>
          <h1 className="header-content">Sorry, looks like you didn't make it...</h1>
          <button onClick={() => restart()}>Play Again</button>
        </div> : <div>
          <div className="header">
            <h2 className="header-content">Score: {score}</h2>
            <h2 className="header-content">High Score: {highScore}</h2>
            <h2 className="header-content timer" style={{ color: time <= 10 ? "red" : "white" }}>Timer: {time}</h2>
          </div>
          <div className="instruction"><h3>Get points by clicking on an image. You can only click each image once!</h3></div>
          <CardList f={handleClick} cards={cards} /></div>}</div>
        :
        <div className="win-screen">
          <div className="joy">
            <div className="endCard" style={{ backgroundImage: `url(${bulb})` }} />
            <div className="endCard" style={{ backgroundImage: `url(${char})` }} />
            <div className="endCard" style={{ backgroundImage: `url(${squi})` }} />
            <div className="endCard" style={{ backgroundImage: `url(${pika})` }} />
          </div>
          <h1 className="header-content">Horray! You WIN!</h1>
          <button onClick={() => restart()}>Play Again</button>
        </div>}
    </div>
  );
}

export default App;
