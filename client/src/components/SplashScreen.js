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
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

const theme = createTheme();

export default function SplashScreen() {

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection:"row", width: "100vw", height: "100vh",backgroundImage: `url(${splashScreen})`,
                backgroundRepeat: "no-repeat",backgroundPosition: "center",backgroundSize: "cover"}}>
                    <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                        <Button style={{ width: "50vw", height: "50vh", backgroundImage:`url(${Comics})`, 
                        backgroundPosition: "center",backgroundSize: "contain", backgroundRepeat: "no-repeat", cursor: "pointer" }}>
                        <Link to='/comicScreen/'> </Link>
                        </Button>
                        <b style={{fontFamily: "Comic Sans MS", fontSize: 40}}>Draw</b>
                    </div>
                    <div style={{display:"flex", alignItems:"center", flexDirection:"column"}} >
                    <Button style={{ width: "50vw", height: "50vh", backgroundImage:`url(${storytelling})`, 
                        backgroundPosition: "center",backgroundSize: "contain", backgroundRepeat: "no-repeat", cursor: "pointer" }}>
                        <Link to='/tellingScreen/'> </Link>
                        </Button>
                        <b style={{fontFamily: "Comic Sans MS", fontSize: 40}}>Tell</b>
                    </div>
            </div>
            <div style={{display:"flex", justifyContent: "space-evenly", alignItems: "center", flexDirection:"row", width: "100vw", height: "5vh",backgroundImage: `url(${splashScreen})`,
                backgroundRepeat: "no-repeat",backgroundPosition: "center",backgroundSize: "cover"}} >
                        <Copyright sx={{ mt: 8, mb: 4 }} />   
            </div>
        </div>
    )
}