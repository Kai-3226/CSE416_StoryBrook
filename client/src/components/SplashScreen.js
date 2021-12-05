import Button from '@mui/material/Button';
import { React } from "react";
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom'
import AuthContext from '../auth'
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
export default function SplashScreen() {
    const history = useHistory();
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const handleGuest = function (){
        auth.default();
        store.loadIdNamePairs();
        history.push('/home/');
    }

    return (
        <div id="splash-screen">
            Welcome to<br />
            The Top 5 Lister!!
            <Box component="form">
                <Button variant="outlined" size="medium"><Link to='/register/'>Create Account</Link></Button>
                <Button variant="outlined" size="medium" onClick={handleGuest}>Continue As Guest</Button>
                <Button variant="outlined" size="medium"><Link to='/login/'>Login</Link></Button>
            </Box>
        </div>
    )
}