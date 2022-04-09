import Button from '@mui/material/Button';
import { React } from "react";
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom'
import AuthContext from '../auth'
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Typography from '@mui/material/Typography';
export default function SplashScreen() {
    const history = useHistory();
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    // const handleGuest = function (){
    //     auth.default();
    //     store.loadIdNamePairs();
    //     history.push('/home/');
    // }

    return (
        <div id="splash_screen_background">
            <Typography id="splash_screen_description" align='center'component="h1" variant="h4" >
                Hello there!<br /> 
                Welcome to StoryBrook!<br /> 
                In this place, you can draw story or tell story.<br />
                Pick one you want to do!!
            </Typography>
            <Box component="form">
                <Button variant="outlined" size="medium"><Link to='/comicScreen/'>Draw</Link></Button>
                <Button variant="outlined" size="medium"><Link to='/storytellingScreen/'>Tell</Link></Button>
            </Box>
        </div>
    )
}