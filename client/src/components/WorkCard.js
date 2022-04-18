import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Avatar from '@mui/material/Avatar';


function WorkCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { work } = props;

    function handleOpen(id){
        store.setCurrentWork(id);
        console.log(store.currentList);
    }

    async function handleDeleteWork(event, id) {
        event.stopPropagation();
        store.markWorkForDeletion(id);
    }
    
    let deletebutton=
    <IconButton  onClick={(event) => {
        handleDeleteWork(event, work._id)
        }} aria-label='delete'>
        <DeleteIcon/>
    </IconButton>;
    if(auth.user===null){
        deletebutton="";
    }
    else if(auth.user.userid!==work.userid){
        deletebutton=
        "";
    }

    let workElement =
        <Card id={work.id} hoverable sx={{ maxWidth: 345 }} onClick={handleOpen}>
            {deletebutton}
            <CardMedia
                component="img"
                height="140"
                image= {work.frontpage}
                alt= {work.name}
            />
            <CardContent>
                <Typography>
                    {work.name}
                </Typography>
                <RemoveRedEyeIcon></RemoveRedEyeIcon>
                <Typography>
                    {work.view}
                </Typography>
                <ThumbUpIcon></ThumbUpIcon>
                <Typography>
                    {work.like}
                </Typography>
                <Avatar alt={work.author} src={work.avatar} />
            </CardContent>
        </Card>
    return (
        workElement
    );
}

export default WorkCard;