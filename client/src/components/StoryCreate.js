import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Box from '@mui/material/Box';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Copyright from './Copyright'
import { useHistory } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

export default function StoryCreate() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    const editorRef = useRef(null);
    const [title,setTitle]=React.useState(store.currentWork.name);

    const handleSave= () => {
        if (editorRef.current) {          
            store.currentWork.name=title;
            store.currentWork.content=editorRef.current.getContent();
            store.updateCurrentWork();
            console.log(store.currentWork);
            alert("Work is saved");
        }
    };

    const handlePublish = () => {
        if (editorRef.current) {
            console.log(title);
            store.currentWork.name=title;
            store.currentWork.content=editorRef.current.getContent();
            store.currentWork.published={publish:true,date:Date()};
            console.log(store.currentWork);
            store.updateCurrentWork();
            history.push(`/readStory/${store.currentWork._id}`);
            alert("Work is published");
        }
    };
    let initValue="";
    if(store.currentWork&&store.currentWork.content==null)
    {  
        initValue="<p>This is the initial content of the editor.</p>";

    }
    else 
    {
        initValue=store.currentWork.content;
    }
    
    
    return (
        <Box> 
            <Box>
           
            <TextField sx={{height:'100%',bgcolor:'grey',marginLeft:'10%',width:'50%'}} defaultValue={title} onChange={(e)=>setTitle(e.target.value)} ></TextField>
           
            <Button id="saveButton" bgcolor='blue' variant="outlined" onClick={handleSave}> save</Button>
            <Button variant="outlined" onClick={handlePublish}> publish</Button>
                
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={initValue}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                    'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
                    'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
                    'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
                    ],
                    toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </Box>
            <Copyright/>
        </Box>
    );
}