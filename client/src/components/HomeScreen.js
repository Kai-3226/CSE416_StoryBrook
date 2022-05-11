import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Copyright from './Copyright'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuthContext from '../auth';
import WorkCard from './WorkCard.js';
import Carousel, {CarouselItem} from "./Carousel"
import HomeScreenFollow from "./HomeScreenFollow"
import { useHistory } from 'react-router-dom'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    
    // let list = [];
    // let work = "";

    // if (store && store.workList) {
    //     list = store.workList;
    //     console.log(list);
    //     list = list.filter(item => item.published["publish"] === true);
    //     const rows = list.reduce(function (rows, key, index) {
    //         return (index % 4 == 0 ? rows.push([key]) 
    //         : rows[rows.length-1].push(key)) && rows;
    //     }, []);
    //     console.log(rows);

    //     work = 
    //     rows.map((row) => (
    //         <Box sx = {{display:'flex',position:'relative'}}>
    //             {row.map((item) =>(<WorkCard work={item}/>))}
    //         </Box>
    //     ));
    // }

    return (
        <Box id="homeScreen">
            <div>
                <Carousel>
                    <CarouselItem>
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvVjITwe377mswrgJw8klsFzO3KT8dmbaeg&usqp=CAU"
                    </CarouselItem>
                    <CarouselItem>
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf9kvIzoVAbJmLgv5k6kHQj6czGK0V0Qew1w&usqp=CAU"
                    </CarouselItem>
                    <CarouselItem>
                        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/29841/dog.jpg"
                    </CarouselItem>
                </Carousel>
            </div>
            <Box>
                <Typography component="h1" variant="h3" sx={{position:'relative',marginLeft:'5%',height:'100%',width:'100%', fontFamily: "Comic Sans MS"}}>
                    Follow
                </Typography> 
                <Button id='follow' onClick={(event) => {history.push("/view/")}} sx={{position:'relative',marginLeft:'90%',width:'10%',bgcolor:'white', fontFamily: "Comic Sans MS"}}>
                    View More
                </Button>
                <Box>
                    <HomeScreenFollow>
                    </HomeScreenFollow>
                </Box>
            </Box>
            <Box>
                <Typography component="h1" variant="h3" sx={{position:'relative',marginLeft:'5%',height:'100%',width:'100%', fontFamily: "Comic Sans MS"}}>
                    Lastest
                </Typography> 
                <Button id='lastest' onClick={(event) => {history.push("/view/")}} sx={{position:'relative',marginLeft:'90%',width:'10%',bgcolor:'white', fontFamily: "Comic Sans MS"}}>
                    View More
                </Button>
                <Box>
                    <HomeScreenFollow>
                    </HomeScreenFollow>
                </Box>
            </Box>
            <Box>
                <Typography component="h1" variant="h3" sx={{position:'relative',marginLeft:'5%',height:'100%',width:'100%', fontFamily: "Comic Sans MS"}}>
                    Most View
                </Typography> 
                <Button id='MostView' onClick={(event) => {history.push("/view/")}} sx={{position:'relative',marginLeft:'90%',width:'10%',bgcolor:'white', fontFamily: "Comic Sans MS"}}>
                    View More
                </Button>
                <Box>
                    <HomeScreenFollow>
                    </HomeScreenFollow>
                </Box>
            </Box>
            <Box>
                <Typography component="h1" variant="h3" sx={{position:'relative',marginLeft:'5%',height:'100%',width:'100%', fontFamily: "Comic Sans MS"}}>
                    Most Likes
                </Typography> 
                <Button id='mostLikes' onClick={(event) => {history.push("/view/")}} sx={{position:'relative',marginLeft:'90%',width:'10%',bgcolor:'white', fontFamily: "Comic Sans MS"}}>
                    View More
                </Button>
                <Box>
                    <HomeScreenFollow>
                    </HomeScreenFollow>
                </Box>
            </Box>
            <Copyright/>
        </Box>
    )
}

export default HomeScreen;