 //CREATE SERVER
const express = require("express");
const app = express();
app.use(express.json())

const cors = require("cors") 
app.use(cors())
require('dotenv').config();

const passport = require('passport')
//CONNECT TO DB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Data base Connected'))



//IMPORT USER MODEL
const UserModel = require('./models/Users')
const router = require('./Routes/UserRoute')
const defaultAdmine = require('./controllers/UserController')
app.use('/api',router);
defaultAdmine.createAdmin();

//IMPORT Collaborateur MODEL
const router1 = require('./Routes/CollaborateurRoute')
app.use('/api',router1)

//IMPORT vehicule MODEL
const router2 = require('./Routes/VehiculeRoute');
const { fetchVehicles } = require("./controllers/VehiculeController");

app.use('/api',router2)
app.get('/api/vehicles', async (req, res) => {
    try {
      const vehicles = await fetchVehicles();
      res.json(vehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


/* Affectation  */
const router4 = require("./Routes/AffectationRoutes");
app.set('view engine', 'ejs');
app.use('/api', router4);

/* statistique */
const router5 = require("./Routes/DashStatisRoute");
app.use('/api' , router5);
/* export */
const router3 = require("./Routes/ExportDataRoute");
app.use('/api',router3);

/* passport */
app.use(passport.initialize())
require('./security/passport')(passport)

app.listen(process.env.PORT,()=>{
    console.log("server works good !!");    
})   