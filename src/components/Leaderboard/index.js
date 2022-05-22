import { useState, useEffect } from "react";
export default function Leaderboard(props) {
  let x=[];
  let y=[]
  x=Object.values(props.data)
  for(let i=0;i<x.length;i++){
    y[i]=x[i].coins
  }
  y=y.sort(function(a, b){return b - a})
  return(  <>
    <p className="text-center text-md font-regular mr-1 mb-10 width50100 text-xl">
      <table>
      <tr>
        <td className="td" style={{fontWeight:"bold"}}>Rank</td>
        <td className="td" style={{fontWeight:"bold"}}>Coins</td>
      </tr>
      {y.map((val,i)=>{
        return(
        <tr><td className="td">{i+1}</td><td className="td">{val}</td></tr>
        )
      })}
      </table>
    </p>
  </>
  )
  }