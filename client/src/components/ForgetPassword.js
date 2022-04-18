import { useContext } from 'react';
import AuthContext from '../auth';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import api from '../api';
import ErrorModal from './ErrorModal';
import Copyright from './Copyright'


export default function ForgetPassword() {
    const {auth} = useContext(AuthContext);

    const handleSubmit = async (event)=>{
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        auth.forgetPassword(formData.get('email'));
    }

    return( 
        <Container component="main" maxWidth="xxl" style={{ background: "rgba(209, 247, 255, 1)", height: "100vh"}}>
            <CssBaseline />
            <ErrorModal/>
            <Box
                sx={{
                    paddingTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar variant='square' >
                    <LockOutlinedIcon />
                </Avatar>
                
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        
                    
                        <Grid item xs={12}>
                            <TextField
                                style={{background:"white"}}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                    
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send Email
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );

}
