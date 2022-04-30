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


// window.store = workstore;


// localforage.getItem('polotno-state', function (err, json) {
//   if (json) {
//     workstore.loadJSON(json);
//   }
//   if (!workstore.pages.length) {
//     workstore.addPage();
//   }
// });



const CreateScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    // function handleSave (event) {
    //     event.preventDefault();
    //     const formData = new FormData(event.currentTarget);
    //     let newName=formData.get('listName');
    //     let newitems=[formData.get('item2'),formData.get('item3'),formData.get('item4'),formData.get('item5'),formData.get('item6')];
    //     store.editList(store.currentList._id,newName,newitems);
    // };
    // function handlePublish(event){
    //     store.publish(store.currentWork._id);
    // }
    //let i = 1;
    
    const workstore = createStore({ key: 'nFA5H9elEytDyPyvKL7T' }); 
    const json=workstore.toJSON();
    window.store = workstore;
        if(store.currentWork&&store.currentWork.content==null)
        {  
        store.currentWork.content=json;
        }
        else 
        {
            workstore.loadJSON(store.currentWork.content);
        }
    
    workstore.on('change', () => {
        try {
          json = workstore.toJSON();
          //console.info(json);
          //localforage.setItem('polotno-state', json);
        } catch (e) {}
      });
    return (
            <Box>
                <App workstore={workstore} />
            </Box>
    );
}

export default CreateScreen;