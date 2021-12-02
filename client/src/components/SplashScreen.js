import Button from '@mui/material/Button';
import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
export default function SplashScreen() {
    const handleSubmit = (event) => {};
    return (
        <div id="splash-screen">
            The Top 5<br />
            Lister
            <Box component="form"><Button variant="outlined" size="medium">Create Account</Button>
            <Button variant="outlined" size="medium">Continue As Guest</Button>
            <Button variant="outlined" size="medium">Login</Button></Box>
        </div>
    )
}