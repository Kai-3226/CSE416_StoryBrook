import { React } from "react";
import Comics from '../Images/Comics.png'
import splashScreen from '../Images/splashScreen.png'
import storytelling from '../Images/storytelling.png'
import Box from '@mui/material/Box';
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
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <ErrorModal></ErrorModal>
            <div id="splash_screen_background">
                <Box component="form">
                    <Button variant="outlined" size="large" sx={{top:'10%',left:'20%'}}><Link to='/comicScreen/'>Draw</Link></Button>
                    <Button variant="outlined" size="large" sx={{top:'10%',left:'50%'}}><Link to='/storytellingScreen/'>Tell</Link></Button>
                </Box>
            </div>
            <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>   
    )
}