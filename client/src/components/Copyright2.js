//author kai
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright2(props) {
    let Copyright2 =
    <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
            Story Brook
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
    return (
        Copyright2
    );
}

export default Copyright2;
