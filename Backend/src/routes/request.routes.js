import { Router } from 'express';
import { 
    sendRequest, 
    acceptRequest, 
    rejectRequest, 
    getUserRequests 
} from '../controllers/request.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Apply authentication middleware to all request routes
router.use(verifyJWT);

// Send a new request (owner to tenant)
router.post('/send', sendRequest);

// Accept a request (for tenants)
router.patch('/accept/:requestId', acceptRequest);

// Reject a request (for tenants)
router.patch('/reject/:requestId', rejectRequest);

// Get all user requests (both incoming and outgoing)
router.get('/my-requests', getUserRequests);

export default router;