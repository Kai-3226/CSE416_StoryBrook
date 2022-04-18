// //author kai

// import React, { useContext, useEffect } from 'react'
// import {useState } from 'react';
// import { GlobalStoreContext } from '../store'
// import AuthContext from  '../auth'
// import WorkCard from './WorkCard';
// import AppBanner2 from './AppBanner2';
// import Copyright2 from './Copyright';

// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
// // import { Carousel } from 'react-responsive-carousel';
// // import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

// const HomeScreen2 = () => {
//     const { store } = useContext(GlobalStoreContext);
//     const { auth } = useContext(AuthContext);
//     const [input,setInput] = useState("");

//     useEffect(() => {
//         store.loadRecommend(auth.userid);
//         store.loadFollow();
//         store.loadLatest();
//         store.loadMostView();
//         store.loadMostLike();
//     }, []);

//     function handleOpen(id){
//         store.setCurrentWork(id);
//         console.log(store.currentList);
//     }

//     function LeftArrow() {
//         const { isFirstItemVisible, scrollPrev } =
//           React.useContext(VisibilityContext);
      
//         return (
//             <IconButton disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
//                 <ArrowLeftIcon></ArrowLeftIcon>
//             </IconButton>
//         );
//     }
      
//     function RightArrow() {
//         const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
      
//         return (
//             <IconButton disabled={isLastItemVisible} onClick={() => scrollNext()}>
//                 <ArrowRightIcon></ArrowRightIcon>
//             </IconButton>
//         );
//     }

//     let n = 15;

//     let recommend = "";
//     let follow = "";
//     let latest = "";
//     let topView = "";
//     let topLike = "";

//     if (store) {
//         recommend = 
//                 store.recommend.slice(0, n).map((work) => (
//                     <div id={work.id} onClick={handleOpen}>
//                         <img src={work.frontpage}/>
//                     </div>
//                 ))
//         if (store.follow.length > 0){
//             follow = 
//                 store.follow.slice(0, n).map((work) => (
//                     <WorkCard
//                         work={work}
//                     />
//                 ))
//         } else{
//             follow =
//                 <Typography>Find you favorite content creater</Typography>
//         }
//         latest = 
//                 store.latest.slice(0, n).map((work) => (
//                     <WorkCard
//                         work={work}
//                     />
//                 ))
//         topView = 
//                 store.topView.slice(0, n).map((work) => (
//                     <WorkCard
//                         work={work}
//                     />
//                 ))
//         topLike = 
//                 store.topLike.slice(0, n).map((work) => (
//                     <WorkCard
//                         work={work}
//                     />
//                 ))
//     }

//     return null;
//     // return (
//     //     <div id="homepage">
//     //         <div id="homepage_banner">
//     //         <AppBanner2/>
//     //         </div>
//     //         <div id="homepage_carousel">
//     //             <Carousel showArrows={true}>
//     //                 {recommend}
//     //             </Carousel>
//     //         </div>
//     //         <div id="follow_list">
//     //             <Typography>Follow</Typography>
//     //             <Typography>View More</Typography>
//     //             <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
//     //                 {follow}
//     //             </ScrollMenu>
//     //         </div>
//     //         <div id="latest_list">
//     //             <Typography>latest</Typography>
//     //             <Typography>View More</Typography>
//     //             <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
//     //                 {latest}
//     //             </ScrollMenu>
//     //         </div>
//     //         <div id="topview_list">
//     //             <Typography>Top View</Typography>
//     //             <Typography>View More</Typography>
//     //             <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
//     //                 {topView}
//     //             </ScrollMenu>
//     //         </div>
//     //         <div id="toplike_list">
//     //             <Typography>Top Like</Typography>
//     //             <Typography>View More</Typography>
//     //             <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
//     //                 {topLike}
//     //             </ScrollMenu>
//     //         </div>
//     //         <div>
//     //             <Copyright2/>
//     //         </div>
//     //     </div>)
// }

// export default HomeScreen2;