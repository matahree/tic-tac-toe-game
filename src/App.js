import { useState } from "react";

function Square({ value, onSquareClick }) {
    return <button className="square" onClick={onSquareClick}  >{value}</button>;
}

// Array(9).fill(null) creates an array with nine elements and sets each of them to null
export default function Board() {
    const [xIsNext, setXIsNext]= useState(true);
    const [squares, setSquares]= useState(Array(9).fill(null))

    function handleClick(u){
        if(squares[u] || calculateWinner(squares)){
            return;
        }
        const nextSquares = squares.slice();
        if(xIsNext){
            nextSquares[u] = "X"
        }
        else {
            nextSquares[u] = "O"
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner is: " + winner;
    } else {
        status = "Next player is: " + (xIsNext ? "X" : "O");
    }

    // () => is an arrow function which is a shorter way to define functions
    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
}

// NOTE: In React, it’s conventional to use onSomething names for props which represent events
// and handleSomething for the function definitions which handle those events.