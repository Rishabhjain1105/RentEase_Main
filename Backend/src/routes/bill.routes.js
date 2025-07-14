import Router from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { addBill, fetchBill } from '../controllers/bill.controller.js';

const router = Router()

router.route('/add-bill').post(verifyJWT, addBill)
// router.route('/fetch-bill').get(verifyJWT, fetchBill)

router.route('/fetch-bill/:id').get(verifyJWT, fetchBill);


export default router