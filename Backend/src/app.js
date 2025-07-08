import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true, limit:'16mb'}));
app.use(express.static("public"));
app.use(cookieParser())


//routes import 
import userRouter from '../src/routes/user.routes.js'
import propertyRouter from '../src/routes/property.routes.js'
import roomRouter from '../src/routes/room.route.js'

//routes declaration
app.use('/api/v1/users', userRouter)
app.use('/api/v1/properties', propertyRouter)
app.use('/api/v1/rooms', roomRouter)


export {app}

