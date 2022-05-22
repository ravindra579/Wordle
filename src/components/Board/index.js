import { useEffect, useState } from "react";
import Box from "../Box";
import {doupdate} from "../../firebase/db"
let defaulBoard = [];
let defaultLetters = [];

"abcdefghijklmnopqrstuvwxyz".split("").forEach((i) => {
  defaultLetters[i] = "";
});

for (let i = 0; i < 6; i++) {
  defaulBoard.push([]);
  for (let j = 0; j < 5; j++) {
    defaulBoard[i].push(["", ""]);
  }
}

function Board(props) {
  const [letters, setLetters] = useState(defaultLetters);
  const [board, setBoard] = useState(defaulBoard);
  const [changed, setChanged] = useState(false);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [win, setWin] = useState(false);
  const [lost, setLost] = useState(false);
  const [message, setMessage] = useState("");
  let correct = props.word;
  useEffect(() => {
    if(props.def){
    if (win || lost) {
      console.log("Game ended!");
    } else {
      if (props.clicks !== 0) {
        if (props.letter === "DEL") {
          setCol(col === 0 ? 0 : col - 1);
          setBoard((prevBoard) => {
            prevBoard[row][col === 0 ? 0 : col - 1][0] = "";
            return prevBoard;
          });
        } else {
          setBoard((prevBoard) => {
            if (col < 5) {
              if (props.letter !== "ENTER") {
                prevBoard[row][col][0] = props.letter;
                setCol(col + 1);
              } else {
                props.error("Words are 5 letters long!");
                setTimeout(() => {
                  props.error("");
                }, 1000);
              }
            } else {
              if (props.letter === "ENTER") {
                let correctLetters = 0;
                for (let i = 0; i < 5; i++) {
                  if (correct[i] === prevBoard[row][i][0]) {
                    prevBoard[row][i][1] = "C";
                    correctLetters++;
                  } else if (correct.includes(prevBoard[row][i][0]))
                    prevBoard[row][i][1] = "E";
                  else prevBoard[row][i][1] = "N";
                  setRow(row + 1);
                  if (row === 5) {
                    setLost(true);
                    setTimeout(() => {
                      if(props.lev===0){
                      setMessage(`The correct word is ${correct}`);
                      doupdate(props.uid,props.gamelevel,props.coins,props.won,props.lost+1);
                      }
                      else if(props.lev===1){
                      setMessage(`You Had Lost 2 coin. The correct word is ${correct}`);
                      doupdate(props.uid,props.gamelevel,props.coins-2,props.won,props.lost+1);
                      }
                      else if(props.lev===2){
                      setMessage(`You Had Lost 5 coin. The correct word is ${correct}`);
                      doupdate(props.uid,props.gamelevel,props.coins-5,props.won,props.lost+1);
                      }
                      else if(props.lev===3){
                      setMessage(`You Had Lost 10 coin. The correct word is ${correct}`);
                      doupdate(props.uid,props.gamelevel,props.coins-10,props.won,props.lost+1);
                      }
                    }, 750);

                  }
                  setCol(0);
                  setLetters((prev) => {
                    prev[board[row][i][0]] = board[row][i][1];
                    return prev;
                  });
                }
                setChanged(!changed);
                if (correctLetters === 5) {
                  setWin(true);
                  doupdate(props.uid,props.gamelevel,props.coins+(props.lev+1)*10,props.won+1,props.lost);
                  setTimeout(() => {
                    setMessage(`You Had Won ${(props.lev+1)*10}`);
                  }, 750);
                  
                }
                return prevBoard;
              }
            }
            return prevBoard;
          });
        }
      }
    }
  }else{
    let x=[]
    for (let i = 0; i < 6; i++) {
      x.push([]);
      for (let j = 0; j < 5; j++) {
        x[i].push(["", ""]);
      }
    }
    setBoard(x);
  }
  }, [props.clicks]);

  useEffect(() => {
    props.letters(letters);
  }, [changed]);
  return (
    <div className="px-10 py-5 grid gap-y-1 items-center w-100 justify-center">
      {board.map((row, key) => {
        return (
          <div key={key} className="flex gap-1 w-fit">
            {row.map((value, key) => (
              <Box key={key} value={value[0]} state={value[1]} pos={key} />
            ))}
          </div>
        );
      })}
      <div className=" grid place-items-center h-8 font-bold dark:text-white">
        {lost||win ? message : ""}
      </div>
    </div>
  );
}
export default Board;
