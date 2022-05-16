import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Copyright from './Copyright'


//import localforage from 'localforage';
import { createStore } from 'polotno/model/store';
import { unstable_setRemoveBackgroundEnabled } from 'polotno/config';

import './polotno/index.css';
import App from './polotno/App';

unstable_setRemoveBackgroundEnabled(true);

const CreateScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    
    const workstore = createStore({ key: 'nFA5H9elEytDyPyvKL7T' }); 
    let json=workstore.toJSON();
    window.store = workstore;
    if(store.currentWork&&store.currentWork.content==null)
    {  
        store.currentWork.content=json;
    }
    else if(store.currentWork.published.publish===false)
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