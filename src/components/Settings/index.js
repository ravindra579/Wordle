import Menu from "@mui/material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { Switch } from "@mui/material";
import { doSignOut } from "../../firebase/auth";
function Settings(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = () => {
    props.darkness(!props.dark);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <SettingsIcon
        onClick={handleClick}
        className="text-black dark:text-white cursor"
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} style={{paddingLeft:"10px",paddingRight:"10px"}}>
        <FormControlLabel
          className="pl-3.5 text-slate-600 font2"
          control={<Switch onChange={handleChange} />}
          label="Dark mode"
        />
        <hr />
        <div className="pl-3.5 pr-3.5 text-slate-600 font2 cursor margin5" onClick={async () => await doSignOut()} style={{textAlign:"center"}}>
          Sign out
        </div>
        <hr/>
        <div className="pl-3.5 text-slate-600 font2 cursor margin5" onClick={()=>{
          props.level(true)
          setAnchorEl(null)
          }} style={{textAlign:"center"}}>Level</div>
          <hr/>
        <div className="pl-3.5 text-slate-600 font2 cursor margin5" onClick={()=>{
          props.score(true)
          setAnchorEl(null)
          }} style={{textAlign:"center"}}>Score</div>
            <hr/>
        <div className="pl-3.5 pr-3.5 text-slate-600 font2 cursor margin5" onClick={()=>{
          props.lead(true)
          setAnchorEl(null)
          }} style={{textAlign:"center"}}>Leader Board</div>
            <hr/>
        <div className="pl-3.5 pr-3.5 text-slate-600 font2 cursor margin5" onClick={()=>{
          props.lev(-1)
          setAnchorEl(null)
          }} style={{textAlign:"center"}}>New Game</div>
      </Menu>
    </div>
  );
}

export default Settings;
