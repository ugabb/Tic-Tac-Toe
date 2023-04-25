import { useState, useEffect } from "react";

import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";

function App() {
  // 0 == empty, 1 == x, 2 == o
  const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [score, setScore] = useState({
    player: 0,
    computer: 0,
  });
  // const [playerTurn]
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

    if (value === 0) {
      newBoard[currentIndex] = 1;
      setBoard(newBoard);
      computerMove(newBoard);
    }

    // if board option is empty or not a X
    //setTimeout(computerMove(newBoard), 3000);
  }

  function computerMove(board) {
    if (winner) return;
    let randomNum = Math.floor(Math.random() * 9);

    if (board.includes(0)) {
      while (board[randomNum] != 0) {
        randomNum = Math.floor(Math.random() * 9);
      }
      board[randomNum] = 2;
      setBoard(board);
    } else return;

    return;
  }

  function checkWinner() {
    for (let combination of winnerCombinations) {
      const { indexes } = combination;

      // if x win

      if (
        board[indexes[0]] === 1 &&
        board[indexes[1]] === 1 &&
        board[indexes[2]] === 1
      ) {
        setWinner("❌");
        setScore((prev) => ({ ...prev, player: prev.player + 1 }));
        setSequenceWinner((prev) => [
          ...prev,
          indexes[0],
          indexes[1],
          indexes[2],
        ]);
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
        setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
        setSequenceWinner((prev) => [
          ...prev,
          indexes[0],
          indexes[1],
          indexes[2],
        ]);
        // winner alert will show with 2 seconds of delay
        setTimeout(() => {
          setShowWithDelay(true);
        }, 2000);
      }
      if (winner) break;
    }
    return winner;
  }

  function resetGame() {
    setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setWinner(null);
    setShowWithDelay(false);
    setSequenceWinner([]);
  }

  useEffect(() => {
    checkWinner();
  }, [board]);

  return (
    <div className="container">
      <div className="play-container">
        <h1>Tic ❌ Tac ⭕ Toe</h1>

        <div className="score-container">
          <p>Player: <b>{score.player}</b></p>
          <p>Computer: <b>{score.computer}</b></p>
        </div>

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
              className={`${value ? "alreadyPlaced" : ""} ${
                sequenceWinner.includes(index) ? "winnerSequence" : ""
              }`}
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
            onClick={() => {
              setPlay(false);
              setScore((prev) => ({ player: 0, computer: 0 }));
            }}
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

      {/* IF IS TIE */}
      {board.every((elem) => elem != 0 && !winner) && (
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
