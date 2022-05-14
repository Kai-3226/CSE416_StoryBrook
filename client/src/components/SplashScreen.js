import { React } from "react";
import Comics from '../Images/Comics.png'
import splashScreen from '../Images/splashScreen.png'
import storytelling from '../Images/storytelling.png'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from './Copyright'
import Button from '@mui/material/Button';
import { useContext,useState,useEffect, } from 'react';
import { GlobalStoreContext } from '../store';
import { useHistory } from 'react-router-dom'


const theme = createTheme();


export default function SplashScreen() {
    const {store}=useContext(GlobalStoreContext);
<<<<<<< HEAD
    const history = useHistory();

     useEffect(() => {
        store.stat(3);
=======
  
    
    useEffect(() => {
        store.resetStat();
>>>>>>> af95ddda8c335de9636630640a6f26dae5064916
    }, []);

    
    function handleClick(status){
        console.log(status);
        store.stat(status);
<<<<<<< HEAD
        console.log(store.status);
        history.push("/home/");
        //console.log(store.workList);
=======
        
>>>>>>> af95ddda8c335de9636630640a6f26dae5064916
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
