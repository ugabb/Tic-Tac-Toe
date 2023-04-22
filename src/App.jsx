import { useState, useEffect } from "react";

import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";

function App() {
  // 0 == empty, 1 == x, 2 == o
  const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [sequenceWinner, setSequenceWinner] = useState([]);
  const [showWithDelay, setShowWithDelay] = useState(false);
  const [play, setPlay] = useState(false);

  const winnerCombinations = [
    // horizontal
    { indexes: [0, 1, 2], direction: "horizontal" },
    { indexes: [3, 4, 5], direction: "horizontal" },
    { indexes: [6, 7, 8], direction: "horizontal" },

    // vertical
    { indexes: [0, 3, 6], direction: "vertical" },
    { indexes: [1, 4, 7], direction: "vertical" },
    { indexes: [2, 5, 8], direction: "vertical" },

    // diagonals
    { indexes: [0, 4, 8], direction: "diagonal-1" },
    { indexes: [2, 4, 6], direction: "diagonal-2" },
  ];

  function handleClick(currentIndex, value) {
    if (winner) return;
    const newBoard = [...board];

    // x turn
    if (turn === 1) {
      if (value === 0) {
        newBoard[currentIndex] = 1;
        setBoard(newBoard);
      } else return;
    }
    // o turn
    if (turn === 2) {
      if (value === 0) {
        newBoard[currentIndex] = 2;
        setBoard(newBoard);
      } else return;
    }

    // change turn
    turn === 1 ? setTurn(2) : setTurn(1);
  }

  function checkWinner() {
    for (let combination of winnerCombinations) {
      const { indexes } = combination;

      // if x win
      // console.log(indexes[0],indexes[1],indexes[2]);

      if (
        board[indexes[0]] === 1 &&
        board[indexes[1]] === 1 &&
        board[indexes[2]] === 1
      ) {
        setWinner("❌");
        setSequenceWinner((prev) => [...prev, indexes[0],indexes[1],indexes[2]]);
        // winner alert will show with 2 seconds of delay
        setTimeout(() => {
          setShowWithDelay(true);
        }, 2000);
      }
      // if o win
      if (
        board[indexes[0]] === 2 &&
        board[indexes[1]] === 2 &&
        board[indexes[2]] === 2
      ) {
        setWinner("⭕");
        setSequenceWinner((prev) => [...prev, indexes[0],indexes[1],indexes[2]]);
        // winner alert will show with 2 seconds of delay
        setTimeout(() => {
          setShowWithDelay(true);
        }, 2000);
      }
      if (winner) break;
    }
    return winner;
  }

  useEffect(() => {
    console.log("Sequence winner:", sequenceWinner);
  }, [sequenceWinner]);

  function resetGame() {
    setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setTurn(1);
    setWinner(null);
    setShowWithDelay(false);
    setSequenceWinner([])
  }

  useEffect(() => {
    checkWinner();
  }, [board]);

  return (
    <div className="container">
      <div className="play-container">
        <h1>Tic ❌ Tac ⭕ Toe</h1>

        {!play && (
          <button className="play" onClick={() => setPlay(true)}>
            Play!
          </button>
        )}
      </div>

      {play && (
        <div className="board-container">
          {board.map((value, index) => (
            <span
              className={`${value ? "alreadyPlaced" : ""} ${sequenceWinner.includes(index) ? 'winnerSequence' : ''}`}
              key={index}
              onClick={() => handleClick(index, value)}
            >
              {value === 0 ? "" : value === 1 ? "❌" : "⭕"}
            </span>
          ))}
        </div>
      )}
      {play && (
        <>
          <button className="reset" onClick={resetGame}>
            RESET
          </button>

          <button
            className="reset"
            style={{ fontSize: "2rem", padding: "10px 20px" }}
            onClick={() => setPlay(false)}
          >
            <IoMdArrowBack />
          </button>
        </>
      )}

      {winner != "" && showWithDelay && (
        <div className="winner">
          <p>The winner is </p>
          <p>{winner}</p>
          <p style={{ fontSize: "20px", marginTop: "10px" }}>
            click{" "}
            <b
              onClick={resetGame}
              style={{ color: "rgb(90, 70, 219)", cursor: "pointer" }}
            >
              RESET
            </b>{" "}
            to play again
          </p>
        </div>
      )}

      {board.every((elem) => elem != 0) && (
        <div className="winner">
          <p>TIE! 🥲</p>
          <p style={{ fontSize: "20px", marginTop: "10px" }}>
            click{" "}
            <b
              onClick={resetGame}
              style={{ color: "rgb(90, 70, 219)", cursor: "pointer" }}
            >
              RESET
            </b>{" "}
            to play again
          </p>
        </div>
      )}

      <footer>
        <p>uGab</p>
        <a href="https://www.linkedin.com/in/ugab/" target="_blank">
          <AiFillLinkedin />
        </a>
        <a href="https://github.com/ugabb" target="_blank">
          <AiFillGithub />
        </a>
      </footer>
    </div>
  );
}

export default App;
