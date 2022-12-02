import React, { useEffect, useState } from "react";
import CardList from "./components/CardList"
import "./App.css"
function App() {

  const pokemon = [
    { id: 1, name: "Bulbasaur" },
    { id: 2, name: "Charmander" },
    { id: 3, name: "Squirtle" },
    { id: 4, name: "Pikachu" },
    { id: 5, name: "Eevee" },
    { id: 6, name: "Chikorita" },
    { id: 7, name: "Cyndaquil" },
    { id: 8, name: "Totodile" },
    { id: 9, name: "Treecko" },
    { id: 10, name: "Torchic" },
    { id: 11, name: "Mudkip" },
    { id: 12, name: "Meowth" },
    { id: 13, name: "Vulpix" },
    { id: 14, name: "Phanpy" },
    { id: 15, name: "Skitty" },
    { id: 16, name: "Turtwig" },
    { id: 17, name: "Chimchar" },
    { id: 18, name: "Piplup" },
    { id: 19, name: "Shinx" },
    { id: 20, name: "Munchlax" },
    { id: 21, name: "Riolu" },
    { id: 22, name: "Snivy" },
    { id: 23, name: "Oshawott" },
    { id: 24, name: "Tepig" },
    { id: 25, name: "Chespin" },
    { id: 26, name: "Fennekin" },
    { id: 27, name: "Froakie" },
    { id: 28, name: "Axew" },
    { id: 29, name: "Dedenne" },
    { id: 30, name: "Emolga" },
    { id: 31, name: "Bidoof" },
    { id: 32, name: "Pachirisu" },
    { id: 33, name: "Victini" },
    { id: 34, name: "Scrafty" },
    { id: 35, name: "Pancham" },
    { id: 36, name: "Teddiursa" }]

  const [start, setStart] = useState(false);
  const [guess, setGuess] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [diff, setDiff] = useState(12);
  const [time, setTime] = useState(diff * 5);
  const [cards, setCards] = useState(pokemon.slice(0, diff))
  const [intrvl, setIntrvl] = useState(undefined);
  const [gameOver, setGameOver] = useState(false);

  function handleClick(card) {
    if (guess.includes(card)) {
      if (score > highScore) {
        setHighScore(score)
      }
      setGameOver(true);
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
  const logo = require("./static/logo.png")

  function restart() {
    setGuess([])
    if (score > highScore) {
      setHighScore(score);
    }
    setScore(0)
    shuffleCards(cards)
    setTime(5 * diff);
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

  function startGame() {
    console.log(`startng game, diff:${diff}`)
    console.log(pokemon.slice(0, diff));
    console.log(pokemon)
    setCards(pokemon.slice(0, diff));
    setTime(5 * diff);
    setGuess([])
    setScore(0)
    setHighScore(0)
    setGameOver(false);
    clearInterval(intrvl);
    setStart(true);
  }

  useEffect(() => {
    if (time === 0) {
      clearInterval(intrvl)
      setGameOver(true);
    }
  }, [time, intrvl])


  return (
    <div className="App">
      {!start ? <div className="win-screen">
        <div className="logo" style={{ backgroundImage: `url(${logo})` }} />
        <h1 className="header-content">Welcome to the Pokemon Mystery Dungeon Memory Game!</h1>
        <button onClick={() => startGame()}>Click to Start!</button>
        <div className="selector"><select name="difficulty" onChange={(e) => {
          setDiff(e.target.value)
          }}>
          <option value={12}>Easy</option>
          <option value={24}>Normal</option>
          <option value={36}>Hard</option>
        </select></div>
      </div> :

        <>{score < diff
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
            <button onClick={() => {setStart(false); setDiff(12); clearInterval(intrvl)}}>Main Menu</button>
          </div> : <div>
            <div className="header">
              <h2 className="header-content">Score: {score}</h2>
              <h2 className="header-content">High Score: {highScore}</h2>
              <h2 className="header-content timer" style={{ color: time <= 10 ? "red" : "white" }}>Timer: {time}</h2>
              <button onClick={() => {setStart(false); setDiff(12); clearInterval(intrvl)}}>Main Menu</button>
            </div>
            <div className="instruction">
              <h3>Get points by clicking on an image. You can only click each image once!</h3>
            </div>
            <CardList f={handleClick} cards={cards.slice(0, diff)} d={diff} /></div>}</div>
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
            <button onClick={() => {setStart(false); setDiff(12); clearInterval(intrvl)}}>Main Menu</button>
          </div>}</>}
    </div>
  );
}

export default App;
