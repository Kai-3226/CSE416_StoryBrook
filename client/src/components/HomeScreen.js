import React, { useContext} from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Copyright from './Copyright'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
    
    let showCases=<CarouselItem></CarouselItem>;
    if(store.workList)
        {   let mylist=[]
            mylist = store.workList.filter(item => item.published["publish"] === true&&item.workType===store.status).slice(0,4);
            showCases= mylist.map((item,index)=>
                <CarouselItem key={"CarouselItem"+index} item={item}>
                {item.content[0]}
                </CarouselItem>)

        }

    function handleViewMore(criteria){
        store.viewlist(criteria);
        history.push("/view/");
    }


    return (
        <Box id="homeScreen">
            <div>
                <Carousel>
                    {showCases}
                    {/* <CarouselItem>
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvVjITwe377mswrgJw8klsFzO3KT8dmbaeg&usqp=CAU"
                    </CarouselItem>
                    <CarouselItem>
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf9kvIzoVAbJmLgv5k6kHQj6czGK0V0Qew1w&usqp=CAU"
                    </CarouselItem>
                    <CarouselItem>
                        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/29841/dog.jpg"
                    </CarouselItem> */}
                </Carousel>
            </div>
            <Box>
                <Typography component="h1" variant="h3" sx={{position:'relative',marginLeft:'5%',height:'100%',width:'100%', fontFamily: "Comic Sans MS"}}>
                    Lastest
                </Typography> 
                <Button id='lastest' onClick={(event) => {handleViewMore(0)}} sx={{position:'relative',marginLeft:'90%',width:'10%',bgcolor:'white', fontFamily: "Comic Sans MS"}}>
                    View More
                </Button>
                <Box>
                    <HomeScreenFollow criteria={1}>
                    </HomeScreenFollow>
                </Box>
            </Box>
            <Box>
                <Typography component="h1" variant="h3" sx={{position:'relative',marginLeft:'5%',height:'100%',width:'100%', fontFamily: "Comic Sans MS"}}>
                    Most View
                </Typography> 
                <Button id='MostView' onClick={(event) => {handleViewMore(1)}} sx={{position:'relative',marginLeft:'90%',width:'10%',bgcolor:'white', fontFamily: "Comic Sans MS"}}>
                    View More
                </Button>
                <Box>
                    <HomeScreenFollow criteria={2}>
                    </HomeScreenFollow>
                </Box>
            </Box>
            <Box>
                <Typography component="h1" variant="h3" sx={{position:'relative',marginLeft:'5%',height:'100%',width:'100%', fontFamily: "Comic Sans MS"}}>
                    Most Likes
                </Typography> 
                <Button id='mostLikes' onClick={(event) => {handleViewMore(2)}} sx={{position:'relative',marginLeft:'90%',width:'10%',bgcolor:'white', fontFamily: "Comic Sans MS"}}>
                    View More
                </Button>
                <Box>
                    <HomeScreenFollow criteria={3}>
                    </HomeScreenFollow>
                </Box>
            </Box>
            <Copyright/>
        </Box>
    )
}

export default HomeScreen;