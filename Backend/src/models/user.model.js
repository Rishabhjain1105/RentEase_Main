import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const requestSchema = new Schema({
    tenantId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    roomId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Room',
      required: true  
    },
    status: { 
      type: String, 
      enum: ['pending', 'accepted', 'rejected'], 
      default: 'pending' 
    },
    date: { 
      type: Date, 
      default: Date.now 
    }
});
  

const incomingRequestSchema = new Schema({
    ownerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    roomId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Room',
      required: true  
    },
    status: { 
      type: String, 
      enum: ['pending', 'accepted', 'rejected'], 
      default: 'pending' 
    },
    date: { 
      type: Date, 
      default: Date.now 
    }
});


const userSchema = new Schema(
    {
        role: {
            type: String,
            enum: ['owner', 'tenant'],
            required: true,
        },
    
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
    
        fullName: {
            type: String,
            required: true,
        },
    
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
    
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
    
        aadharCardNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
            validator: (v) => /^\d{12}$/.test(v),
            message: (props) => `${props.value} is not a valid Aadhar number!`,
            },
            index: true,
        },

        address: {
            type: String,
            required: true,
        },
    
        password: {
            type: String,
            required: [true, 'Password is required!'],
        },
    
        // profilePicture: {
        //     type: String,
        // },
    
        refreshToken: {
            type: String,
        },

        outgoingRequests: [requestSchema],
        incomingRequests: [incomingRequestSchema],

    },
    {
        timestamps: true,
        toJSON: { virtuals: true }, // Enable virtual properties when converted to JSON
        toObject: { virtuals: true }
    }
);

userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email,
            role: this.role

        }, 

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        },

        process.env.REFRESH_TOKEN_SECRET,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


// Add virtual properties to easily get pending requests
// userSchema.virtual('pendingOutgoingRequests').get(function() {
//     return this.outgoingRequests.filter(req => req.status === 'pending');
// });

// userSchema.virtual('pendingIncomingRequests').get(function() {
//     return this.incomingRequests.filter(req => req.status === 'pending');
// });


export const User = mongoose.model("User", userSchema)