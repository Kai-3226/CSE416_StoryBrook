import { React } from "react";
import Comics from '../Images/Comics.png'
import splashScreen from '../Images/splashScreen.png'
import storytelling from '../Images/storytelling.png'
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ErrorModal from './ErrorModal';
import Copyright from './Copyright'
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useContext,useState } from 'react';
import { GlobalStoreContext } from '../store';

const theme = createTheme();

export default function SplashScreen() {
    const {store}=useContext(GlobalStoreContext);
    
    function handleClick(status){
        console.log(status)
        store.stat(status);
        
        //console.log(store.workList);
    }
    

    return (
        <div style={{backgroundImage: `url(${splashScreen})`, backgroundRepeat: "no-repeat",backgroundPosition: "center",backgroundSize: "cover"}}>
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection:"row", width: "97vw", height: "98vh"}}>
                    <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                        <Button onClick={(event) => {handleClick(1)}} style={{ width: "50vw", height: "50vh", backgroundImage:`url(${Comics})`, 
                        backgroundPosition: "center",backgroundSize: "contain", backgroundRepeat: "no-repeat", cursor: "pointer" }}>
                        </Button>
                    </div>
                    <div style={{display:"flex", alignItems:"center", flexDirection:"column"}} >
                    <Button onClick={(event) => {handleClick(0)}} style={{ width: "50vw", height: "50vh", backgroundImage:`url(${storytelling})`, 
                        backgroundPosition: "center",backgroundSize: "contain", backgroundRepeat: "no-repeat", cursor: "pointer" }}>
                        </Button>
                    </div>
            </div>
            <div style={{display:"flex", justifyContent: "space-evenly", alignItems: "end", flexDirection:"row"}}>
                        <Copyright/>   
            </div>
        </div>
    )
}
