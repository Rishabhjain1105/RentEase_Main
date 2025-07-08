import dotenv from 'dotenv'
import CONNECT_DB from './db/index.js';
import {app} from '../src/app.js';

dotenv.config({
    path: './env'
})

CONNECT_DB()
.then(()=>{
    app.listen(process.version.PORT || 8000, ()=>{
        console.log(`SERVER IS RUNNING AT PORT: ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log('MONGO DB CONNECTION FAILED!', error);
})















// const authRoutes = require('./routes/authRoutes');
// const propertyRoutes = require('./routes/propertyRoutes');
// const roomRoutes = require('./routes/roomRoutes')
// const ownerRoutes = require('./routes/ownerRoutes')

// const Property = require('./models/propertyModel.js')
// const authRoutes = require('./routes/authRoutes');



// app.use('/api', propertyRoutes);
// app.use('/api', roomRoutes);
// app.use('/api', ownerRoutes);
// app.use('/api', authRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });


// app.listen(8080, () => console.log(`Server running at http://localhost:8080`));

