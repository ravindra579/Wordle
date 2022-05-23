import { useState, useEffect } from "react";
import Board from "../Board";
import Error from "../Error";
import Help from "../Help";
import KeyBoard from "../KeyBoard";
import Modal from "../Modal";
import NavBar from "../NavBar";
import styles from "../Game/style.module.css";
import withAuthorization from "../../authentication/withAuthorization";
import Level from "../Level"
import Score from "../Score"
import Leaderboard from "../Leaderboard";
import { ref, onValue } from "firebase/database";
import { db1,auth} from "../../firebase/firebase";
function Start(props) {
  const [level,setlevel] = useState(false);
  const [lev,setlev]=useState(props.lev1);
  const [letter, setLetter] = useState();
  const [changed, setChanged] = useState(false);
  const [letters, setLetters] = useState({});
  const [help, setHelp] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);
  const [coins,setcoins]=useState(0);
  const [won,setwon]=useState(0);
  const [lost,setlost]=useState(0);
  const [showscore,setshowscore]=useState(false);
  const [showleaderboard,setshowleaderboard]=useState(false)
  const [alldata,setalldata]=useState({})
  const [data,setdata]=useState();
  const [def,setdef]=useState(false)

  useEffect(() => {
    props.darkness(dark);
  }, [dark]);

  useEffect(()=>{
    if(props.lev1===0 || props.lev1===1 || props.lev1===2 || props.lev1===3){
    setdef(!def)
    }
  },[props.lev1])
  
  var user = auth.currentUser;
  useEffect(() => {
    if (user) {
      const dbdata = ref(db1, `users/${user.uid}`);
      const fulldata=ref(db1,`users`)
      const x=props.level;
      onValue(dbdata, function (snapshot) {
        if (snapshot.val() != null) {
          setdata(snapshot.val())
          setcoins(snapshot.val().coins);
          if(x==="easy"){
            if(snapshot.val().easy){
              setwon(snapshot.val().easy.won)
              setlost(snapshot.val().easy.lost)
            }
          }if(x==="medium"){
            if(snapshot.val().medium){
              setwon(snapshot.val().medium.won)
              setlost(snapshot.val().medium.lost)
            }
          }else{
            if(snapshot.val().hard){
              setwon(snapshot.val().hard.won)
              setlost(snapshot.val().hard.lost)
            }
          }
        }
      });
      onValue(fulldata, function (snapshot) {
        if (snapshot.val() != null) {
          setalldata(snapshot.val())
        }
      })
    }
  }, [user]);
  const onClickDown = (event) => {
    if (event.key === "Enter") {
      setLetter("ENTER");
      setClicked(clicked + 1);
    } else if (event.key === "Backspace") {
      setLetter("DEL");
      setClicked(clicked + 1);
    } else if ("abcdefghijklmnopqrstuvwxyz".includes(event.key.toLowerCase())) {
      setLetter(event.key.toUpperCase());
      setClicked(clicked + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", onClickDown);

    return () => window.removeEventListener("keydown", onClickDown);
  });

  const keyHandler = (letterValue) => {
    setLetter(letterValue);
    setClicked(clicked + 1);
  };
  const LettersHandler = (lettersValue) => {
    setLetters(lettersValue);
    setChanged(!changed);
  };
  return (
    <>
      {help && (
        <Modal title="Game Rules and Guide" help={setHelp}>
          {" "}
          <Help />{" "}
        </Modal>
      )}
      {level && (
        <Modal title="Choose the level you want" help={setlevel}>
          {" "}
          <Level lev={props.lev} level={setlevel} />{" "}
        </Modal>
      )}
      {showscore && (
        <Modal title="Statistics" help={setshowscore}>
          {" "}
          <Score data={data}/>{" "}
        </Modal>
      )}
      {showleaderboard && (
        <Modal title="Leader Board" help={setshowleaderboard}>
          {" "}
          <Leaderboard data={alldata}/>{" "}
        </Modal>
      )}
      {error && <Error>{error}</Error>}
      <div className={styles.game}>
        <NavBar help={setHelp} darkness={setDark} dark={dark} level={setlevel} score={setshowscore} lead={setshowleaderboard} lev={props.lev}/>
        <hr />
        <Board
          letter={letter}
          def={def}
          clicks={clicked}
          lev={lev}
          uid={user.uid}
          coins={coins}
          won={won}
          lost={lost}
          word={props.word}
          letters={LettersHandler}
          error={setError}
          gamelevel={props.level}
        />
        <KeyBoard keyHandler={keyHandler} letters={letters} changed={changed} def={def}/>
        </div>
    </>
  );
}
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Start);
