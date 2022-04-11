import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import AuthContext from '../auth';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    function handleCreateNewList() {
        store.createNewList();
    }
    let text ="";
    if (store.currentList)
        text = store.currentList.name;
    if (store.text!==""){
        text=store.text+" Lists";
    }
    if (store.currentList){
        text=store.currentList.name+" List";
    }    
    if (auth.loggedIn){
        return(
            <div id="top5-statusbar">
                <Button 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    disabled={store.editActive||store.currentList}
                >   
                    <AddIcon />
                </Button>
                <Typography variant="h4">{text}</Typography>
            </div>
        );
    }
    return (
        <div id="top5-statusbar">
            <Typography variant="h4">{text}</Typography>
        </div>
    );
}

export default Statusbar;