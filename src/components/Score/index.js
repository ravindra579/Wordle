export default function Score(props) {
return(  <>
  <p className="text-center text-md font-regular mr-1 width50100 text-xl">
  <div className="text-md py-5 font-regular opacity-75 mr-1">
  <div className="width50100 text-xl">
    <div className="flex" style={{marginBottom:"10px",marginTop:"10px"}}>
      <div className="width50 margin5">Coins</div>
      <div className="width50 margin5">{props.data?.coins?props.data?.coins:0}</div>
    </div>
    <div className="bold">Easy</div>
    <div className="flex" style={{marginBottom:"10px",marginTop:"10px"}}>
      <div className="width50 margin5">Won</div>
      <div className="width50 margin5">{props.data?.easy?.won?props.data?.easy?.won:0}</div>
    </div>
    <div className="flex" style={{marginBottom:"10px",marginTop:"10px"}}>
      <div className="width50 margin5">Lost</div>
      <div className="width50 margin5">{props.data?.easy?.lost?props.data?.easy?.lost:0}</div>
    </div>
    <div className="bold">Medium</div>
    <div className="flex" style={{marginBottom:"10px",marginTop:"10px"}}>
      <div className="width50 margin5">Won</div>
      <div className="width50 margin5">{props.data?.medium?.won?props.data?.medium?.won:0}</div>
    </div>
    <div className="flex" style={{marginBottom:"10px",marginTop:"10px"}}>
      <div className="width50 margin5">Lost</div>
      <div className="width50 margin5">{props.data?.medium?.lost?props.data?.medium?.lost:0}</div>
    </div>
    <div className="bold">Hard</div>
    <div className="flex" style={{marginBottom:"10px",marginTop:"10px"}}>
      <div className="width50 margin5">Won</div>
      <div className="width50 margin5">{props.data?.hard?.won?props.data?.hard?.won:0}</div>
    </div>
    <div className="flex" style={{marginBottom:"10px",marginTop:"10px"}}>
      <div className="width50 margin5">Lost</div>
      <div className="width50 margin5">{props.data?.hard?.lost?props.data?.hard?.lost:0}</div>
    </div>
    </div>
  </div>
  </p>
</>)
}