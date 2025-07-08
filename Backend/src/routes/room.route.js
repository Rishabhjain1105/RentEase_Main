import Router from 'express';
import { addNewRoom, getRoomsByProperty, getRooms } from '../controllers/room.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

// Add new room to a property
// console.log("entered")
router.route('/new-room').post(
    verifyJWT,
    upload.fields([{ name: "roomImages", maxCount: 5 }]), // Allow up to 5 images
    addNewRoom
);

// // Get rooms for a specific property
router.route('/:id').get(verifyJWT, getRoomsByProperty);

// // Get all rooms (for owner dashboard purposes)
router.route('/fetch-rooms').get( getRooms);

export default router;