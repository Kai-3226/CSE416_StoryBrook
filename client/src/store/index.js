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
    CLOSE_CURRENT_WORK: "CLOSE_CURRENT_WORK",
    CREATE_NEW_WORK: "CREATE_NEW_WORK",
    LOAD_WORK_LIST: "LOAD_WORK_LIST",
    MARK_WORK_FOR_DELETION: "MARK_WORK_FOR_DELETION",
    UNMARK_WORK_FOR_DELETION: "UNMARK_WORK_FOR_DELETION",
    SET_CURRENT_WORK: "SET_CURRENT_WORK",
    EDIT_WORK: "EDIT_WORK",
    UPDATE_WORK: "UPDATE_WORK",
    SEARCH: "SEARCH",
    MODE: "MODE",
    SORT: "SORT",
    STATUS: "STATUS",
    VIEW: "VIEW"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        workList: [],
        currentWork: null,
        editActive: false,
        workMarkedForDeletion: null,
        mode: "",
        text: "",
        status: 1,
        view: [] 
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
            case GlobalStoreActionType.CLOSE_CURRENT_WORK: {
                return setStore({
                    workList: store.workList,
                    currentWork: null,
                    eidtActive: false,
                    workMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status,    // 0 for story  1 for comic
                    view: store.view
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_WORK: {
                console.log("create");
                return setStore({
                    workList: store.workList,
                    currentWork: payload,
                    editActive: false,
                    workMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status,
                    view: store.view
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_WORK_LIST: {
                console.log("loading");
                return setStore({
                    workList: payload,
                    currentWork: null,
                    editActive: false,
                    workMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status,
                    view: store.view
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_WORK_FOR_DELETION: {
                return setStore({
                    workList: store.workList,
                    currentWork: payload,
                    editActive: false,
                    workMarkedForDeletion: payload,
                    mode: store.mode,
                    text: store.text,
                    status: store.status,
                    view: store.view
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_WORK_FOR_DELETION: {
                return setStore({
                    workList: store.workList,
                    currentWork: null,
                    editActive: false,
                    workMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status,
                    view: store.view
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_WORK: {
                return setStore({
                    workList: store.workList,
                    currentWork: payload,
                    editActive: false,
                    workMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status,
                    view: store.view
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.EDIT_WORK: {
                return setStore({
                    workList: store.workList,
                    currentWork: payload,
                    editActive: true,
                    workMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status,
                    view: store.view
                });
            }
            case GlobalStoreActionType.UPDATE_WORK: {
                return setStore({
                    workList: store.workList,
                    currentWork: null,
                    editActive:false,
                    workMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status,
                    view: store.view
                });
            }
            case GlobalStoreActionType.SEARCH: {
                console.log("search");
                return setStore({
                    workList:payload,
                    currentWork:null,
                    editActive:false,
                    workMarkedForDeletion:null,
                    mode: store.mode,
                    text: "",
                    status: store.status,
                    view: store.view
                });
            }
            case GlobalStoreActionType.MODE: {
                return setStore({
                    workList:store.workList,
                    currentWork:null,
                    editActive:false,
                    workMarkedForDeletion:null,
                    mode: payload,
                    text: store.text,
                    status: store.status,
                    view: store.view
                });
            }
            case GlobalStoreActionType.SORT: {
                return setStore({
                    workList:payload,
                    currentWork:null,
                    editActive:false,
                    workMarkedForDeletion:null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status,
                    view: store.view
                })
            }
            case GlobalStoreActionType.STATUS: {
                return setStore({
                    workList:null,
                    currentWork:null,
                    editActive:false,
                    workMarkedForDeletion:null,
                    mode: null,
                    text: null,
                    status: payload,
                    view: store.view
                })
            }
            case GlobalStoreActionType.VIEW: {
                return setStore({
                    workList:store.workList,
                    currentWork:null,
                    editActive:false,
                    workMarkedForDeletion:null,
                    mode: store.mode,
                    text: store.text,
                    status: store.status,
                    view: payload
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
    store.closeCurrentWork = function () {
        let work=store.currentWork;
        //list.view++;
        //store.updateList2(list);
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_WORK,
            payload: {}
        });
        store.loadWorkList();   
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
            console.log("create new work");
            let newWork = response.data.work;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_WORK,
                payload: newWork
            }
            );
            console.log(store.status)
            if (store.status == 1 )
                history.push("/create/")
            else if (store.status == 0)
                history.push("/createStory/")
            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            // console.log(this.currentWork.id);
            // auth.user.works.push(this.currentWork.id);
            //auth.updateUser();
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL WORKS THAT VIEWABLE BY CURRENT AUTH
    store.loadWorkList = async function () {
        const response = await api.getWorkList();
        if (response.data.success) {
            let workArray = response.data.data;
            let viewable=[];
            //console.log(workArray);
            for(let key in workArray){
                let work = workArray[key];
                //console.log(work);
                if(auth.loggedIn){
                    if(auth.user.email===work.author){
                        // console.log(auth.user.email,list.email,list.published.published)
                        viewable.push(work);
                    }
                    else if(work.published.publish===true){
                        // console.log(auth.user.email,list.email,list.published.published)
                        viewable.push(work);
                    }
                }
                else{
                    if(work.published.publish===true){
                        viewable.push(work);
                        // console.log(listOwned);
                    } 
                }
                
            }
            console.log(viewable);

            storeReducer({
                type: GlobalStoreActionType.LOAD_WORK_LIST,
                payload: viewable
            });
        }
        else {
            console.log("API FAILED TO GET THE works list");
        }
    }


    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markWorkForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getWorkById(id);
     
        if (response.data.success) {
            let work = response.data.work;
           console.log(work);
            storeReducer({
                type: GlobalStoreActionType.MARK_WORK_FOR_DELETION,
                payload: work
            });
        }
    }

    store.deleteWork = async function (WorkToDelete) {
        let response = await api.deleteWorkById(WorkToDelete);
        if (response.data.success) {
            store.closeCurrentWork();
        }
    }

    store.unmarkWorkForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_WORK_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentWork = async function (id) {        //, input
        let response = await api.getWorkById(id);
        if (response.data.success) {
            let work = response.data.work;
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_WORK,
                payload: work                      //{list: work,edit: input}
            });
        // console.log(this.currentWork);  
        // console.log(work);    

        if(this.currentWork)
        {
            if(this.currentWork.published['publish']==true)
            {history.push(`/read/${id}`);}
            else if (this.currentWork.published['publish']==false)
            {history.push(`/create/`);}
            }
        
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
        let lists= response.data.workList;
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
        let list=store.workList;
        for (i = 0; i < list.length-1; i++) {
            for (j = 0; j < list.length-i-1; j++) {
                if(criteria===1){
                    if (list[j].published.date > list[j+1].published.data){
                        swap(list,j,j+1);
                    }
                }
                else if(criteria===2){
                    if (list[j].view < list[j+1].view){
                        swap(list,j,j+1);
                    }
                }
                else if(criteria===3){
                    if (list[j].likes < list[j+1].likes){
                        swap(list,j,j+1);
                    }
                }
            }
        }
        storeReducer({
            type: GlobalStoreActionType.SORT,
            payload: list
        });
    }

// Generate view list in view screem
    store.viewlist = function(criteria){
        let list=[];
        if (criteria===0 || criteria===4){
            let i, j;
            let all=store.workList;
            for (i = 0; i < all.length-1; i++) {
                for (j = 0; j < list.length-i-1; j++) {
                    if (list[j].published.date > list[j+1].published.data){
                        swap(list,j,j+1);
                    }
                }
            }
            if (criteria===0){    //follow
                for(let work in all){
                    let authorId = work.author;
                    for (let author in auth.user.following){
                        if(authorId === author){
                            list.push(work);
                            // console.log(listOwned);
                        }   
                    }
                }
            }
            else if (criteria===4){          //search
                for(let work in all){
                    if(work.name.includes(store.text)){
                        list.push(work);
                        // console.log(listOwned);
                    }
                }
            }
        }
        else{
            let i, j;
            let list=store.workList;
            for (i = 0; i < list.length-1; i++) {
                for (j = 0; j < list.length-i-1; j++) {
                    if(criteria===1){       //latest
                        if (list[j].published.date > list[j+1].published.data){
                            swap(list,j,j+1);
                        }
                    }
                    else if(criteria===2){         //view
                        if (list[j].view < list[j+1].view){
                            swap(list,j,j+1);
                        }
                    }
                    else if(criteria===3){           //like
                        if (list[j].likes < list[j+1].likes){
                            swap(list,j,j+1);
                        }
                    }
                }
            }
        }
        storeReducer({
            type: GlobalStoreActionType.VIEW,
            payload: list
        });
    }



    store.stat = function (status){
        console.log(status)
        storeReducer({
            type: GlobalStoreActionType.STATUS,
            payload: status
        });
        history.push("/view/");
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