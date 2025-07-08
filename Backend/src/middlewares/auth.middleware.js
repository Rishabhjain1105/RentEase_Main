import jwt from 'jsonwebtoken'
import {User} from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'

export const verifyJWT = (asyncHandler(async (req, res, next)=>{
    try{
        console.log("hii")
        // const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];
        // console.log(token)
        
        if(!token){
            throw new ApiError(401, "Unauthorized request");
        }
        if (typeof token !== 'string') {
            throw new ApiError(401, "Invalid token format");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // console.log(decodedToken    )
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user){
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user
        next()


    } catch(err){
        throw new ApiError(400,err?.message, "Invalid access token")
    }
}))