import Router from 'express'
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { 
    registerUser, 
    loginUser, 
    logoutUser,
    updateAccessToken,
    updateUserPassword,
    getCurrentUser,
    updateAccountDetails,
    searchUser
 } from '../controllers/user.controller.js'

const router = Router()

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

//secure
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/refresh-token').post(updateAccessToken)
router.route('/reset-password').post(verifyJWT, updateUserPassword)
router.route('/get-current-user').get(verifyJWT, getCurrentUser)
router.route('/update-account-details').post(verifyJWT, updateAccountDetails)

router.route('/search').get(verifyJWT, searchUser)

export default router