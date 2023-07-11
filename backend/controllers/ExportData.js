const XLSX = require('xlsx');
const Affectation  = require('../models/Affectation'); // Importez les modèles appropriés pour vos collections
const Collaborateur = require('../models/Collaborateur');
const Vehicule = require('../models/Véhicule');
// Fonction de contrôleur pour exporter les données d'affectation avec jointures
exports.exportAffectation = async (req, res) => {
  try {
    // Requête pour récupérer les données d'affectation avec jointures
    const affectationData = await Affectation.aggregate([
      {
        $lookup: {
          from: 'collaborateurs', // Nom de la collection "collaborateur"
          localField: 'collaborateur', // Champ d'association dans la collection "affectation"
          foreignField: '_id', // Champ d'association dans la collection "collaborateur"
          as: 'collaborateur',
        },
      },
      {
        $lookup: {
          from: 'vehicules', // Nom de la collection "vehicule"
          localField: 'vehicule', // Champ d'association dans la collection "affectation"
          foreignField: '_id', // Champ d'association dans la collection "vehicule"
          as: 'vehicule',
        },
      },
      {
        $unwind: '$collaborateur',
      },
      {
        $unwind: '$vehicule',
      },
      {
        $project: {
          _id: 0, // Exclure le champ _id du résultat
          'Collaborateur Nom': '$collaborateur.Nom',
          'Collaborateur Prénom': '$collaborateur.Prenom',
          'Vehicule Marque': '$vehicule.Marque',
          'Nom': '$collaborateur.Nom', 
          'Prenom': '$collaborateur.Prenom', 
          'Filiale': '$collaborateur.Filiale', 
          'Direction': '$collaborateur.Direction',
          'Matricule': '$collaborateur.Matricule',
          'Grade': '$collaborateur.Grade',
          'Email': '$collaborateur.Email',
          'Numéro GSM': '$collaborateur.NumeroGsm',
          'Numéro GSM Personnel': '$collaborateur.NumeroGsmPersonnel', 
          'Téléphone Fixe': '$collaborateur.TelephoneFixe',
          'Permis': '$collaborateur.Permis', 
          'Date de validité du permis': '$collaborateur.DateValiditePermis',
          'CIN': '$collaborateur.CIN',
          'Date de validité de la CIN': '$collaborateur.DateValiditéCIN',
          'Numéro de passeport': '$collaborateur.NumeroPassport',
          'Date de validité du passeport': '$collaborateur.DateValiditéPassport',
          'Numéro de parc': '$vehicule.Num_parc',
          'WW': '$vehicule.WW',
          'Numéro de châssis': '$vehicule.Num_Chassis',
          'DM Circulation': 'DM_Circulation',
          'Pf': '$vehicule.Pf',
          'Numéro d\'immatriculation': '$vehicule.Num_Immat',
          'Marque': '$vehicule.Marque',
          'Couleur': '$vehicule.Couleur', 
          'Prestataire': '$vehicule.Prestataire', 
          'Font Service': '$vehicule.Font_Service',
          'Réf Pneus': '$vehicule.Ref_Pneus', 
          'Échéance Aut Circulation': '$vehicule.Echeance_Aut_Circulation',
          'Échéance Visite Tech': '$vehicule.Echaence_Visite_Tech',
          'Assurance Contrat Cours': '$vehicule.Assurance_Contrat_Cours',
          'Cartes Verte': '$vehicule.Cartes_Verte',
          'Vignete': '$vehicule.Vignete',
          // Ajoutez d'autres champs nécessaires
        },
      },
    ]);

    // Création du classeur Excel
    const worksheet = XLSX.utils.json_to_sheet(affectationData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Affectation');

    // Conversion du classeur en un flux de données
    const excelData = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Envoi du fichier Excel en tant que réponse HTTP
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=affectation.xlsx');
    res.send(excelData);
  } catch (error) {
    console.error('Erreur lors de l\'exportation des données d\'affectation :', error);
    res.status(500).send('Erreur lors de l\'exportation des données');
  }
};
