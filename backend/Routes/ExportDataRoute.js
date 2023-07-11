const express = require('express')
const {
    exportAffectation ,
} = require('../controllers/ExportData');


const router3 = express.Router();


/* import affectation data */
router3.get('/DataAffectation',  exportAffectation  );



module.exports = router3 ;