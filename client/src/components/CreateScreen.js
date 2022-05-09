import { useContext, useState,useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Copyright from './Copyright'


//import localforage from 'localforage';
import { createStore } from 'polotno/model/store';
import { unstable_setRemoveBackgroundEnabled } from 'polotno/config';

import './polotno/index.css';
import App from './polotno/App';

unstable_setRemoveBackgroundEnabled(true);

<<<<<<< HEAD
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
    const { store } = useContext(GlobalStoreContext);
    store.editWork(JSON.stringify(json));
    //localforage.setItem('polotno-state', json);
  } catch (e) {}
});

const CreateScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    function handlePublish(event){
        store.publish(store.currentList._id);
=======
const CreateScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    
    const workstore = createStore({ key: 'nFA5H9elEytDyPyvKL7T' }); 
    const json=workstore.toJSON();
    window.store = workstore;
    if(store.currentWork&&store.currentWork.content==null)
    {  
        store.currentWork.content=json;
>>>>>>> harry
    }
    else 
    {
        workstore.loadJSON(store.currentWork.content);
    }
    
    workstore.on('change', () => {
        try {
          json = workstore.toJSON();
        } catch (e) {}
    });
    return (
        <Box>
            <Box>
                <App workstore={workstore} />
            </Box>
            <Copyright/>
        </Box>
    );
}

export default CreateScreen;