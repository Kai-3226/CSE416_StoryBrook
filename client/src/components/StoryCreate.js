import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Box from '@mui/material/Box';
import { useContext, useState,useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import Copyright from './Copyright'
import { useHistory } from 'react-router-dom';

export default function StoryCreate() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    const editorRef = useRef(null);


    const save = () => {
        if (editorRef.current) {
            store.currentWork.content=editorRef.current.getContent();
            store.updateCurrentWork();
            console.log(editorRef.current.id)
            console.log(editorRef.current.getContent());
        }
    };

    const published = () => {
        if (editorRef.current) {
            store.currentWork.content=editorRef.current.getContent();
            store.currentWork.published={publish:true,date:Date()};
            store.updateCurrentWork();
            history.push(`/readStory/${store.currentWork._id}`);
            alert("Work is published");
        }
    };
    return (
        <Box> 
            <Box>

                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
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
                <button onClick={save}>Save</button>
                <button onClick={published}>Published</button>
            </Box>
            <Copyright/>
        </Box>
    );
}