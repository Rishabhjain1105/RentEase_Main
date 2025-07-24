import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponses } from '../utils/ApiResponses.js';
import { User } from '../models/user.model.js';
import { Room } from '../models/room.model.js';
import { ApiError } from '../utils/ApiError.js';

// Send a request (from owner to tenant)
const sendRequest = asyncHandler(async (req, res) => {
    try {
        const { tenantId, roomId } = req.body;
        const ownerId = req.user._id;

        // Validate required fields
        if (!tenantId || !roomId) {
            throw new ApiError(400, "Both tenantId and roomId are required")
        }

        // Validate that the requesting user is an owner
        const owner = await User.findById(ownerId);
        // if (!owner) {
        //     return res
        //         .status(404)
        //         .json(new ApiResponses(404, null, "Owner account not found"));
        // }

        // if (owner.role !== 'owner') {
        //     return res
        //         .status(403)
        //         .json(new ApiResponses(403, null, "Only owners can send room requests"));
        // }

        // Check if room exists
        const room = await Room.findById(roomId);
        // if (!room) {
        //     return res
        //         .status(404)
        //         .json(new ApiResponses(404, null, "Room not found"));
        // }

        // Verify that the owner owns this room
        // if (room.owner && room.owner.toString() !== ownerId.toString()) {
        //     return res
        //         .status(403)
        //         .json(new ApiResponses(403, null, "You can only send requests for rooms you own"));
        // }

        // Check if the tenant exists
        const tenant = await User.findById(tenantId);
        if (!tenant) {
            return res
                .status(404)
                .json(new ApiResponses(404, null, "Tenant not found"));
        }

        if (tenant.role !== 'tenant') {
            return res
                .status(400)
                .json(new ApiResponses(400, null, "The selected user is not a tenant"));
        }

        // Verify owner has outgoingRequests array
        if (!owner.outgoingRequests || !Array.isArray(owner.outgoingRequests)) {
            owner.outgoingRequests = [];
        }

        // Verify tenant has incomingRequests array
        if (!tenant.incomingRequests || !Array.isArray(tenant.incomingRequests)) {
            tenant.incomingRequests = [];
        }

        // Check for duplicate requests
        const existingOutgoingRequest = owner.outgoingRequests.find(
            request => 
                request.tenantId && 
                request.tenantId.toString() === tenantId.toString() && 
                request.roomId && 
                request.roomId.toString() === roomId.toString() &&
                request.status === 'pending'
        );

        if (existingOutgoingRequest) {
            throw new ApiError(400, "Request already sent to this tenant for this room" )
        }

        // Create request objects with all required fields
        const requestData = {
            tenantId,
            roomId,
            status: 'pending',
            date: new Date()
        };

        const incomingRequestData = {
            ownerId,
            roomId,
            status: 'pending',
            date: new Date()
        };

        // Add requests to respective users
        owner.outgoingRequests.push(requestData);
        tenant.incomingRequests.push(incomingRequestData);

        // Save both documents
        await Promise.all([owner.save(), tenant.save()]);

        return res
            .status(200)
            .json(new ApiResponses(
                200,
                { owner, tenant },
                "Request sent successfully"
            ));
    } catch (error) {
        console.error("Error in sendRequest:", error);
        
        // Handle MongoDB ObjectID format errors
        if (error.name === 'CastError') {
            return res
                .status(400)
                .json(new ApiResponses(400, null, "Invalid ID format"));
        }
        
        return res
            .status(500)
            .json(new ApiResponses(500, null, "An error occurred while processing the request: " + error.message));
    }
});

// Accept a request (tenant accepting owner's request)
const acceptRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const tenantId = req.user._id;
    
    // Find tenant user with better error handling
    try {
        // Find tenant user
        const tenant = await User.findById(tenantId);
        
        // Check if tenant exists
        if (!tenant) {
            return res
                .status(404)
                .json(new ApiResponses(404, null, "Tenant not found. User may have been deleted."));
        }
        
        // Check if user is a tenant
        if (tenant.role !== 'tenant') {
            return res
                .status(403)
                .json(new ApiResponses(403, null, "Only tenants can accept requests"));
        }
        
        // Verify tenant has incomingRequests array
        if (!tenant.incomingRequests || !Array.isArray(tenant.incomingRequests)) {
            return res
                .status(500)
                .json(new ApiResponses(500, null, "User data structure is invalid"));
        }
        
        // Find the request in incoming requests
        const requestIndex = tenant.incomingRequests.findIndex(req => req._id.toString() === requestId);
        if (requestIndex === -1) {
            return res
                .status(404)
                .json(new ApiResponses(404, null, "Request not found"));
        }
        
        const request = tenant.incomingRequests[requestIndex];
        
        // Update request status to accepted
        tenant.incomingRequests[requestIndex].status = 'accepted';
        await tenant.save();
        
        // Update corresponding outgoing request for the owner
        const owner = await User.findById(request.ownerId);
        
        // Check if owner exists
        if (!owner) {
            return res
                .status(500)
                .json(new ApiResponses(500, null, "Owner of this request no longer exists"));
        }
        
        const ownerRequestIndex = owner.outgoingRequests.findIndex(
            req => req.tenantId.toString() === tenantId.toString() && 
                req.roomId.toString() === request.roomId.toString()
        );
        
        if (ownerRequestIndex !== -1) {
            owner.outgoingRequests[ownerRequestIndex].status = 'accepted';
            await owner.save();
        }
        
        // Verify room exists before updating
        const room = await Room.findById(request.roomId);
        if (!room) {
            return res
                .status(404)
                .json(new ApiResponses(404, null, "Room associated with this request no longer exists"));
        }
        
        // Update room status to rented
        await Room.findByIdAndUpdate(request.roomId, { 
            status: 'rented',
            currentTenant: tenantId,
            rentedAt: new Date()
        });
        
        return res
            .status(200)
            .json(new ApiResponses(200, { request }, "Request accepted successfully"));
    } catch (error) {
        console.error("Error in acceptRequest:", error);
        return res
            .status(500)
            .json(new ApiResponses(500, null, "An error occurred while processing the request: " + error.message));
    }
});

// Reject a request (tenant rejecting owner's request)
const rejectRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const tenantId = req.user._id;
    
    try {
        // Find tenant user
        const tenant = await User.findById(tenantId);
        
        // Check if tenant exists
        if (!tenant) {
            return res
                .status(404)
                .json(new ApiResponses(404, null, "Tenant not found. User may have been deleted."));
        }
        
        // Check if user is a tenant
        if (tenant.role !== 'tenant') {
            return res
                .status(403)
                .json(new ApiResponses(403, null, "Only tenants can reject requests"));
        }
        
        // Verify tenant has incomingRequests array
        if (!tenant.incomingRequests || !Array.isArray(tenant.incomingRequests)) {
            return res
                .status(500)
                .json(new ApiResponses(500, null, "User data structure is invalid"));
        }
        
        // Find the request in incoming requests
        const requestIndex = tenant.incomingRequests.findIndex(req => req._id.toString() === requestId);
        if (requestIndex === -1) {
            return res
                .status(404)
                .json(new ApiResponses(404, null, "Request not found"));
        }
        
        const request = tenant.incomingRequests[requestIndex];
        
        // Update request status to rejected
        tenant.incomingRequests[requestIndex].status = 'rejected';
        await tenant.save();
        
        // Update corresponding outgoing request for the owner
        const owner = await User.findById(request.ownerId);
        
        // Check if owner exists
        if (!owner) {
            return res
                .status(500)
                .json(new ApiResponses(500, null, "Owner of this request no longer exists"));
        }
        
        const ownerRequestIndex = owner.outgoingRequests.findIndex(
            req => req.tenantId.toString() === tenantId.toString() && 
                  req.roomId.toString() === request.roomId.toString()
        );
        
        if (ownerRequestIndex !== -1) {
            owner.outgoingRequests[ownerRequestIndex].status = 'rejected';
            await owner.save();
        }
        
        return res
            .status(200)
            .json(new ApiResponses(200, { request }, "Request rejected successfully"));
    } catch (error) {
        console.error("Error in rejectRequest:", error);
        return res
            .status(500)
            .json(new ApiResponses(500, null, "An error occurred while processing the request: " + error.message));
    }
});

// Get all pending requests for the current user (both incoming and outgoing)
const getUserRequests = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        
        const user = await User.findById(userId)
            .populate('outgoingRequests.tenantId', 'username fullName email')
            .populate('outgoingRequests.roomId', 'name address price')
            .populate('incomingRequests.ownerId', 'username fullName email')
            .populate('incomingRequests.roomId', 'name address price');
        
        if (!user) {
            return res
                .status(404)
                .json(new ApiResponses(404, null, "User not found"));
        }
        
        // Ensure arrays exist even if they're not in the schema
        const incomingRequests = user.incomingRequests || [];
        const outgoingRequests = user.outgoingRequests || [];
        
        return res
            .status(200)
            .json(new ApiResponses(200, { 
                incomingRequests,
                outgoingRequests
            }, "User requests retrieved successfully"));
    } catch (error) {
        console.error("Error in getUserRequests:", error);
        return res
            .status(500)
            .json(new ApiResponses(500, null, "An error occurred while retrieving requests: " + error.message));
    }
});

export {
    sendRequest,
    acceptRequest,
    rejectRequest,
    getUserRequests
};