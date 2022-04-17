import { useContext } from 'react';
import AuthContext from '../auth';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Copyright from './Copyright'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import api from '../api';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function ResetPassword() {
    const {auth} = useContext(AuthContext);

    const handleSubmit = async (event)=>{
        var newPassword = Date.now();
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const  response =  await api.resetPassword({
                email: formData.get('email'),
                subject: "Password Reset",
                newPassword: newPassword,
                text:'Your new password is '+newPassword
        });
        
        if(  response.status === 200 ){
            alert( response.data.message );
        }
        else{
            
            alert(response.data.errorMessage);
        }
    }

    return( 
    <Container component="main" maxWidth="xxl" style={{ background: "rgba(209, 247, 255, 1)", height: "100vh"}}>
    <CssBaseline />
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
            Change Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="passwordVerify"
                        label="Password Verify"
                        type="password"
                        id="passwordVerify"
                        autoComplete="new-password"
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Reset Password
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="/login" variant="body2">
                        You can sign in now
                    </Link>
                </Grid>
            </Grid>
        </Box>
    </Box>
    <Copyright sx={{ mt: 5 }} />
</Container>);
};
