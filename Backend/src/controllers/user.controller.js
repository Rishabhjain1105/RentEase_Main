import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponses} from '../utils/ApiResponses.js'
import {User} from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const registerUser = (asyncHandler(async(req, res, next) => {
    //get details
    //checks all details
    //check if user exist?
    //if not, create into db
    //remove password and refresh roken from response
    //check if user created
    //return res
    const {role, username, fullName, email, phoneNumber, address, aadharCardNumber, password} = req.body;

    if ([role, username, fullName, email, phoneNumber, address, aadharCardNumber, password].some((field)=> field?.trim() === "" )){
        throw new ApiError(400, "All fields are required")
    }

    // console.log(role, username, fullName, email, phoneNumber, address, aadharCardNumber, password)

    const existedUser = await User.findOne({ $or: [{email}, {username}, {phoneNumber}] });

    // console.log(existedUser)

    if(existedUser){
        throw new ApiError(400, "User already exist")
    }

    const user = await User.create({
        role,
        username, 
        fullName, 
        email, 
        phoneNumber, 
        address, 
        aadharCardNumber, 
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res
    .status(200)
    .json(
        new ApiResponses(
            200,
            createdUser,
            "User registered successfully"
        )
    )

}))

const generateAccessTokenAndRefreshToken = async (userid) => {
    const user = await User.findById(userid); 
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken()

    const refreshToken =  user.generateRefreshToken()

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
}

const loginUser = asyncHandler(async (req, res, next)=>{
    //login details from user
    //empty?
    //check user is registered or not
    //password check
    //generate tokens
    //send cookies

    const {username, email, phoneNumber, password} = req.body;

    if([username, email, phoneNumber, password].some((field)=> field?.trim() === "" )){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne( { $or: [{username},{email},{phoneNumber}]} )

    if(!user){
        throw new ApiError(400, "User does not exist")
    }

    const validPassword = await user.isPasswordCorrect(password)

    if(!validPassword){
        throw new ApiError(400, "Invalid user crendentials")
    }

    const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id)

    // console.log(refreshToken)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponses(
            200,
            {
                user: loggedInUser, 
                accessToken, 
                refreshToken
            },
            "User logged in successfully"
        )
    )

})

const logoutUser = asyncHandler(async (req, res, next)=>{
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {refreshToken: 1  }
        },
        {
            new:true
        }
    )

    const option = {
        httpOnly: true,
        secure: true
    }
        
    return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponses(200, user , "User logged out successfully"))
})


const updateAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken || req.header("Authorization")?.replace("Bearer ", "")

    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized refresh token")
    }

    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    
        if(!decoded){
            throw new ApiError(401,"Unauthorized refresh token")
        }
    
        const user = await User.findById(decoded?._id).select("-password -refreshToken")
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Invalid refresh token")
        }
    
        const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id)
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res
        .status(200)
        .cookies("accessToken", accessToken, options)
        .cookies("refreshToken", refreshToken, options)
        .json(
            new ApiResponses(200, 
                {
                accessToken, refreshToken
                },
                "Access token updated successfuly"
            )     
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token") 
    }
})

const updateUserPassword = asyncHandler(async (req, res)=>{
    const {oldPassword, newPassword} = req.body;
    const user = await User.findById(req.user?._id);
    const verifiedPassword = await user.isPasswordCorrect(oldPassword);
    if (!verifiedPassword){
        throw new ApiError(400, "Old password is incorrect")
    }

    user.password = newPassword;
    user.save({validateBeforeSave : false})

    return res
    .status(200)
    .json(new ApiResponses(200, {}, "Password updated successfully"))
})

// const getCurrentUser = asyncHandler(async(req, res)=>{
//     const user = await User.findById(req.user?._id)
//     .populate().lean()
//     console.log("Get User", user)
//     return res
//     .status(200)
//     .json( new ApiResponses(200, user, "User found"))
// })


const getCurrentUser = asyncHandler(async (req, res) => {
    try {
      // Find the user and populate incomingRequests
      const user = await User.findById(req.user?._id)
        .populate('incomingRequests.ownerId') // Populate ownerId field
        .populate('incomingRequests.roomId')   // Populate roomId field
        .lean()
        .select("incomingRequests");
  
      console.log("Get User", user);
  
      return res
        .status(200)
        .json(new ApiResponses(200, user, "User found"));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error" });
    }
  });
  


const updateAccountDetails = asyncHandler(async (req, res)=> {
    const {email, fullName} = req.body;

    if (!email || !fullName){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                email,
                fullName,
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponses(
        200,
        user,
        "Profile data updated successfully"
    ))
})



const searchUser = asyncHandler(async (req, res)=>{
    const {query} = req.query;

    const user= await User.find({
        $or: [
            {username: { $regex: query, $options: "i" } },
            {phoneNumber: { $regex: query, $options: "i" } },
            {email: { $regex: query, $options: "i" } },
           
        ],
        role:'tenant'
    }).select("_id username phoneNumber email role")

    return res
    .status(200)
    .json(new ApiResponses(
        200,
        user,
        "Profile data searched successfully"
    ))
})




export {
    registerUser, 
    loginUser, 
    logoutUser,
    updateAccessToken,
    updateUserPassword,
    getCurrentUser,
    updateAccountDetails,
    searchUser,
    
}