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

  function handleSave(){
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

   function handlePublish(){
    // const json = workstore.toJSON();
    //store.currentWork.content=saveAsImage();
    const json = workstore.toJSON();
    store.currentWork.name=title;
    store.currentWork.content=json;
    store.currentWork.published={publish:true,date:Date()};
    console.log(store.currentWork);
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
                                          
                        <IconButton variant="outlined" onClick={handlePublish}>
                            <img src='data:image/jpeg;base64,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'
                        height='32'
                         />  
                            publish</IconButton> 
                    </Box>
                    </Navbar.Group>            
      </NavInner>
    </NavbarContainer>
  );
});
