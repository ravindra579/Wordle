import { useState, useEffect } from "react";
import Start from "../Start"
import withAuthorization from "../../authentication/withAuthorization";
import {easy,hard, medium} from "../../words"
const darkHandler = (dark) => {
  if (dark) document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
};
function Game(props) {
  const [lev,setlev]=useState(0);
  const [changed, setChanged] = useState(false);
  const [word,setword]=useState();
  const [level,setlevel]=useState("easy")
  useEffect(()=>{
    const rand=Math.floor(Math.random()*(11));
    if(lev==1 || lev==2 || lev==3 || lev==0){
      if(lev==0) {
        setword(easy[rand].toUpperCase())
        setlevel("easy")
      }
      else if(lev==1) {
        setword(medium[rand].toUpperCase())
        setlevel("medium")
      }
      else if(lev==2) {
        setword(hard[rand].toUpperCase())
        setlevel("hard")
      }
      else if(lev==3){
        const x=Math.floor(Math.random()*3);
        if(x==0) {
          setword(easy[rand].toUpperCase())
          setlevel("easy")
        }
        else if(x==1) {
          setword(medium[rand].toUpperCase())
          setlevel("medium")
        }
        else{
          setword(hard[rand].toUpperCase())
          setlevel("hard")
        } 
      }
      console.log(word)
      console.log(rand)
      setChanged(!changed);
      console.log(lev)
    }
  },[lev])
  return (
    <div  className={"app dark:bg-zinc-800"}>
      {changed && (<Start lev={setlev} lev1={lev} word={word} level={level} darkness={darkHandler} />)}
      {!changed && (<Start lev={setlev} lev1={lev} word={word} level={level} darkness={darkHandler} />)}
    </div>
  );
}
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Game);
