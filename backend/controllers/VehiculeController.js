const VehiculeModel = require("../models/Véhicule");
const ValidateVehicule = require("../Validation/VehiculeValidation")
//add work 
const AddVehicule = async (req, res) => {
  
  const { errors, isValid } = ValidateVehicule(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      await VehiculeModel.findOne({ WW: req.body.WW }).then(async (exist) => {
        if (exist) {
          errors.WW = "Vehicule Exist";
          res.status(404).json(errors);
        } else {
          await VehiculeModel.create(req.body);
          /* const collab = req.body;
          const newcollab= new CollabModel(collab);
          await newcollab.save();
          res.json(collab) */
          res.status(201).json({ message: "Vehicule added with success" });
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//find all work 
const FindAllVehicule = async (req, res) => {
  try {
      const data = await VehiculeModel.find();
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
   
};
// find one work 
const FindSinglVehicule = async (req, res) => {
  try {
      const data = await VehiculeModel.findOne({ _id: req.params.id });
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
};
//Update user
const UpdateVehicule = async (req, res) => {
  const { errors, isValid } = ValidateVehicule(req.body);
try {
  if (!isValid) {
    res.status(404).json(errors);
  } else {
    const data = await VehiculeModel.findOneAndUpdate(
      { _id: req.params.id },
         req.body,
      { new: true }
    );            
   /*  res.status(201).json(data); */
     res.status(201).json({ message: "Vehicule Updated with success",
    data: data }); 
  }
} catch (error) {
  console.log(error.message);
  
}
};
// delete work 
const DeleteVehicule = async (req, res) => {
  try {
      await VehiculeModel.deleteOne({ _id: req.params.id });
      res.status(201).json({ message: "Vehicule deleted with success" });
    } catch (error) {
      console.log(error.message);
    }
};
//fetch data
const fetchVehicles = async () => {
  try {
    const vehiculesCollection = db.collection('vehicules'); // Remplacez par le nom de votre collection
    const vehicles = await vehiculesCollection.find().toArray();
    return vehicles;
  } catch (error) {
    console.error('Error fetching vehicules:', error);
    throw error;
  }
}; 


module.exports = {
  AddVehicule,
  FindAllVehicule,
  FindSinglVehicule,
  UpdateVehicule,
  DeleteVehicule,
  fetchVehicles 
};
