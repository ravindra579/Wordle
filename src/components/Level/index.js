import "../../authentication/auth/index.css"
import { useState} from "react";
export default function Level(props) {
  const [lev,setlev]=useState(props.lev);
  const handlechange=(e)=>{
    setlev(e)
  };
return(  <>
  <p className="text-left text-sm sm:text-base font-regular opacity-75 mr-1">
    Level
    <br />
    Points will be based on the level you play for<br/> 
    <div className="flex">
      <div style={{width:"40%"}}></div>
      <div>Win</div>
      <div>Losse</div>
    </div>
    <div className="flex">
      <div  style={{width:"40%"}}>Easy</div>
      <div>10</div>
      <div>0</div>
    </div>
    <div className="flex">
      <div  style={{width:"40%"}}>Intermediate</div>
      <div>20</div>
      <div>-2</div>
    </div>
    <div className="flex">
      <div style={{width:"40%"}}>Hard</div>
      <div>30</div>
      <div>-5</div>
    </div>
    <div className="flex">
      <div style={{width:"40%"}}>Random</div>
      <div>40</div>
      <div>-10</div>
    </div>
    <br />
  </p>
  <hr />
  <div className="text-md py-5 font-regular opacity-75 mr-1">
    <div>Choose the level you want to play</div>
    <div className="width50100 text-xl">
    <div className="flex" style={{marginBottom:"10px",marginTop:"10px"}}>
      <div className={`cursor  width50 border cursor margin5 ${lev===0?"selected":""}`} onClick={()=>{handlechange(0)}}>Easy</div>
      <div className={`cursor  width50 border cursor margin5 ${lev===1?"selected":""}`}  onClick={()=>{handlechange(1)}}>Intermediate</div>
    </div>
    <div className="flex">
      <div className={`cursor  width50 border cursor margin5 ${lev===2?"selected":""}`} onClick={()=>{handlechange(2)}}>Hard</div>
      <div className={`cursor  width50 border cursor margin5 ${lev===3?"selected":""}`} onClick={()=>{handlechange(3)}}>Random</div>
    </div>
    <div>
      <div className="cursor margin5 width50 border cursor margin25 selected" onClick={()=>{
        props.level(false)
        props.lev(lev)
        }}>Play</div>
    </div>
    </div>
  </div>
</>)
}