import { Input, makeStyles, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { MdSearch } from 'react-icons/md'
import "../style/Search.css"
import AccountMembersCard from './AccountMembersCard'
import SearchResult from './SearchResult'

function Search({allMembers,colorMode, calledBy, coordinators}) {
    
    const ButtonBgColor = { light: "#1d1e1f", dark: "#ffffff" };
    const ButtonColor = { light: "#ffffff", dark: "#1d1e1f" };
    const HoverButtonBgColor = { light: "#ffffff", dark: "#1d1e1f" };
    const HoverButtonColor = { light: "#1d1e1f", dark: "#ffffff" };

   
  const TextFieldBgColor = {  light: "#e8e8e8", dark: "#383838" };
  const TextFieldColor = {light: "#383838", dark: "#e8e8e8" };
  const useStyles = makeStyles({
    root: {
      "& label.Mui-focused": {
        color: TextFieldColor[colorMode],
      },
      "& label": {
        color: TextFieldColor[colorMode],
      },
      "& .MuiSelect-select:not([multiple]) option, .MuiSelect-select:not([multiple]) optgroup":{
          background:TextFieldBgColor[colorMode],
      },
      backgroundColor: TextFieldBgColor[colorMode],
      color: TextFieldColor[colorMode],
    },
  });
  const classes = useStyles();
    const NavbarBgColor = {  light: "#ffffff", dark: "#1d1e1f" };
    const NavbarColor = { light: "#1d1e1f", dark: "#ffffff"};
    var style3={
        backgroundColor: NavbarBgColor[colorMode],
        color: NavbarColor[colorMode]
    }
    var styleText={
        color: NavbarColor[colorMode]
    }
    const [input, setInput] = useState("")
    const [searching, setSearching] = useState(false)
    //console.log("Searching is ",searching)
    
    return (
        <div className="Search">
            <form>
               <div className="SearchBar">
                   <div className="Icon">
                   <MdSearch style={styleText}/>
                   </div>
                   <Input className="SearchInput"
                   type="text"
                   value={input}
                   className={classes.root}
                   InputProps={{ className: classes.root  }}
                   placeholder="Registeration Number/Name/Department"
                   fullWidth
                   variant="standard"
                   onChange={(e)=>{
                    setInput(e.target.value)
                   }}
                   label="Registration Number"/>
               </div>
            </form>
            <div className="SearchResult">
            {
              (input!="")?(
                allMembers.map(({ id, allmember }) => (
                    <SearchResult
                        coordinators={coordinators}
                        query={input}
                        colorMode={colorMode}
                        key={id}
                        memberId={id}
                        member={allmember}
                        calledBy={calledBy} />
                ))
              ):(<div></div>)
            }
        </div>
    </div>
    )
}

export default Search
