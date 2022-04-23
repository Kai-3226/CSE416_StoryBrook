import { useContext, useState,useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { flexbox, maxHeight } from '@mui/system';
import { blue, grey, lightBlue, yellow } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import NotificationModal from './NotificationModal';
import ThumbnailCard from './ThumbnailCard';

//import localforage from 'localforage';
import { createStore } from 'polotno/model/store';
import { unstable_setRemoveBackgroundEnabled } from 'polotno/config';

import './polotno/index.css';
import App from './polotno/App';

unstable_setRemoveBackgroundEnabled(true);

const workstore = createStore({ key: 'nFA5H9elEytDyPyvKL7T' });
window.store = workstore;


// localforage.getItem('polotno-state', function (err, json) {
//   if (json) {
//     workstore.loadJSON(json);
//   }
//   if (!workstore.pages.length) {
//     workstore.addPage();
//   }
// });

workstore.on('change', () => {
  try {
    const json = workstore.toJSON();
    //localforage.setItem('polotno-state', json);
  } catch (e) {}
});

const CreateScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    function handleSave (event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let newName=formData.get('listName');
        let newitems=[formData.get('item2'),formData.get('item3'),formData.get('item4'),formData.get('item5'),formData.get('item6')];
        store.editList(store.currentList._id,newName,newitems);
    };
    function handlePublish(event){
        store.publish(store.currentList._id);
    }
    let i = 1;


    return (
       
//    <Box id="createPage_screen" sx={{bgcolor:'white'} } > 
//                 <Box id="createPage_sideBar" name="createPage_sideBar">
//                     <Box id="createPage_sideBar_banner" >
//                         <Typography fontSize='30px'>Page</Typography>
//                     </Box>
                    
//                         <Button 
//                         color="primary" 
//                         aria-label="add"
                       
//                         sx={{position:'relative',left:"10%"}}
//                         >   
//                         <AddIcon />
//                         Add New Page
//                         </Button>
//                     <Box id='ThumbnailLister' sx={{height:'80%',overflowY:'auto'}}>
//                         <ThumbnailCard/>
//                         <ThumbnailCard/>
//                     </Box>

//                 </Box> 
//                 <Box id="createPage_sideBar_selector">
//                     <Button id="createPage_icon_page"  sx={{alignText: 'center',position:'relative',height:'20%',width:'80%',top:'2%',borderTop:'1px solid black',borderRight:'1px solid black',borderBottom:'1px solid black',borderRadius:'0.3cm', }}> 
//                         page
//                     </Button>
//                     <Button id="createPage_icon_page" sx={{position:'relative',height:'20%',width:'80%',top:'2%',borderTop:'1px solid black',borderRight:'1px solid black',borderBottom:'1px solid black',borderRadius:'0.3cm', }}> 
//                        layer             
//                     </Button> 
//                     <Button id="createPage_icon_page" sx={{position:'relative',height:'20%',width:'80%',top:'2%',borderTop:'1px solid black',borderRight:'1px solid black',borderBottom:'1px solid black',borderRadius:'0.3cm', }}> 
//                     Library             
//                     </Button>

//                 </Box>

                
//                 <Box id="createPage_workPlace"/>
                
//                 <Box id= "createPage_toolBar">
//                     </Box>  
            <Box>
            <App workstore={workstore} />
            </Box>
        //          <NotificationModal/> 

        // </Box>
       
    );
}

export default CreateScreen;