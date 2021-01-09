import './App.css';
import './Map.css';
// import Map from './india.svg';
import IndiaMap from './IndiaMap';
import { useState } from "react";
import data from "./data.js";


function App() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(0);
  const [gameEnded, setGameEnded] = useState(0);

  function nextQuestion() {
    setQuestion(question + 1);
  }
  function updateScore(answer) {
    if (answer === data[question].stateName) {
      setScore(score + 1);
    }
  }
  function endGame() {
    setGameEnded(1);
  }
  function onMapClick(e) {
    let title = e.target.getAttribute("title");
    if (title) {
      let clicked = e.target.getAttribute("title");
      if (!gameEnded) {
        updateScore(clicked);
      }
      if (question >= data.length - 1) {
        endGame();
      } else {
        nextQuestion();
      }
    }
  }
  function startGame(){
    setQuestion(0);
    setScore(0);
    setGameEnded(0);
  }

  let questionText = gameEnded ? "Completed!" : data[question].cmName;

  return (
    <div className="App">
      <div className="header">
        <div className="title">Do you know Chief Ministers of India?</div>
        <br/>
        <div className="score">You know - {score}/{data.length}</div>
        <br/>
        <div className="question">{questionText}</div>
        <br/>
        {gameEnded === 1 && <div onClick={startGame}>Restart</div>}
      </div>
      <div className="map-container">
        <IndiaMap onClick={onMapClick}/>
      </div>
    </div>
  );
}

export default App;
