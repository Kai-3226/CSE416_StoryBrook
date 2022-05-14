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

    function handleClick(status){
        
        mylist = store.workList.filter(item => item.author === auth.user.email);
        if(status === 1){
            mylist = mylist.filter(item => item.published["publish"] === true);
        } else if(status == 2)
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
                rows.map((row,index) => (
                    <Box key={"workRow"+index} sx = {{display:'flex',position:'relative'}}>
                        {row.map((item) =>(<MypageWorkCard work={item}/>))}
                    </Box>
                ));
        }
    }

    if (store.mode=="friends"){
        list=
            <List sx={{ width: '80%', left: '20%'}}>
                {
                auth.user.friends.map((friendId)=> (
                        <Card></Card>
                    ))
                }
            </List>
    }
    else if(store.mode=="followings"){

        console.log(auth.userList);
        list=
            <List sx={{ width: '100%', left: '0%'}}>
                {
                auth.userList.filter((user) => auth.user.following.includes(user._id)).map((item) => (
                    <Card props={item}></Card>
                ))
                }
            </List>
    }
    else if (store.mode=="works"){
        selectbar=
        <Box>
            <Button onClick={(event) => {handleClick(1)}} id="work-published" sx={{bgcolor:'#c4c4c4',color:'black'}}>Published</Button>
            <Button onClick={(event) => {handleClick(2)}} id="work-following" sx={{bgcolor:'#c4c4c4',color:'black'}}>Editing</Button>
        </Box>
        if (store && store.workList) {
            mylist = store.workList.filter(item => item.author == auth.user.email);
            console.log(mylist);
            list = "";  
            let rows = [];
            for (var i = 0, end = mylist.length / 2; i < end; ++i){
                rows.push(mylist.slice(i * 2, (i + 1) * 2));
            }
            console.log(rows);
            list = 
                rows.map((row) => (
                    <Box sx = {{display:'flex',position:'relative'}}>
                        {row.map((item) =>(<MypageWorkCard key={item._id} work={item}/>))}
                    </Box>
                ));
        }
    }
    else if (store.mode=="likes"){
        selectbar="";
        console.log("hello")

        list=
            <List sx={{ width: '80%', left: '20%'}}>
                {
                auth.user.like.map((workId)=> (
                        <Card></Card>
                    ))
                }
            </List>
    }
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
