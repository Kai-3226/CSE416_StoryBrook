import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Navbar,
  Alignment,
  AnchorButton,
  Divider,
  Dialog,
  Classes,
  Position,
  Menu,
  MenuItem,
} from '@blueprintjs/core';
import FaGithub from '@meronex/icons/fa/FaGithub';
import FaDiscord from '@meronex/icons/fa/FaDiscord';
import { downloadFile } from 'polotno/utils/download';
import { Popover2 } from '@blueprintjs/popover2';
import { t } from 'polotno/utils/l10n';

import styled from 'polotno/utils/styled';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { GlobalStoreContext } from '../../store';
import { useHistory } from 'react-router-dom';

const NavbarContainer = styled('div')`
  @media screen and (max-width: 500px) {
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 100vw;
  }
`;

const NavInner = styled('div')`
  @media screen and (max-width: 500px) {
    display: flex;
  }
`;

const DownloadButton = ({ workstore }) => {
  const [saving, setSaving] = React.useState(false);

  const getName = () => {
    const texts = [];
     workstore.pages.forEach((p) => {
      p.children.forEach((c) => {
        if (c.type === 'text') {
          texts.push(c.text);
        }
      });
    });
    const allWords = texts.join(' ').split(' ');
    const words = allWords.slice(0, 6); 
    return words.join(' ').replace(/\s/g, '-').toLowerCase() || 'polotno';
  };
  return (
    <Popover2
      content={
        <Menu>
          <MenuItem
            icon="media"
            text={t('toolbar.saveAsImage')}
            onClick={async () => {
               workstore.pages.forEach((page, index) => {
                // do not add index if we have just one page
                const indexString =
                   workstore.pages.length > 1 ? '-' + (index + 1) : '';
                 workstore.saveAsImage({
                  pageId: page.id,
                  fileName: getName() + indexString + '.png',
                });
              });
            }}
          />
          <MenuItem
            icon="document"
            text={t('toolbar.saveAsPDF')}
            onClick={async () => {
              setSaving(true);
              await  workstore.saveAsPDF({
                fileName: getName() + '.pdf',
              });
              setSaving(false);
            }}
          />
        </Menu>
      }
      position={Position.BOTTOM}
    >
      <Button
        icon="import"
        text={t('toolbar.download')}
        minimal
        loading={saving}
      />
    </Popover2>
  );
};

export default observer(({  workstore }) => {
  const inputRef = React.useRef();
  const {  store } = React.useContext(GlobalStoreContext);
  const [faqOpened, toggleFaq] = React.useState(false);
  const [title,setTitle]=React.useState(store.currentWork.name);
  const history = useHistory();

  function handleSave(event) {
    event.preventDefault();
    event.stopPropagation(); 
    const json = workstore.toJSON();
    store.currentWork.name=title;
    store.currentWork.content=json;
    store.updateCurrentWork();

  }
  async function saveAsImage(){
    return workstore.pages.forEach((page, index) => {
     // do not add index if we have just one page
     const indexString =
        workstore.pages.length > 1 ? '-' + (index + 1) : '';
      workstore.saveAsImage({
       pageId: page.id,
       fileName: getName() + indexString + '.png',
     });
   });
 }

 const getName = () => {
  const texts = [];
   workstore.pages.forEach((p) => {
    p.children.forEach((c) => {
      if (c.type === 'text') {
        texts.push(c.text);
      }
    });
  });
  const allWords = texts.join(' ').split(' ');
  const words = allWords.slice(0, 6);
  return words.join(' ').replace(/\s/g, '-').toLowerCase() || 'polotno';
};
let s="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX5K5jJMJsZd66cw6hLVPLfyykXVF5ou3VCQ&usqp=CAU"
   
async function handlePublish(event){
    event.preventDefault();
    event.stopPropagation(); 
    //const json = workstore.toJSON();
    store.currentWork.name=title;
    // store.currentWork.content=json;
    store.currentWork.content= [];
    
    store.currentWork.content=await Promise.all (workstore.pages.map(async (page) => {
        let pageUrl=await workstore.toDataURL({pageId: page.id});
        return pageUrl;
      }));
    
    store.currentWork.published={publish:true,date:Date()};

    store.updateCurrentWork();
    history.push(`/read/${store.currentWork._id}`);
    alert("Work is published");
  };

  return (
    <NavbarContainer className="bp4-navbar">
      <NavInner>
        <Navbar.Group align={Alignment.LEFT}>
          <Button
            icon="new-object"
            minimal
            onClick={() => {
              const ids =   workstore.pages
                .map((page) => page.children.map((child) => child.id))
                .flat();
              const hasObjects = ids?.length;
              if (hasObjects) {
                if (!window.confirm('Remove all content for a new design?')) {
                  return;
                }
              }
              const pagesIds =  workstore.pages.map((p) => p.id);
                workstore.deletePages(pagesIds);
                workstore.addPage();
            }}
          >
            New
          </Button>
          <label htmlFor="load-project">
            <Button
              icon="folder-open"
              minimal
              onClick={() => {
                document.querySelector('#load-project').click();
              }}
            >
              Import
            </Button>
            <input
              type="file"
              id="load-project"
              accept=".json,.polotno"
              ref={inputRef}
              style={{ width: '180px', display: 'none' }}
              onChange={(e) => {
                var input = e.target;

                if (!input.files.length) {
                  return;
                }

                var reader = new FileReader();
                reader.onloadend = function () {
                  var text = reader.result;
                  let json;
                  try {
                    json = JSON.parse(text);
                  } catch (e) {
                    alert('Can not load the project.');
                  }

                  if (json) {
                     workstore.loadJSON(json);
                    input.value = '';
                  }
                };
                reader.onerror = function () {
                  alert('Can not load the project.');
                };
                reader.readAsText(input.files[0]);
              }}
            />
          </label>
          <Button
            icon="floppy-disk"
            minimal
            onClick={() => {
              const json =   workstore.toJSON();

              const url =
                'data:text/json;base64,' +
                window.btoa(unescape(encodeURIComponent(JSON.stringify(json))));

              downloadFile(url, 'polotno.json');
            }}
          >
            Export
          </Button>
          <DownloadButton  store={ workstore} />

        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
         <TextField sx={{height:'100%',bgcolor:'grey',marginLeft:'10%'}} defaultValue={title} onChange={(e)=>setTitle(e.target.value)} ></TextField>
                    <img src='data:image/jpeg;base64,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'
                        height='32'
                    ></img>
                    <Button id="saveButton" bgcolor='blue' variant="contained" onClick={handleSave}> save</Button>
                    <Box marginLeft='0% '> 
                                          
                        <IconButton variant="outlined" onClick={handlePublish} size="medium">
                            <img src={s}
                        height='32'
                         />  
                          </IconButton> 
                    </Box>
                    </Navbar.Group>            
      </NavInner>
    </NavbarContainer>
  );
});
