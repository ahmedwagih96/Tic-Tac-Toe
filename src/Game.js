import { useState } from "react";
import Square from "./components/Square";
import Confetti from "react-confetti";

const Game = () => {
  // Setting Initial Squares to Null
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Setting first player as true (true === X)
  const [player, setPlayer] = useState(true);

  // Setting board array
  const board = squares.map((square, ind) => (
    <Square key={ind} value={square} handleClick={() => handleClick(ind)} />
  ));

  // Function to handle square click
  const handleClick = (i) => {
    // Check if the game is won by a player
    const winnerDeclared = Boolean(calculateWinner(squares));

    // Check if the clicked square is previously filled
    const squareFilled = Boolean(squares[i]);

    // Return early if any of winnerDeclared or squareFilled is true
    if (winnerDeclared || squareFilled) {
      return;
    }

    // Updating the squares state
    setSquares((prevSquares) => {
      const newSquares = prevSquares;
      newSquares[i] = player ? "X" : "O";
      return newSquares;
    });

    // Updating the player state
    setPlayer((prevState) => !prevState);
  };

  // Updating the game status
  const gameWon = calculateWinner(squares);
  const gameStatus = gameWon
    ? `Winner: ${gameWon}`
    : `Next player: ${player ? `X` : "O"}`;

  //Helper Function to determine if the game is won
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], //Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], //Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonal
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function playAgain(){
    setPlayer(true)
    setSquares(Array(9).fill(null))
  }
  return (
    <div className="game">
      <h1 className="heading">Tic-Tac-Toe Game</h1>
      {calculateWinner(squares) && <Confetti />}
      <div className="status">{gameStatus}</div>
      <div className="board">{board}</div>
      {calculateWinner(squares) && <button className="play-again" onClick={playAgain}>Play Again</button>}
    </div>
  );
};

export default Game;
