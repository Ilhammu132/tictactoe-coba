import { useState } from "react";
import * as React from "react";


function Board({ xIsNext, squares , onPlay}){
  
  function handleClick(i){
    if (squares[i] || calculateWinner(squares))  return;
    const nextSquares = squares.slice();
    
    nextSquares[i] = xIsNext ? "X" : "O";
    
    onPlay(nextSquares);
    
  }

  const winner = calculateWinner(squares);
  let status = '';
  if (winner) {
    status = "Winner : " + winner; 
  } else {
    status = "Next player : " + (xIsNext ? "X" : "O");
  }

  return( 
  <>
  <div className="">
    <div className="flex flex-wrap w-60 mx-auto">
    <div className="text-4xl">{status}</div>
    <div className=" my-4 flex flex-wrap w-60 text-lg">
    <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
    <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
    <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
    <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
    <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
    <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
    <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
    <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
    <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
    </div>    
    </div> 
  </div> 

  </>
  );
}

function Square({value, onSquareClick}) {
  return(
     <button onClick={onSquareClick} className="border-2 border-solid border-black w-20 h-20 text-4xl ">
      {value}
     </button>
  );
}

export default function Game() {
const [xIsNext, setXIsNext] = useState(true);
const [history, setHistory] = useState([Array(9).fill(null)]);
const [currentMove, setCurrentMove] = useState(0);
const currentSquares = history[currentMove];

function jumTo(nextMove){
  setCurrentMove(nextMove);
  setXIsNext(nextMove % 2 === 0 );
}

function handlePlay(nextSquares){
const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
setHistory(nextHistory);
setCurrentMove(nextHistory.length - 1)
setXIsNext(!xIsNext); 
}

const moves = history.map((squares, move) => {
let description ='';
if(move > 0) {
  description = 'Back To Move ' + move;
} else{
  description = 'Start Game/Reset';
}

return (
  <li key={move}>
    <button onClick={() => jumTo(move)}>{description} </button>
  </li>
)
});

  return (
    <div className="">
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className=" text-3xl">
        <ol className="flex flex-col text-center text-fuchsia-700 ">{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
  ];

  for(let i=0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) {
      return squares[a];
    }
  }
  return false;
}

/*
import { useState } from "react";


function Board(xIsNext, squares, onPlay){
  function handleClick(i){
    if (squares[i] || calculateWinner(squares))  return;
    const nextSquares = squares.slice();
    
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares)
    
  }

  const winner = calculateWinner(squares);
  let status = '';
  if (winner) {
    status = "Winner: " + winner; 
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return( 
  <>
    <div className="flex flex-wrap w-60 mx-auto">
    <div className="text-4xl">{status}</div>
    <div className=" my-4 flex flex-wrap w-60 text-lg">
    <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
    <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
    <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
    <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
    <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
    <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
    <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
    <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
    <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
    </div>
    </div>  
  </>
  );
}

function Square({value, onSquareClick}) {
  return(
     <button onClick={onSquareClick} className="border border-solid border-black w-20 h-20 text-4xl ">
      {value}
     </button>
  );
}

export default function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  function handleplay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)
    setXIsNext(!xIsNext);
  }

  const moves = history.map((squares, move) => {
    let description = '';
    if(move > 0){
      description = 'got to move #' + move;
    } else {
      description = 'goto game start';
    }

    return(
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handleplay}  />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
  ];

  for(let i=0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) {
      return squares[a];
    }
  }
  return false;
}
*/