const auth = require('../auth')
const express = require('express')
const WorkController = require('../controllers/work-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()

router.post('/work', auth.verify, WorkController.createWork)
router.put('/work/:id', auth.verify, WorkController.updateWork)
router.delete('/work/:id', auth.verify, WorkController.deleteWorkById)
router.get('/work/:id', WorkController.getWorkById)
router.get('/works', WorkController.getWorks)
router.get('/workpairs', WorkController.getWorks)

router.post('/register', UserController.registerUser)
router.post('/login',UserController.loginUser)
router.get('/logout',UserController.logoutUser)
router.get('/loggedIn', UserController.getLoggedIn)
module.exports = router