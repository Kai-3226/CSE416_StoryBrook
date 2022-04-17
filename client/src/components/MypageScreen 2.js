import MypageSidebar from './MypageSidebar'
import Textfield from '@mui/material/TextField';
import { useContext } from 'react';
import AuthContext from '../auth';
import Card from './Card'
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store';
import Button from '@mui/material/Button';
export default function MyPage () {
    const { auth } = useContext(AuthContext);
    const {store} = useContext(GlobalStoreContext);

    //const user = auth.searchUser(auth.user)

    //const user = auth.searchUser(auth.user)
    let list="";
    let selectbar="";
    if (store.mode=="works"){
        selectbar=
        <div>
            <Button id="work-published" sx={{bgcolor:'#c4c4c4',color:'black'}}>Published</Button>
            <Button id="work-following" sx={{bgcolor:'#c4c4c4',color:'black'}}>Following</Button>
        </div>
    }
    /*
    if (store.mode=="friends"){
        list=
            <List sx={{ width: '80%', left: '20%'}}>
                {
                user.friends.map((friendId)=> (
                        <Card></Card>
                    ))
                }
            </List>
    }
    else if(store.mode=="followings"){
        list=
            <List sx={{ width: '80%', left: '20%'}}>
                {
                user.following.map((authorId)=> (
                        <Card></Card>
                    ))
                }
            </List>
    }
    else if (store.mode=="works"){
        list=
            <List sx={{ width: '80%', left: '20%'}}>
                {
                user.works.map((workId)=> (
                        <Card></Card>
                    ))
                }
            </List>
    }
    else if (store.mode=="likes"){
        list=
            <List sx={{ width: '80%', left: '20%'}}>
                {
                user.like.map((workId)=> (
                        <Card></Card>
                    ))
                }
            </List>
    }
    */
    return(
        <div>
            <MypageSidebar></MypageSidebar>
            <div id="content">
                <div id="mypage-search">
                    <Textfield fullWidth ></Textfield>
                </div>
                <div id="mypage-list">
                    {selectbar}
                    {list}
                </div>
            </div>
        </div>
    );
}
