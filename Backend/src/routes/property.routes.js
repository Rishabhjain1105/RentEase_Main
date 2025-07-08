import Router from 'express'
import {addNewProperty, getProperties, deleteAllProperty, deleteProperty} from '../controllers/property.controller.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'
import {upload} from '../middlewares/multer.middleware.js'

const router = Router()

router.route('/add-new-property').post(
    verifyJWT ,
    upload.fields([
        {
            name: "propertyImages",
        }
    ]),
    addNewProperty
)

router.route('/fetch-properties').get(verifyJWT, getProperties)

router.route('/delete-property').post(verifyJWT, deleteProperty)

router.route('/delete-all-property').post(verifyJWT, deleteAllProperty)

export default router;