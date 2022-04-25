import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_WORK: "CREATE_NEW_WORK",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    EDIT_WORK: "EDIT_WORK",
    UPDATE_WORK: "UPDATE_WORK",
    SEARCH: "SEARCH",
    MODE: "MODE",
    SORT: "SORT",
    STATUS: "STATUS"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentWork: null,
        editActive: false,
        listMarkedForDeletion: null,
        mode: null,
        text: "",
        status: null
        
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentWork: null,
                    eidtActive: false,
                    listMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status    // 0 for story  1 for comic
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_WORK: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentWork: payload,
                    editActive: true,
                    listMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                console.log("loading");
                return setStore({
                    idNamePairs: payload,
                    currentWork: null,
                    editActive: false,
                    listMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentWork: null,
                    editActive: false,
                    listMarkedForDeletion: payload,
                    mode: store.mode,
                    text: store.text,
                    status: store.status
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentWork: null,
                    editActive: false,
                    listMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentWork: payload.list,
                    editActive: payload.edit,
                    listMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.EDIT_WORK: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentWork: payload,
                    editActive: true,
                    listMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status
                });
            }
            case GlobalStoreActionType.UPDATE_WORK: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentWork: null,
                    editActive:false,
                    listMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status
                });
            }
            case GlobalStoreActionType.SEARCH: {
                console.log("search");
                return setStore({
                    idNamePairs:payload,
                    currentWork:null,
                    editActive:false,
                    listMarkedForDeletion:null,
                    mode: store.mode,
                    text: "",
                    status: store.status
                });
            }
            case GlobalStoreActionType.MODE: {
                return setStore({
                    idNamePairs:store.idNamePairs,
                    currentWork:null,
                    editActive:false,
                    listMarkedForDeletion:null,
                    mode: payload,
                    text: store.text,
                    status: store.status
                });
            }
            case GlobalStoreActionType.SORT: {
                return setStore({
                    idNamePairs:payload,
                    currentWork:null,
                    editActive:false,
                    listMarkedForDeletion:null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status
                })
            }
            case GlobalStoreActionType.STATUS: {
                return setStore({
                    idNamePairs:payload,
                    currentWork:null,
                    editActive:false,
                    listMarkedForDeletion:null,
                    mode: store.mode,
                    text: store.text,
                    status: payload
                })
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.editList = async function (id, newName, newContent) {
        let response = await api.getWorkById(id);
        if (response.data.success) {
            let work = response.data.work;
            work.name = newName;
            work.content = newContent;
            store.updateWork(work);
        }
    }
    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        let list=store.currentWork;
        list.view++;
        store.updateList2(list);
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        store.loadIdNamePairs();    
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createWork = async function () {
        let payload = {
            name: "Untitled",
            content: null,
            workType: store.status,
            author: auth.user.email,
            published:{publish:false,date:Date()},
            view:0,
            likes:[],
            dislikes:[],
            comment:[]
        };
        const response = await api.createWork(payload);
        if (response.data.success) {
            let newWork = response.data.work;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_WORK,
                payload: newWork
            }
            );
            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            // console.log(this.currentWork.id);
            // auth.user.works.push(this.currentWork.id);
            //auth.updateUser();
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
 

        history.push("/create/")
        
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        // const response = await api.getWorkPairs();
        // if (response.data.success) {
        //     let pairsArray = response.data.idNamePairs;
        //     let listOwned=[];
        //     for(let key in pairsArray){
        //         let list = pairsArray[key];
        //         if(auth.loggedIn){
        //             if(auth.user.email===list.email){
        //                 console.log(auth.user.email,list.email,list.published.published)
        //                 listOwned.push(list);
        //             }
        //             else if(list.published.published){
        //                 console.log(auth.user.email,list.email,list.published.published)
        //                 listOwned.push(list);
        //             }
        //         }
        //         else{
        //             if(list.published.published){
        //                 listOwned.push(list);
        //                 console.log(listOwned);
        //             } 
        //         }
                
        //     }
        //     storeReducer({
        //         type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
        //         payload: listOwned
        //     });
        // }
        // else {
        //     console.log("API FAILED TO GET THE LIST PAIRS");
        // }
    }


    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getWorkById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteWorkById(listToDelete._id);
        if (response.data.success) {
            store.loadIdNamePairs();
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id, input) {
        let response = await api.getWorkById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: {list: top5List,edit: input}
            });
        }
    }
    store.updateWork = async function (newWork) {
        if(newWork.author==auth.user.email){    
                let response = await api.updateWorkById(newWork._id, newWork);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.UPDATE_WORK,
                        payload: null
                    });
                }
        
          
            console.log("work updated succesfully");
        }
        history.push("/view")
    }

    store.updateCurrentWork = async function () {
        const response = await api.updateWorkById(store.currentWork._id, store.currentWork);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_WORK,
                payload: store.currentWork
            });
        }
    }
    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.EDIT_LIST,
            payload: null
        });
    }
    store.publish = async function (id) {
        let response = await api.getWorkById(id);
        if (response.data.success) {
            let list=response.data.work;
            let date = new Date();
            list.published={published:true,time:date.getMonth()+"-"+date.getDate()+", "+date.getFullYear()}
            store.updateWork(list);
        }
    }
    store.searchLists = async function (payload) {
        const response = await api.getWorkPairs();
        let lists= response.data.idNamePairs;
        console.log(lists);
        let filter =[];
        for(let key in lists){
            let list=lists[key]
            if(list.published.published){
                if(store.mode==="home"){
                    if(list.name.toLowerCase().startsWith(payload.toLowerCase())){
                        filter.push(list);
                    }
                }
                else if(store.mode==="all"){
                    if(list.name.toLowerCase()===payload.toLowerCase()){
                        filter.push(list);
                    }
                }
                else if(store.mode==="user"){
                    if(list.author.toLowerCase()===payload.toLowerCase()){
                        filter.push(list);
                    }
                }
                else{
                    if(list.name.toLowerCase().startsWith(payload.toLowerCase())){
                        filter.push(list);
                    }
                }
            }
        }
        storeReducer({
            type: GlobalStoreActionType.SEARCH,
            payload:filter
        });
    }
    store.setMode= function (input){
        storeReducer({
            type: GlobalStoreActionType.MODE,
            payload:input
        });
    }
    store.like = async function (id) {
        let response = await api.getWorkById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if(top5List.dislikes.includes(auth.user.email)){
                top5List.dislikes.pop(auth.user.email);
                top5List.likes.push(auth.user.email);
            }
            else if(!top5List.likes.includes(auth.user.email)){
                top5List.likes.push(auth.user.email);
            }
            else{
                top5List.likes.pop(auth.user.email);
            }
            store.updateList2(top5List);
        }
    }
    store.dislike = async function (id) {
        let response = await api.getWorkById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if(top5List.likes.includes(auth.user.email)){
                top5List.likes.pop(auth.user.email);
                top5List.dislikes.push(auth.user.email);
            }
            else if(!top5List.dislikes.includes(auth.user.email)){
                top5List.dislikes.push(auth.user.email);
            }
            else{
                top5List.dislikes.pop(auth.user.email);
            }
            store.updateList2(top5List);
        }
    }
    store.comment = async function (input,id) {
        let response = await api.getWorkById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            let author=auth.user.firstName+" "+auth.user.lastName;
            let payload={comment:input,author:author}
            top5List.comment.push(payload);
            store.updateList2(top5List);
        }
    }
    function swap(arr, xp, yp){
        var temp = arr[xp];
        arr[xp] = arr[yp];
        arr[yp] = temp;
    }
 
// An optimized version of Bubble Sort
    store.sortBy = function(criteria) {
        let i, j;
        let lists=store.idNamePairs;
        for (i = 0; i < lists.length-1; i++) {
            for (j = 0; j < lists.length-i-1; j++) {
                if(criteria===1){
                    if (lists[j].published.time > lists[j+1].published.time){
                        swap(lists,j,j+1);
                    }
                }
                else if(criteria===2){
                    if (lists[j].published.time < lists[j+1].published.time){
                        swap(lists,j,j+1);
                    }
                }
                else if(criteria===3){
                    if (lists[j].view < lists[j+1].view){
                        swap(lists,j,j+1);
                    }
                }
                else if(criteria===4){
                    if (lists[j].likes.length < lists[j+1].likes.length){
                        swap(lists,j,j+1);
                    }
                }
                else {
                    if (lists[j].dislikes.length < lists[j+1].dislikes.length){
                        swap(lists,j,j+1);
                    }
                }
            }
        }
        storeReducer({
            type: GlobalStoreActionType.SORT,
            payload: lists
        });
    }
    store.stat = function (status){
        storeReducer({
            type: GlobalStoreActionType.STATUS,
            payload: status
        });
        console.log(store.status);
        history.push("/home/");
    }
    store.myPage = function() {
        history.push("/mypage/");
    }
    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };