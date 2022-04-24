/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    //baseURL: 'https://storybrook.herokuapp.com/api',    

})
//'https://storybrook.herokuapp.com/api' 'http://localhost:4000/api'
// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createWork = (payload) => api.post(`/work/`, payload)
export const getAllWorks = () => api.get(`/works/`)
//export const getWorkPairs = () => api.get(`/workpairs/`)
export const updateWorkById = (id, payload) => api.put(`/work/${id}`, payload)
export const deleteWorkById = (id) => api.delete(`/work/${id}`)
export const getWorkById = (id) => api.get(`/work/${id}`)

export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload)
export const loginUser = (payload) => api.post(`/login/`, payload)
export const logoutUser = () => api.get(`/logout/`)
//export const requestPasswordReset = (payload) => api.get(`/requestPasswordReset/`, payload)
export const resetPassword = (token,id,payload) => api.put(`/resetPassword/${token}/${id}`, payload)
export const sendUserEmail = (payload) => api.post(`/requestPasswordReset/`, payload)
export const verifyEmail = (payload) => api.post(`/verifyEmail/`, payload)
export const changePassword = (payload)=> api.put('/changePassword/',payload)
export const updateUser = (payload)=> api.put('/updateUser/',payload)


const apis = {
    createWork,
    getAllWorks,
    //getWorkPairs,
    updateWorkById,
    deleteWorkById,
    getWorkById,

    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
    sendUserEmail,
    verifyEmail,
    changePassword,
    updateUser
}

export default apis
