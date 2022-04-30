import MypageSidebar from './MypageSidebar'
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import AuthContext from '../auth';
import Card from './Card'
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MypageWorkCard from './MypageWorkCard';

export default function MyPage () {
    const { auth } = useContext(AuthContext);
    const {store} = useContext(GlobalStoreContext);
    const [text,setText]=useState("");
    const[stat,setStatus]=useState(0);
    //const user = auth.searchUser(auth.user)
    let list="";
    let selectbar="";
    let mylist = [];

    function handleClick(status) {
        setStatus(status);
        mylist = store.workList.filter(item => item.author === auth.user.email);
        if(stat == 1){
            mylist = mylist.filter(item => item.published["publish"] === true);
        } else if(stat == 2)
        {
            mylist = mylist.filter(item => item.published["publish"] === false);
        }
        if (store && store.workList) {
            list = "";  
            let rows = [];
            for (var i = 0, end = mylist.length / 2; i < end; ++i){
                rows.push(mylist.slice(i * 2, (i + 1) * 2));
            }
            // console.log(rows);
            list = 
                rows.map((row) => (
                    <Box sx = {{display:'flex',position:'relative'}}>
                        {row.map((item) =>(<MypageWorkCard work={item}/>))}
                    </Box>
                ));
        }
    }

    if (store.mode=="works"){
        selectbar=
        <Box>
            <Button onClick={(event) => {handleClick(1)}} id="work-published" sx={{bgcolor:'#c4c4c4',color:'black'}}>Published</Button>
            <Button onClick={(event) => {handleClick(2)}} id="work-following" sx={{bgcolor:'#c4c4c4',color:'black'}}>Editing</Button>
        </Box>
        
        if (store && store.workList&&stat==0) {
            mylist = store.workList.filter(item => item.author === auth.user.email);
            list = "";  
            let rows = [];
            for (var i = 0, end = mylist.length / 2; i < end; ++i){
                rows.push(mylist.slice(i * 2, (i + 1) * 2));
            }
            // console.log(rows);
            list = 
                rows.map((row) => (
                    <Box sx = {{display:'flex',position:'relative'}}>
                        {row.map((item) =>(<MypageWorkCard work={item}/>))}
                    </Box>
                ));
        }

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
        <Box bgcolor="lightgreen" display="flex" sx={{height:'85%',width:'100%'}}>
            <MypageSidebar></MypageSidebar>
            <div id="content">    
            <TextField id="myPage-search" fullWidth value={text} onChange={e => setText(e.target.value)}/>
                <Box id="mypage-list" sx={{overflowY:'auto'}}>
                    {selectbar}
                    {list}
                </Box>
            </div>
        </Box>
    );
}
