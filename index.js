const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const { http } = require('winston');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const cors = require('cors');    
const user = require('./routes/user.routes');
const userVehicle = require('./routes/user.vehicle.routes');
const vehicleRecords = require('./routes/vehicle.records.routes');

mongoose.connect(process.env.MONGODB_URI, {
       useNewUrlParser: true
      })
   .then(
      () => { console.log("Connection to MongoDB established") },
      err => { console.log('Failed to connect to MongoDB', err) }
   );

app.use(cors({ 
   origin: "http://localhost:4200",
   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
   allowedHeaders: ['Authorization', 'Content-Type'],
 }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static('files'));
app.use('/api/users', user);
app.use('/api/user-vehicle', userVehicle);
app.use('/api/service-records', vehicleRecords);
// todo
app.use(
   '/api-docs',
   swaggerUi.serve,
   swaggerUi.setup(swaggerDocument.options)
);

module.exports = app;
