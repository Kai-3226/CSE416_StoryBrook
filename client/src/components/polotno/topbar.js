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
              await workstore.saveAsPDF({
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

export default observer(({ workstore }) => {
  const inputRef = React.useRef();
  const { store } = React.useContext(GlobalStoreContext);
  const [faqOpened, toggleFaq] = React.useState(false);
  const [title, setTitle] = React.useState(store.currentWork.name);
  const history = useHistory();

  function handleSave(event) {
    event.preventDefault();
    event.stopPropagation();
    const json = workstore.toJSON();
    store.currentWork.name = title;
    store.currentWork.content = json;
    store.updateCurrentWork();

  }
  async function saveAsImage() {
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


  async function handlePublish(event) {
    event.preventDefault();
    event.stopPropagation();
    //const json = workstore.toJSON();
    store.currentWork.name = title;
    // store.currentWork.content=json;
    store.currentWork.content = [];

    store.currentWork.content = await Promise.all(workstore.pages.map(async (page) => {
      let pageUrl = await workstore.toDataURL({ pageId: page.id });
      return pageUrl;
    }));

    store.currentWork.published = { publish: true, date: Date() };

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
              const ids = workstore.pages
                .map((page) => page.children.map((child) => child.id))
                .flat();
              const hasObjects = ids?.length;
              if (hasObjects) {
                if (!window.confirm('Remove all content for a new design?')) {
                  return;
                }
              }
              const pagesIds = workstore.pages.map((p) => p.id);
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
              const json = workstore.toJSON();

              const url =
                'data:text/json;base64,' +
                window.btoa(unescape(encodeURIComponent(JSON.stringify(json))));

              downloadFile(url, 'polotno.json');
            }}
          >
            Export
          </Button>
          <DownloadButton store={workstore} />

        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <TextField sx={{ height: '100%', bgcolor: 'grey', marginLeft: '10%' }} defaultValue={title} onChange={(e) => setTitle(e.target.value)} ></TextField>
          <IconButton id="saveButton" bgcolor='blue' variant="contained" onClick={handleSave}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUwAAABuCAYAAABMfSrWAAAAAXNSR0
                            IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABuBSURBVHhe7Z1rcB
                            ZVmsfzYSYEZ9ZbzZfdmqqtWf2yVumHqZpiVnfng64yOygzIqsjwso4C+XoyKLusl6Wi1wMuUAIl7
                            wvIHcJtwxEiSAXTQgxZFEcCDGQYEKIXCQmsIKiaA3v9v/lffDQefpy+vZ2wtNVv1Le7j59+nT618
                            +59OmcsJbJOcvyZuYu/vvC7yXuKhqYGF44MPlMYV5igvH/+YIgCEEApxQOSIwpzEuOLB6QvKdowK
                            KfwD0ZDcV7QUYLjEzjBLiTEwRBiIK0RI1grSRn2Y0ZPcVngdVFkoIgxJG0mwxHZXSVvUVEKQhCXw
                            HV9xm5idsy+opuyc8pu0lEKQhCnyQ3MTyyqrph6bsK88omsxkRBEHoAyDaLPh+8qcZrQW/pDt0cs
                            vu5w4uCILQF4HTMooLboEsMSyIO6AgCEJfBm4LrIqebq+U8ZOCIPRj4Djf0hRZCoJwrQDX+Rr0Lt
                            VwQRCuJeA8T9KUDh5BEK5FtDuC0N3OJRQFpTcvKSz/WWVy0+BtS3eMqFtX9/S+qr3PHdi6/3+a3x
                            UEoX+Be7t27N7K6tENFZsf2LlyxR0V8+EAzg1RMjNv4Z0ZHdov2Wi3RAGhsFBwXKEKgnBtARcgaE
                            r8eOUszhmhk5eY5KoTCKPg2QRCAE8TkaQgCHbAEXAF55AwwduMGS3yiyHL27gdg0ZEKQiCLg1G9X
                            3NoDcSnFNCw27SjrCr4givRZSCIPgBfRtRVdUto0yYlNshKNAese+Fpu1cAQiCIOiAaHPDL6oWc6
                            4JHC7KLLwunNmH0KGzZXhNOXfSgiAIftg6fNdqzjtB0ivKRM84t6FfIEsMC+JOVBAEIQjgmLCr6F
                            cNZp+dl/7uDruhV3ACMn5SEIQoQBU9TGnie0EZXQZfHRdZCoIQNZBmWIPer1TLlxmhJreBH+JYDT
                            84vWH3kWT5/o5Vs1tPbB5/+rPqUV901z789Zn633x7ds8DfwH4f/x2eufoc6eq/qPr6OriI9inKb
                            /2PS5NQRDiBdwTljTT1fKge8dj08Ezsam6Ze7GfZ3rpx397N1RX/zf/w5J+aG7ZsSXx9ZOP3rYSJ
                            M9niAIsSC0jiB8Dyj9LV9upQfQzc+dQKRM2V/TUV7QdnrHE59z4gsCRKAdq+a0NE57v5bNgyAIWW
                            XTvduWco7yQzHeL5+VlxzJrdQl2+2WjUaVu3PtzLYz7z34LSe5MOjZPfxiZ8WkzsZXPtzF5UkQhO
                            yw77+btofQCTQ8sA4fjL7nMh4FbcsSzT11D33DSS0KenY9eqFjdfERLm+CIGQHvFXIucozuWXjco
                            oDeB2yfFBlkstw2DQVvrPn9PYxZzmJZYNPd4w+1zSzup7LqyAI0RPkpB1wZQ63QpdsVMXbliSbo6
                            x+u6XHyFPb8rJDXJ4FQYiWoKNM38JcfseGBVxGw+TYmvz2sw33X+KEFRc617/SweVdEIRoCTLK9C
                            3MSGcfmthUffzN8V2coOLI8U0vHkee2XMRBCESgowyfQkTvVBcBsPi1NYnezgxxZlTVeO6RJqCkF
                            2CGszuS5iYso3LXBgc3/jicU5IfYGTVc99yp2TIAjRgE/gcA7TxZcwo6qOoz2QE1Ff4lh5fjt3bo
                            IghE9Q1XLPwiz90ZJCLmNB07Z8wSFOQH2Nsw1DUu1LF37EnaMgCOETRLXcszCj6B3/qKC63m7o0N
                            b1T6dmzHo5zX9OHpca8+wTacY+9/v0fys2Lkx90l4XCFOLXkxNnjnhyvFeNThV92s2X1acqRv2TV
                            PBO3u4cxX88f7k+trq6Qs/fKvw2daNsx/t3FAy9CR4s3hMO37DOm4/4dohiO8BeRYm2gS4TAUJBo
                            Jz4iEMaV3695eKUmDoky+l/uHhp67itQ1bU8dOdbui4+RnqXHT5vXig6Yj6fX/9l+vpkY+PyN9LG
                            JSwWRtaWKgPXeucWTPlC31O18tany7YFIzxEMSWltyT1d56c/PEPg3foeosB32gaAgMS7dIMFxkI
                            clC/7m29cSN6WcQF6RPy4tr6Ccdk9ds5fKCoImUXPbm8E5YHsCaQRRhtiXyxega+kEbY99kQbyhD
                            SjuLZBE8T75Z6FWf14/Z+4TAVFR3nREU44KkEK80jnqV77g9r3D6bXc8IEkObR6ofY/FmBVzm5c8
                            42uAlwY0AqbgXkxKp5d5zbUPLAyaAlBXADq8famLwhVZP8YergwoGp1kWX2bfwutT25F+l16nb4s
                            bn0nQDldHy+bd+paZpZm3J3V3c/mbM52EG1wLliGPi2Oa8Q2BIAw8syldQ188ONV+QKq4x8qLmLU
                            7g9W3OZTp4FmaYHT6Nr3ywq6f2txc42agEKcyjJ7p67Q+chAl0I80eo2qOyUK4c88GuAERpZlviJ
                            WJG69ICOJRRXRy0YArdCzKS/+G9SSoquT16f3V9Iwb+QLkiYiMy4cuyxfcegHp7ln4g9TXi76fSi
                            3+ni3nFuWm80d54dJ0y+rSQWfpvNYmL5cTzhtltTFxffp3CIzb18zuaWv2YnuUV33yB+k0UH5cGR
                            IoR+yLsuTWA+yLvCEdpEnXEdB1tIOuJ8C+dF1xrlb5Aubziwv1z3y4mXOZDp6FGebrkJgBiBONmS
                            CF2fbJ6V77AzfCBLrSxMxK3LlHCW42VZS4CXBT4GY550JAbug2JIUbzxzhvVk4xteoAeyPdNYmbm
                            CPawf2wb5vzXRXZQYoK0Rx9YUvN5+Z82Bn94Jbz1mVEQSeTt+IBrm0zJD01hplxKWHhwEeTCjH7Y
                            a4sK1ZmLh2JEKUuZsHiF8oX3hg4tjIBzCfX1yAsziX6eBZmFyGggBzTPbsfugiJxkzcRImmDB9mm
                            tp4p3zA1P213BlEAWoOlG1jW62sG8yRHiIVOjGQpXVS1sYJEHRJW5Y7lh2YB/su9Q4f7fHp2rzLi
                            MC5NJU2WE8dLCt22YIJ2GqQIjY1ixMN/uGDfIBzOcXJziX6RA7YWJiXk4wHHETJpg1Z0KqZ8+v2P
                            ya6Swv+Jgrg7DBTUay3LXwh5FEIyoQFkV55aWDznB5tGPjrEc7sW+NC3lZUZWRGtreuGOY0RHmW5
                            m0q2e4byfF9oBLT0WE6Q/OZTrETphdOx+37RlXiUOnj5lXCl5KtW+/L3W2wVmap3c+8Xk2XptU2/
                            64P/woQLRJ0nQrLUCCAH6aDXSjTBGmM3QO5nOLE5zLdIiVMFvmV+zjxGJFXDp9VCDM1q33upbm4b
                            kVkY4PpBtfp+0PYkI7VZNxs6LqDtFCHAT+jd+xHiI6v9idyLxUjdGRgn3soktIBfnaYVT/kW9uG6
                            ATZfYXYeJaoo0TZQ+QnhmUGa3HthddXk86B/O5xQnOZTrESpj4yBgnFSviWCUnYYK2bc7SxEfauL
                            IIi7Vz7u7CH3XLQmuRANwsEOHKpHVvqB24gXcZ+zvJk6TlpoMEcqDoGDcyl975xblX5QPts1Z5wD
                            liGwibO54KJ0wrkQQtTPU4EBq2cytMnOOm5PWpdcZ6OoZXkAbODQ8iejiqeaPtzOcWJziX6RArYX
                            bXPOo4lEgl7sJ0E2nii5ZcWYQFxs3hj9pKOEDt8QQr5t/y1TpDtDQwHXKDQAj8G79XGDdx+dxBZ5
                            cu+OurxgCid5c7DsA6bEMCsIOkhaEtXFoAbbLYBh1KSBP/D3Fz24KNRlrYxqmDho6N7SEMPEis8r
                            Er07GFfbi0OLA94NIjsUNW9IBxK0wSLIFrCXCdAK6ZGVxrWr9q3u3nzdfTDISMMqZ/m88tTnAu0y
                            E2wsS3vzmh2NEXhEnStOsIwjfTuTIJgxWZwdZW7X/qDQYJ4obk0nEC0RUJC+CmV4+DyAS/keBWzb
                            39PJeOCkWXVtVsPASwfsW8W75CvkkmwCrKJGE7dT6RMFWCEqabKFE9LtAVpttB9HbgWLiueEDi4c
                            k9HAG3b1zgXKZDbITZmly9n5OJHaowf/2Hl3vJbuqCVb3EaEX78a7UysodvTjQcjS9fsjYFzwLk6
                            RpFWm2Jl4/wJVJGDgJk6qTb+e7j47soDZHVGVxTFTlcAxzVd9JmIgAsZ1d2yvJV22TvHJ8iygT4q
                            ZB2HZv/5AwIYm3ip5tTefFQlIUobtpGwU0cB3RK5ceSQ9ShygRIeoKk7YPA5IoygbH4raJC5zLdI
                            iNMPHVRU4mdjhFmGD8jAWpiaXLfDHKiC6R1ugJM3sJ0oyVMIGVNDtWzXY9gNovboWp0/5mB4mGaw
                            tFdQ9Cw7GcOn2c2l6p7RLtkZAI7UdCAVZtjiQ45EU9pgrSoTwGLSmIGttbRaxcenSOQefFL24777
                            IF5zIdYiPMT98ad9osEidUYT72/PTUQ3+cFBqPPTetlxw57IQJuI6gE5vHn+bKJAyyJUyA6hvayP
                            Cbzo2lSs8q3xRdcmIg2UKM3L4Q6eX8ue+tp/xw6aHJAOvcVoMRnWF7q2FedhFr3IQZdziX6RAbYe
                            qMvyRUYcYFJ2ECc5vmZ9XRdfxELUyqrvlJj4RiNZRI7RlHtAaJqFyJco2qt1WUqdNbDyBXbM+VI8
                            aYYh3KmtvXDDUbWHWOUZsolze3woS8zeXiF3Ne+gKcy3SIjTB7ah/+WpWhG/qqMIEqTZw7VyZh4F
                            aYuIkhmqjg2g8R7eEVTqfOHpKCG5zSQDsh8uIUaTqNNqB2UTcR6+rSn6fb/swdY4TdQwziwjonYY
                            ZBX5Qm5zIdYiPMs/W/0f7GeF8WJqA2zTPGuXNlEgZuhRk1a+Z+10sNGZmnJ7Pr7EFnCWblcQMiSS
                            4NtfOHQB4wOQknBlRxsU2rhYApYnXzPjkdzyr6pXxx+XASJh4QXDn4gfIrwtSAy4wfztQ/oP2d8b
                            4uTIA2zZ737v8LVyZh4CRMVAtpKrAoILGowqQbEqKg6eXsxnIGBeRCc2eq8uTE4NTuiN+x3q4jCV
                            CHj1UPudqZxe3vJMwwIGmKMDXgMuOHIIX5h0klqfYTXb2GDgUFZmd/0jgGd2xdYYKPtw2+xJVJGD
                            gJM2pojCEnTG77KLETw3c923zESuflNL4THTnpY1iIlzqQ1PJREWHqwblMh35ZJYcwOdEFSZDCPL
                            L1l7GJMKOmrwoTbZOUT64qrVbx7doxqS3Uqv2SG1uqIsLUg3OZDv2y06evCbN189CLXJmEgQjTPU
                            5ioFnXrWTn1PNOsoNYuf0BvbppNcpAhKkH5zIdYiPMrndHfslJ0Y5+I8zKEY6vBQaFCNM9TmJwqk
                            6rPe/c/tRx5DRcCq96cvsDEaYenMt0iI0wT24e72vguooqTLQ3dpwIhrCE2bJ+bDdXJmFAwsQEEn
                            hdMSqsepP9CBOiQtro2acZeazANoDO200nkpMYqB3TKkJUq+XcsCmnWePpPXe7QedOwoR0Ie4goX
                            MSYWrAZcYPeD2Qk6IdboT58bGTqUMtRwOhzUgrDGE2L8mPbOZ1EmbUQFLcDW0nTAjHatykOljdK1
                            bDeHBMTNbhJpKiAexW0qPecrP0MPYUv1v1jgNIENvYDU1yEiYEh/VhIMLUgMuMHzABBSdFO/pLlf
                            xg6arIJt/YmX/5G9VRQdVOL8JM35Quqrto38MEFriBrcA2AOe/at7t6Y4WKxnTN3mu5MHYXy1DFa
                            dqOb31Y06Hokurd+OpXOyq4wBpYjsnYSId8zRufnEzKD9ucC7TITbCbMqvq+OkaEd/EWZjwY4Grk
                            yyAW4CRDR2ktAB0sQN61WYTlLzMquSk+SoKkzYlQX1lqOaahWxYhwptqF3y9188dLu3XgVt8J0Su
                            dagXOZDrERJuiufuwLToxW9Is2zDeHuXrfOEzQvoabWP3krlWvrC5ehEnvVgOrVw+puopXJ9Xjuc
                            FpsLga3UGuTpEU9ZZbTe6BKJPa/WjAO3Aza7zTg0uEqQfnMh1iJczOdd4/UaHSl9owD62Y1MGVRZ
                            hAALhxN5QMPWl+BZHIpjDVqI3bR50oWD2WW5A+tT1yUSF+wzqrt2vMqJ0/VlFmr6jVIroFbqNLIM
                            LUg3OZDrESpp+PoKn0pSp545zyP3NlERbLmU4fdG7UG0KDvGjcn5t3oN1AEZWOMElATvND+plFnK
                            JCqyo/dfi4jWCdokxAIkRV3OrTxjrRJYiLMJEPXGvUUrj1cYFzmQ6xEub+SY3V+PQsJ0eOPi/Myk
                            ci/Z4PoMgKMkLUYx6PSXMvGmK94GfWdURxqOZTBOvUuaEKkyRrFYWReLCdekwdqNpveYxMuyMiZG
                            5/M26iTPy+3UjXbgysTnQJsiFMXFs8SKiWYn4Ic/vEBc5lOsRLmAYd5QVtnBw5SJj/NGJc6s5Hnk
                            7942//mHrihYJewuTaI72gpglh/s44Fo5J6AqzedGsyGZaJ5xexcNNTW+oAAhvbck9XWjLgzwgBg
                            5EpFgPESHKUKv6dlEXJ0ya8NdqrKTT2y9uQH6RBibb4I5BDw6nyTNUKMq0++iaHSQ3NDW4iS6BW2
                            HiAQi54TrStSS46wggRGyLMsC+uK5cDQVQGy3g8hkXOJfpEDthHpiyv+bMew+6eq+chKl+kuL3Lx
                            ZatmE2H25n/98Odbu2zk+vEiaOpR5bS5ibh148MDW6j58RFFnZSQy0GLLCrD10E3gBUayVmAlq21
                            PF5DQ/JKWPSEc9Nx1INFbtpF4iM6TpNC7TClTFIT3sqxM5uxVm0KizSFHnFa3j8hkXOJfpEDthgm
                            Nr8ts5QZpxI8ywoAhTPbaOMA+//vwJ7tzDBlEE/qjtqo4q6OFFOx8Ee3k6tutZEKlhPbbDTWrVRm
                            eGJKG2mZJ0uKordfi4+cqkE3YdP16PQ80JOC835UtQVfz1ebef49K1wkmYAOcCgeO64PrQtSS460
                            hgW0gR+yINu+YE5ANw+YwLnMt0iKUwD85o2N1TN+wbTpIqJExUx0laXJU8DPwI8/Abw75qnLY3a4
                            N+/VYdgwI3I/Jh7u2mG4/bB/LGuiA+G2vXPAHZYZ3bnnIVKl+0V5rT5aAoG988ggC5NK1wI8yoQD
                            4Al8+4wLlMB8/C3Pvcga1choKifVmimZOkCglz5PPTr4B/R9npYz62G2E2L53exp1zVKhVR0hTJx
                            IKCnS20A2mSsJJACRZtK2p5+QFVLeRltV77tQup1v1V8sX+eXSJnqUXnEvnWwiTPfAWZzLdPAszL
                            pn9lVxmQqS09vHnOVESZAwzUQpTDOOwnwj+p5xDvRy0k2Nm81KGkGDaE79DIZZEtRkgOoht7/dB8
                            F0gXSRllVPuZ9Zeeg8gN2ngVH22MbrA0CE6Z7dY/dWci7TwbMwd4yoW8dlKkiaCt/Z0103zLIDaO
                            v6p9OCMvPqrImpo0dqQ2Va0cvssTcsH8uL0qClasi3+2e8q33zhQVuthXzb7nS64mbrmnRd434QY
                            F2L0RaqihRDed6uZ16rymNIAbWoycYaVmNEfV7LBIyIlVzmaqyLJ876Cy3vxtUYQZ93dyCGgq1+Q
                            Iun3GgenRDBecyHTwLc9PgbUu5TAVN25Jk89kGXpjgZO2vLnFyiiMfJeYd4s4x20AcqjjBSiO6gj
                            AQfVGDPzX6qw3/uFnoN9w0aGPE9tgPU6khHTVdtNNBJFbVXCeJ0ZAiL69EmnEbzSJP3P5uoFEJqj
                            RRZnQeeHAE0duvgqnucO1QhnhQ4XrguuD6IQ90veyaYszXFfsiHYA0kTauL6bOMx+fy2cc2PzAzp
                            Wcy3TwLMzyQZVJLlNh4NRrfnLXYFZQcaJ55Uuux/NlC0RSaNczy9MvkCRmt3ETqVFU5oSXarIZTj
                            YcfoQJqK2UokBVln7PA7JFmSFKXTXv9vNqvqMEfzO4xl6bFqJgxR0V8zmX6eBZmKU/WlLIZSosjm
                            8e38XJkji5619iG2keWj3+FHdOcQY3MqZCww2AG4FuSNwYZqHSb1i/bs7dXXTjQDS6QnArTG5fXd
                            wKMwgJkDSJIGRpBaa6w8OJBp7jeuC62F1DM3jIqdcV+yId9dri7yOscwiD0puXFHIu08GzMEHt2L
                            2VXMZCYVJj9aktT3VzsiTiGGkeWvtU1/5JTdXsOQnXFCTNMGUp8ATR4QN8CRNtAlzmwuT4xhePc7
                            Ik4hRpHlr7pMhSuApEZyLL6Nl077alnMN08SXMqKvlxCcbXungZEnEQZqHV0w5yuVdEIToKfvxit
                            mcw3TxJUwQabVcoW35gkN275yfqPklK7Kwadky+NJHifmx7A0XhGuRoKrjwLcwl9+xYQGXySj4qK
                            C6/tOdo89xwgRRR5qH/zTq88b8nXu4vAqCkB2C6B0nfAsTZCvKJI6+XvRxd+0jX3HSNCLN0KWJAe
                            mHFpe0cHkTBCF7NATwOqRKTnFeYgK3QodsRplE49QPdn1SMbGzZ/dDF6OSZlqUy6a2Z2OaNkEQnC
                            n/WWWSc5YX4Eojwiwbx63UJdtRJoFZgI6uLGntfufxq6rqkOaRt+9jxafNxhHn0hNoTNmXtRmHBE
                            GwB69vc67yyqwBiTGokg83r/ACeqH2vdC0nct4tjg8r+JDfFitu3rEhYw0eQG6oOXNYV8fWjGx42
                            DJug8PTPlzDXc8QRDiAariQfWME4V5yZE5s/MSd3ErvbDxn99exmU+DjQVvLOnNfH6gcNLC4+0bB
                            jb3Vr56PmWzUO/ad0y+Lvq+pb7LuG3lsp//bJl/dju5tcKjjSXvdZ0YMbu97g0BUGIJxt+UbWYc5
                            Qfigck78kpyk3cxq30ypbhNeXcCQiCIETBlmE15Zyb/DJ7QNnf5SzLWZbHrfQKBrNHMVemIAiCmb
                            qn91VxXgqCyYYrc7AUXpcYw23gFUgz7BnZBUEQVMJotyTSHT60oG7ObeQHZFykKQhCFIQpS1Cct/
                            DOjC5zAq+WEzgBqZ4LghAmqIbPuXlxEeegoCi5YdmNGV1eXoKulqtIR5AgCGGADp6wZXlVdZyWog
                            GLfsJtHBTo5pcquiAIQYAx30FN2eZEunecW8KMMgGq6FF8PE0QhP4LZh8Ks71SJf06pNUSdpRJ4H
                            tAEm0KgqADRIl5KzinhEZu4raMHvkl7ChTBSePQuAKRxAEAWRFlJcZntGi9ZJ/Q9lNxXllk5mdQw
                            PhNT7bK/IUBAHABfgETtgdOlagKt6rZ9xqKc1beCeXSBSggPA0QWHV/K6hAgUn1XdB6J/g3q5/Zl
                            8V+jYQNKG5LluSVJl9XfKnGR26W4pzy+7nEhIEQejX5CaHZDTofrk8mD2YuTIFQRD6AsUDk89kFK
                            i/QJpBzMguCIIQd7TaLa2Wy51AIk1BEPovgciSFkhTqueCIPRHUA2f/LeZqduCXKQjSBCEfkVuck
                            gosqQF3e1SRRcEoS+DseZXTdkW5nK5ih7Mx9MEQRCiZNZ1iTGBtVfqLKW5idsk2hQEoS8AUVrOPB
                            TlgkwgM1wmBUEQsklsRGleUFXHZ3tFnoIgZBM4CJ/eCbVDJ8gFGYXV098LyisblT4Bqb4LghAgcM
                            qsgWXjZg9MDEewhmbC8CSZk/P/yYC8u53noPQAAAAASUVORK5CYII="
            height='32'
          ></img>
          </IconButton>
          <Box marginLeft='0% '>

            <IconButton variant="outlined" onClick={handlePublish} size="medium">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdAAAACiCAYAAADxwJx+AAAAAXNSR0
                                      IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABrGSURBVHhe7Z1tjB
                                      3Vfca37BoM+I3uetfmzS5+Lx+Cggz1JxBRlXwgKiqJjYVSN1GLyAdEiIViU6hNhUiruLhpUYlxgq
                                      GtnCY4kECUKC6VgSqFqiBXohIlH7ppRJqwa7reN7+u5/Q8s+cs587+594z73PvfX7ST/buzsw9d+
                                      6Z88w5M3NuDyGEEFIVo7s23jOya+N28yMhhBBCWoHgHH1o01tQ//9282tCCCGExKEDc70NzzBAH9
                                      p0DL8zfyaEEEJIlP95cMOVI7s3HXMDdC5EH9q40ixGCCGEEAvC84Pdm16Ohqd1ZPfGlxiihBBCiM
                                      O7D25Y3Cw8rQjRUb2sWY0QQgjpbnTPcp8UmKK7NxxmiBJCCOl68LiKGJRN1IG7x6xOCCGEdB9pwt
                                      P6690bdprNFE7Q37/43ODgPdqX8H/za0IIIaR88HynFIyJ1AFsNlcINjjPrlhx7NzQ0Fvw7OAgJ3
                                      cghBBSDXiuU3pcJZUFheiZ/v5P67B82QbnXIAODR0wixBCCCHl0epxlTTmOVtRXHA2ODBwo1mcEE
                                      IIKZ4iwnPOXRszhRpCEb1LMTCjDg6Wdv2VEEJIGxNM9/5eMHXRDvNjaj7AIyhS+OVg2in/EgWnEd
                                      dEeTMRIYSQlgRTvcNquk/h37RBOvqVDTul4MvTJLMVpQlOV95MRAghpCnBqb5bEJ6uYZDq35tFWp
                                      LlcRVfT+ge6OhD+nVaTLKQNTitvJmIEEJIU4LJ3kPRALUGU30vBqd6VplFRUacryYrwrKD0/XMwA
                                      C/JYYQQoiMHb6NU4do7KxAv/rKhlul0MtD3+Cc7u+/Mu/gnHNwsNDnUAkhhLQpuN4phaZVh+t+s+
                                      g84r6aLKuJgnP58r1i8OUkbyYihBAiEkz3HZOCE2Jo1yw2jyIeV/ENTjN70E4p8IrwdH//realSV
                                      kEB/puCQ5cdH/wdN+LwcHe4eDp3jF1UFdMSimtg4e1QnBCHazHlVq6zDRnDfh+NZmvCYOzYdq9Mu
                                      TNRCWhDvUs04G5h2FJKa29r2iF8FQjOkCf0yf9B3oPBd+cfwNRoq8ma2l9g9OVw7gFEgbnwd79Yi
                                      WllNI6+oFWCM+wZ+os5wZpXs96nnho456pFs9z1iE45+TNRMUQHOi7nz1OSmlb+ZLWIzytuo0bHn
                                      /smr+WwjCJbRecRpTFFI/kBXudlNK29B2tG54ntTHhCc/sv0KNPXqd+vBP1/5aCsZW6uDc147B2e
                                      AAJ5jPBXOt85hU0SiltPZGh2+PaKXltDN/e2kYntb/23vd9OjujceloIw68iebDow+0noSeK9vSK
                                      lY3kyUE7rneVyqaJRSWnujNw/hZ2k57YVvXKLGH7u2IUDDEN1z3YQUmNZOCk5X3kyUEQ7bUkrb2m
                                      GtDc/Xze8E48LTKg3n+gZnEdPulSJvJkpPcPCiHVJFo5TSttB99vMN8zvB4OkFauLxq8XgdD3xyL
                                      pfdEVwGnkzUUrUUz2rMSGCVNkopbQttMO3TcITTn9tUAzMqBOPXzUz9ui1nzDNZCztHpwN8mai5O
                                      jwPCRVNEopbRtx89Dbkd9FPP1EvxiWrpNfvUqdf3JRuDwua5lmch4dFZxG/X72mbdHfEDvM1rJKK
                                      W0rcSzn+9FfhexVXi6wdngoZ6Gaf86MjhXrHj53ODgnvNDQ7ebt0l8YO+TUtr24oahZyO/czz3N4
                                      vF0IS4mUgMTiOmMEVbWehXi5UkghK9TB2WO88MDX0a3wnKu28zwGuflNJOFnfcnvyz1WJwnv36Un
                                      Ed12DfxWNFf7VY3poJGw6jV3l2cHD7uZUrb2RQ5gy+VUWqMJRS2glKj6v4Bqd6coG6sGOxOv/xAX
                                      Xu2sH/ioZUXXR6lfegVxkMDDSdFYnkBIYmxIpDKaVtLh5XccMTvVBM2yct2yCC855FamZLfxieYY
                                      CuXf4LKbzKFL3KcAiZw6/1AN/nKVYgSiltc+2zngjO03/Zr4IDF4vLzSkE51yA/vbAmBRqBTo3/H
                                      p+aOhW9iprSMBp+yilHeipfQO5BKf13McGzgghl1npph7TPJO6o3ug/KoySmlHiWHavILTeu6GgR
                                      kpAH3lTT0diFipKKW0TUVo5hmcrtFQjBO9SgSl9p4ih1+D9zf3ByOb2WOtCrFyUUpphxrsvEzN3P
                                      KbYkC2UgjKwm/qUW/deFlw4qargw83b9FheXvwweYd+t+Hg9Gb9wcjNx0IRm5+3CxKykaqYJRS2m
                                      lmCc7zuqc687tXKDv8mnevMgxJ9CYRkqM33TY/JJvJAK0MqaJRSmmnGDy6UM3cvkwORkGE7MydS9
                                      XMjsVh6AZPfDQcbJrN1CAk1QebbwhD8lebtwajm+9FAMrB6CsDtDLcikYppZ1iy+A0vUoE5YX7Ll
                                      fB3oUqeHKBuC2raTabYq9Lhr3J3EKymQzQypAqCaWUtqtScIa9yu1LZoNy96UNvcokmmbT47pkmT
                                      JAK0OqJJRS2m4iOC9g6NUdfv3qJS17lbE+o9d7bqFS312s1PevUOonQ6q6kGwmA7QyxIpDKaVtZu
                                      qgdEPyR8uVemWlUj9dpdS/r5mnHGBVywCtDLFCUUppJ4mQ/IdLlfre0pYh2Uw5wKqWAVoZYmWjlN
                                      J2FMOuCMmX+8MhV/X6NUq9+VtiGKZRDrCqZYBWhlgJKaW0XX3mYt3bvEyp7y6ZDVL0No9dlUuQyg
                                      FWtQzQyhArIKWUdqII128vagxX9FKFsJSUA6xqGaCVIVYySintNnGdFOFqbyZCrzUSrnKAVS0DtD
                                      LEikQppfQjMSSswzUYu+m2YASTI9y8sz6PszBAK0OsLJRSSudpms051C9nJ1QIp+fDhAqjN3+x/H
                                      BlgFaGVEkopZTO1zSbXoThOrJ5fUO4jtz8iByCWWSAVoZUSSillM7XNJuZmZsv1x0STh2uDNDKkC
                                      pJpT43oNQLH1fq1S8o9a8PKPXO15X62bNK/fz7Sv3vq7L4G5Z5+9HZ9X542+x2pO3nIbb9j2tmzf
                                      O1sC28d2w3z/LbcmLfYB9hX2G/nfgPpSZ+rtSZMSWC32MZLIvP4ejvK/VtvS3pNdJq9yO2bT9zlN
                                      F+7m/on6X1itR+vnaf2f1m952Pdnm8H1sn86wrVnffueWLHi/2GMF+RZmwThHlsdrP1b5vlA+vKS
                                      0bJ+qau+8gtllUmT00zWahzA0Je19vZYBWhlRJShUHAw5oHNxozPMEjf97ertJD1wcpDhwbbnQ+N
                                      iwkcDy0naSKuGGGMqCRhLvB0ErbQP7Ew0NGkqsExeOWUB5Xv18sjC1J0UoF/Zns+B2wXuWtpeH9n
                                      O2wYP3VcT+krCfqT0xwWcmlTEqyox6medni7KgHL5lgKhn7mdq91+zY3hiWN5WnNh2M/Ba9riwJw
                                      Vxx0VOmmazEmKvt45sftgsQspGqiSlWhZobBCmzRp9NOxpKDJAW4FGy66PBrCsALC02qfWtCdHRQ
                                      Zo2jIVRbN6hDBBWBQNQg69/lafaRryDtA4CqwzptkkZBapkpRqFcQ1+mkb1CoDFNj1EaBVgIax1Z
                                      k/A7Q1Uj3CZ1pFOfGZYpQhWh5rGhigpNOQKkmpVoXUQDBAs/FakwaXAdqaaD1CT7BqMLztlsmaBg
                                      Yo6TSkSlKqVeM2EAzQbJwdi++JMkBb49YjXM+rC7jG6e43mAYGKOk0pEpSqnXAhigDNDu4Tue+Jy
                                      sDtDW2HuHyQt3KFr0RLw0MUNJpSJWkVOtClmtNDNBGUA73fUEGaGtsPUKPr25Ewy8NDFDSaUiVpF
                                      TrAg5uBmg+SEN+DNDW2HqEO6vriHtilAYGKOk0pEpSqj7g2pp9EBzDrTiwouL39nnNsmm3AEVwYF
                                      /9pw463KiC/Xf0Tr3+Jz4SP+NvWGYyYdC4j9ZYk4QVlsU2UMZmNyZlNWmZoO++wFB2ku0DW4/SgN
                                      eynymOBfu5uscHxDGEsuGYSgq2afddGhigpNOQKkmp+hB3XS1ONESv6YMvacOflnYLUASk+7o+Yh
                                      3f/Sk1lL5hEl2vSKNlQqgguO2JBU4iop/tz54zCzch+v7/DpNbmJMSbDsuwJIGKLaBUMT23dfzFW
                                      VCWXxxgykNDFDSaUiVpFR9SBqgrmhgkoKGCQeh71l62QGKRtwNM7t+kQEK8T59aKcARd1CHcE+8Q
                                      miNAEa5ws3zp7o2RBLGqB5zbrj854Aerh2HWCPEwSdz8hPUQGKkx18hrYMDFBSFlIlKVUfsgQoTH
                                      JTBg5Eu55vo192gNrl0QCjR2N/LjpAoc8+aZcATdNzyzNA4/RFWjeNzU4y3RMMd53oz/YkoBlFBa
                                      hbFhyLBU7nZ5pNQmaRKkmp+pA1QDFvp29v0r0Bpu4BGrXoAPXdj+0SoGns9ADF54STMgw3JznBqE
                                      uAFqxpNgmZRaokpepD1gCFvsNU7vBPpwZo9Jm+OO3ZvJ1U33ee3Sw3EUXXq5udGKD/pOsDhkGz1G
                                      MGKOlGpEpSqj7kEaDNhqlcuiFAXRCKeJ/WPCajlz4vBqi/viBgyhT1Syov9AlQe83UV59tAgYoqQ
                                      qpkpSqD3kEqO91UBy4dp1uCNAiyPIcaHS9ulmnAC0b99iI6ht2RcAAJVUhVZJS9SGPAPU9wLvhGm
                                      jRSPuDAepvXWGAMkBJI1IlKVUfsgYo5hb1xX1YnAGanLjPigHqb11hgDJASSNSJSlVH7IG6HsejZ
                                      7FPRgZoOngEK68rq91hQHKACWNSJWkVH1IG6B47ML32qcF69j1GaDpiYYoA9TfusIAZYCSRqRKUq
                                      o+JA1QhCDuuvVttC3RBoIBmg2Ux5aNAepvXWGAMkBJI1IlKVUfJnWDZG+jl8Tf7LOKPlOKxRE9EB
                                      mg2XBPfBig/tYVBigDlDQiVZJSrQtSL5cBmg0892fLxgD1t64wQBmgpBGpkpRqXZBCsFMDFJOCoz
                                      HEMHcrMa0blkcD6TsdoovdN2UHKMqM12wm3p+0bjPLCFB38oIyxL7ygQHKACWNSJWkVOuA++iKKx
                                      pZH9otQLM0OFjXJ0QsVQWoz1B+XQO0lbjGj+CT/pZG7AcfsgYo9gvqg69vfNms2AIGKKkKqZKUat
                                      U0a0QZoPH6YvdN2QHq01tulwBFYOKzxZ3N7omBtGwaywxQad04cZLgAwOUVIVUSUq1KtDAxvU8rQ
                                      zQeH2pKkB9SNOLKytAsd9wYxyCKW5+Ymm9NDJAvTXNJiGzSJWkVKsAB7tP6DFAZX1fB1QRoHhNH9
                                      CbQ0gl+f7IvAMUvUuUAdchUW7MmuW7r7CstM2k+k404gboe/r/qAf25zoEqN2XrU6MM2iaTUJmkS
                                      pJqZYJDvIk4eHbkKEhztKY4cAf9ryRA0jbgEUHKMqJ3kqSb2ypIkCTBLwFjTtCDA0w1sd7lbadJU
                                      CxTYQ1ggFhFN0n2Fe+4Q/wOm6IJRXlSTLRiBugFtQFe8NWK4oKULy+G+DNesoZNc0mqRNqbOky89
                                      /SkSpJqRYJhmlxYOGMNMmXA1t9G30LzsrxXZtxja8rlkHjhwYs6VeISduDvsGBBgblRGPeqqxo0G
                                      2Dn+arzpIGKD4vvBaCGiLQ8Ppx4u9YDvsR62H9NOWUwHawPTTQ2D5ex+fmJNQ7t0xYx+f9232V9G
                                      5nG/54TewT1ANJfOb4O8rlBo4vWM/WizQUFaBRsM+l7eWgaTZJnVCnVu4KJld+SU0M3qFGV240vy
                                      4FqZKUqg82CG1DFBW/tw0vHrvAgffCjelC09WnsYwD5bKNL8plxe/wt7RgX0hlhWgk0+LuT5hHCL
                                      llzfKeiyJpUBWNDdA04VYG7tBoGhigJG/U2NBqNb1yb9RgcuguNbb8hqJ7p1IlKVUf0KBI6xYtzu
                                      jrRrPGIUuAFoFb1roFKMKzbmWyAYqgqiO2fDANDFCSN8H04O9IAeoaTKy4Nzi54lMIW7NabkiVpF
                                      R9qCpAMbxZ116KZN0C1C1r3cLKd1i1TOz+Qr2brFnZoqGUBgYoyRs1NfSHUmjG6Q71quFVC81mUi
                                      NVklL1oaoAhXXqDaBHLJXRWqcAjd4JWbewyjqUXgTuCUedPkvMRR09cUsDA5TkDa5/SkHpLQI4w1
                                      CvVElK1YcqAxTWYSi3VXjCujS6UlnrFla4IabOAQpfSxkgeYIRGOkxnzQwQEmexF3/TGuaoV6pkp
                                      SqD1UHKERjVsWwGhqwaG8uzqoDFD2VuEdk6hZW2Kd1D1CIz7Sq4Vwcd1KZYBoYoCRP1OTQrVIQ5q
                                      HvUK9USUrVhzoEKERj4vMcYF40a8AkqwpQhDx6nc3ueq5bWCHo2yFArdi/ZQUpToRe+7xcDmsaGK
                                      AkT5Je/8xkzFCvVElK1Ye6BKgVDR0elymiQUMYYdtpJjvAzSfoKePRmTIaW3wurYLTinLhfWGdqm
                                      7MQmBi36Ac2FfoheLnLI8rZSVaJmnfudrPN+99iHIkqXf4HJPut6IDFPsEZWoV/hk0zSapGqVWLR
                                      SDrgTdoV6pkpSqD3ULUFc8b2ob4jShhYPeBlHaGYLiRNAfvXN22zYosjS8aGRxdo/3m6RnLInQxf
                                      tF+bA9lBHbxr6w4vWs0XK7f4N2HWwDYntogLF937Lis0SZsB7WR6Bgv0XL02wf4m/RcmEbtkx4r7
                                      ZMWZ9TRnndzxevZe8uhha3TPi7LY8tS5ZyYF23HO4+w+u5+yprgNr3gG2j/HitpJ9xRk3zTaom7+
                                      ufqX19sVI/ukyp71yi1LcWiJWGJtAGg22IbTjYxhO/g3lM9JBW2+jZAIuWE9py2sapqrLSzjFpyK
                                      HO1azemeabVE0wpXuAUqCV7ZtLVYOvLNKN60KlnmWYUkqpq2m+SdUE0yvuFQOtbKMB6ore6cu6d3
                                      r4YrEyUUppN2mab1IlVV7/nKcUnJI/XTI71Ps8h3oppd2pacJJlaiJlRvFMKtCKSx9tEO9f88wpZ
                                      R2h6YJJ1WiA/QOMcyqUArHpNobkTjUSyntYE0TTqqkNtc/oRSIzfyXJUq9qgPz6OVK/ViH5g+1P7
                                      hUqSO6N/od7XPskVJKO1PThJOqUGOrlolBVpU2EP95kRyIhy+ZvSP3GQYjpbS7Nc04qYqir38Gk1
                                      d9CaqpKzHL0R3h4zKYMnDqyhtCTw+tVmrpMju9n1RJKKWUzjdsxEl1JL3+GQ3E0CaBmBSpklBKKZ
                                      2vaTZJVeD6pxSI4Rdru4GoNasUilRJshg8tUAFTy5UF/7qUnX+zxerc48tVef2XqFmvrZIXJ5SSt
                                      tF02wSMotUSVwRhnBm3+WzYag9+3C/OrNrQJ15cEiduu9KNf3Fq9XUH1+rJv/gugbxOywbPMW7cy
                                      ml7a9pNkk3cuJTa5dM37326g/vXHP9ya1rPnnys+u3oncYBqIOw9MPrAgDEcE39YXV8wLRR6x3Zt
                                      dy9jgppR2naUpJJ4AwhOOfWbMFYQjHt63/8vhn1+2d2LbuifGt657X/uTk1vVv6n9/KSmFYBpP3X
                                      dVOFQr9jaPaJ+N/I5SSttM0/SSuiH1Die2rv8jBCLC8OTWdd/Sgfc8wlD//91oEKZVCkNf0duMHa
                                      JFYL5xkVLv/4ZSh3vn/51SSttM01yTosmjd1iGE5+7LpDCMc5wiPbBofgh2h/osPxvHZrTPUq9ow
                                      P0WYYnpbT9DZ7uGzPNO0lCVb3DMtQBOiMFZdSmQ7S2tzlmghO+rn+OLkcppW1qcLD3uIkEEmXyrj
                                      XX1613WIYTd685LQUmtEO0F/ZfJlaoht6mdUT7EnudlNLOUvdAXzRxQaJM6Z6lFDCd7sT2NePR0D
                                      z9wMr4IVqpt2l9X8vrnZTSDlQH6B4TFyTKh9vWXCMFTMd719pRBGfTIVoo9TZd3+aQLaW0k+291c
                                      QFiRLcvXaJGDCd7bu4jnv+Ly4fEytMs96m9aSW1zsppR2s7n0Om6ggcYSBIgdNZ7lt/ZHx7Ru3mL
                                      fdg6GJhgrTqrdpxfXOIxyypZR2tsGBvkOmuSRx6HA5Oi9sOkUdmrhz+ITuaZu3O4c61LPMq7fpOq
                                      yX4yMqlNIuMPjmwlWmuSRx6IDB4yhyALWn745vW7fX7W1GCU713BJM9RwTQzJOBK1QySiltNNk79
                                      OTSYSNHETtpRmilXqbQI31LNOhuUc7JgZknLje+WOGJ6W0O8S1T/Y+PQknR5ACqS1cfxQ3BMWFJk
                                      jV27TieicfUaGUdpHBNxbsMM0naUU43Z4YTrW15RBt6t6mK6fko5R2mcHB3v2mGSU+TN656XohpO
                                      rntvVHTm7d8MnCepuufESFUtplBgf7OG1fUuo9mcL6f2s1RJtLb9PKKfkopV1o8HTfMXVo6TLTrJ
                                      Ik6LCq07OgLYdoQW69TWMw3XM8CHpWYQhDqmCUUtqJctg2I2FPTw6z8mzyzKYl196mo97efqV65s
                                      6+goMLdgQH+4alykYppZ2g7nWOBQf67jfNHklLhc+ChtPqNQtNkHdv04og1j1PsQKppy5ZrUP0kF
                                      TxKKW0nQ1H2jhkmw8nt63bL4RbUb47gddrMURbVG/Tqrc7HJzt+Zh5uVhskLJHSiltZ8MeJ6YwZX
                                      DmC3qBQtDlq8cQLSiqt+mqe53H3CFbX/DNBKiA2hfxRbOokFJFpZTSKg3D8mDvcNhWHei7n9+qUi
                                      AFPgsaDtF+eNem681LiRTd23TVr8EL5oQQQvJhfPuaLUL4pRWh2fDNJ3GU0du0Ipz163GGDUIIIf
                                      mRy7OgnkO0ZfY2rfq1hvGIiikCIYQQkh9iKLY2HKKtW2/TNZjsOZTmeichhBDiRaJnQT2HaAHudC
                                      2zt+ka94gKIYQQkhvj29Y9L4al1XOIViK861UIuKIMA3uyh3edEUIIKZ6YZ0G9ptVrBYZvpaArQj
                                      sln3lpQgghpFjCa5k2OM0QbZreZhw62A5JgZenuufZMCUfIYQQUjjjn9m4BSGaZ2i6mLtvi5pVKH
                                      ZKPkIIIaTt0UG3RwrALOptek3JRwghhLQtphc6LAVhGsObkzhkSwghpBvI64YiHcScko8QQkh3ke
                                      WxlvB6J6fkI4QQ0o3gmqUUjq0Mr3fyERVCCCHdDIZgpZCMk1PyEUIIIZokj7XwERVCCCHEAcEoBa
                                      Y1DFhOyUcIIYTMR4focTE8OSUfIYQQEo/0WEt4fZTXOwkhhJDm2MdaMGTL652EEEKIJ+p0z+pwyJ
                                      ZT8hFCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEJIve
                                      np+X86XW1DzIlM0wAAAABJRU5ErkJggg=="
                height='32'
              />
            </IconButton>
          </Box>
        </Navbar.Group>
      </NavInner>
    </NavbarContainer>
  );
});
