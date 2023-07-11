/* 

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { IconButton, TableCell } from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid-premium';
import BasicAlerts from 'src/components/Alert/alert1';
import axios, { Axios } from 'axios';

export default function TableAffectation() {
  const [affectationDetails, setAffectationDetails] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  } 

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAffectationDetails();
  }, [affectationDetails]);

  const getAffectationDetails = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/affectations1');
      if (!response.ok) {
        throw new Error(
          'Une erreur est survenue lors de la récupération des détails des affectations'
        );
      }
      const data = await response.json();
      const affectationsWithId = data.map((affectation) => ({
        ...affectation,
        id: affectation._id, // Utilisez la valeur de _id comme id
        Nom: affectation.collaborateurDetails.Nom,
        Prenom: affectation.collaborateurDetails[0].Prenom,
        Filiale: affectation.collaborateurDetails[0].Filiale,
        Direction: affectation.collaborateurDetails[0].Direction,
        Matricule: affectation.collaborateurDetails[0].Matricule,
        Grade: affectation.collaborateurDetails[0].Grade,
        Email: affectation.collaborateurDetails[0].Email,
        NumeroGsm: affectation.collaborateurDetails[0].NumeroGsm,
        NumeroGsmPersonnel: affectation.collaborateurDetails[0].NumeroGsmPersonnel,
        TelephoneFixe: affectation.collaborateurDetails[0].TelephoneFixe,
        Permis: affectation.collaborateurDetails[0].Permis,
        DateValiditePermis: formatDate(affectation.collaborateurDetails[0].DateValiditePermis),
        CIN: affectation.collaborateurDetails[0].CIN,
        DateValiditéCIN: formatDate(affectation.collaborateurDetails[0].DateValiditéCIN),
        NumeroPassport: affectation.collaborateurDetails[0].NumeroPassport,
        DateValiditéPassport: formatDate(affectation.collaborateurDetails[0].DateValiditéPassport),
        Num_parc: affectation.vehiculeDetails[0].Num_parc,
        WW: affectation.vehiculeDetails[0].WW,
        Num_Chassis: affectation.vehiculeDetails[0].Num_Chassis,
        DM_Circulation: affectation.vehiculeDetails[0].DM_Circulation,
        Pf: affectation.vehiculeDetails[0].Pf,
        Num_Immat: affectation.vehiculeDetails[0].Num_Immat,
        Marque: affectation.vehiculeDetails[0].Marque,
        Couleur: affectation.vehiculeDetails[0].Couleur,
        Prestataire: affectation.vehiculeDetails[0].Prestataire,
        Font_Service: affectation.vehiculeDetails[0].Font_Service,
        Ref_Pneus: affectation.vehiculeDetails[0].Ref_Pneus,
        Echeance_Aut_Circulation: formatDate(affectation.vehiculeDetails[0].Echeance_Aut_Circulation),
        Echaence_Visite_Tech: formatDate(affectation.vehiculeDetails[0].Echaence_Visite_Tech),
        Assurance_Contrat_Cours: formatDate(affectation.vehiculeDetails[0].Assurance_Contrat_Cours),
        Cartes_Verte: affectation.vehiculeDetails[0].Cartes_Verte,
        Vignete: formatDate(affectation.vehiculeDetails[0].Vignete),
      }));
      setAffectationDetails(affectationsWithId);
    } catch (error) {
      console.error(error);
    }
  };

  const OnDelete = (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      axios.delete(`http://localhost:3001/api/deleteAffectation/${id}`)
        .then(res => {
          console.log(res.data);
          setMessage(res.data.message);
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 4000);
        });
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'Nom', headerName: 'Nom', width: 150 },
    { field: 'Prenom', headerName: 'Prénom', width: 150 },
    { field: 'Filiale', headerName: 'Filiale', width: 150 },
    { field: 'Direction', headerName: 'Direction', width: 150 },
    { field: 'Matricule', headerName: 'Matricule', width: 150 },
    { field: 'Grade', headerName: 'Grade', width: 150 },
    { field: 'Email', headerName: 'Email', width: 150 },
    { field: 'NumeroGsm', headerName: 'Numéro GSM', width: 150 },
    { field: 'NumeroGsmPersonnel', headerName: 'Numéro GSM Personnel', width: 200 },
    { field: 'TelephoneFixe', headerName: 'Téléphone Fixe', width: 150 },
    { field: 'Permis', headerName: 'Permis', width: 150 },
    { field: 'DateValiditePermis', headerName: 'Date de validité du permis', width: 200 },
    { field: 'CIN', headerName: 'CIN', width: 150 },
    { field: 'DateValiditéCIN', headerName: 'Date de validité de la CIN', width: 200 },
    { field: 'NumeroPassport', headerName: 'Numéro de passeport', width: 200 },
    { field: 'DateValiditéPassport', headerName: 'Date de validité du passeport', width: 200 },
    { field: 'Num_parc', headerName: 'Numéro de parc', width: 150 },
    { field: 'WW', headerName: 'WW', width: 150 },
    { field: 'Num_Chassis', headerName: 'Numéro de châssis', width: 150 },
    { field: 'DM_Circulation', headerName: 'DM Circulation', width: 150 },
    { field: 'Pf', headerName: 'Pf', width: 100 },
    { field: 'Num_Immat', headerName: 'Numéro d\'immatriculation', width: 200 },
    { field: 'Marque', headerName: 'Marque', width: 150 },
    { field: 'Couleur', headerName: 'Couleur', width: 150 },
    { field: 'Prestataire', headerName: 'Prestataire', width: 150 },
    { field: 'Font_Service', headerName: 'Font Service', width: 150 },
    { field: 'Ref_Pneus', headerName: 'Réf Pneus', width: 150 },
    { field: 'Echeance_Aut_Circulation', headerName: 'Échéance Aut Circulation', width: 200 },
    { field: 'Echaence_Visite_Tech', headerName: 'Échéance Visite Tech', width: 200 },
    { field: 'Assurance_Contrat_Cours', headerName: 'Assurance Contrat Cours', width: 200 },
    { field: 'Cartes_Verte', headerName: 'Cartes Verte', width: 150 },
    { field: 'Vignete', headerName: 'Vignete', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <TableCell>
          <IconButton
            aria-label="delete"
            onClick={() => OnDelete(params.row.id)}
          >
            <GridDeleteIcon />
          </IconButton>
        </TableCell>
      )
    },
  ];
 /*  const DEFAULT_VISIBLE_FIELDS = [
    'Nom',
    'Prenom',
    'Filiale',
    'Direction',
    'Matricule',
    'Grade',
    'Email',
    'Marque',
    'WW',
    'actions',
  ];
  const ADDITIONAL_FIELDS = [
   'Nom',
    'Prenom',
    'Filiale' ,
    'Direction',
    'Matricule',
    'Grade',
    'Email',
    'NumeroGsm',
    'NumeroGsmPersonnel',
    'TelephoneFixe',
    'Permis',
    'DateValiditePermis',
    'CIN',
    'DateValiditéCIN',
    'NumeroPassport',
    'DateValiditéPassport',
    'Num_parc',
    'WW',
    'Num_Chassis',
    'DM_Circulation',
    'Pf',
    'Num_Immat',
    'Marque',
    'Couleur',
    'Prestataire',
    'Font_Service',
    'Ref_Pneus',
    'Echeance_Aut_Circulation',
    'Echaence_Visite_Tech',
    'Assurance_Contrat_Cours',
    'Cartes_Verte',
    'Vignete',
  ] */
  /* const VISIBLE_FIELDS = [...DEFAULT_VISIBLE_FIELDS, ...ADDITIONAL_FIELDS, 'actions'];

 
  //const visibleColumns = columns.filter(column => VISIBLE_FIELDS.includes(column.field));
 
  return (
    <div style={{ height: 800, width: '100%' }}>
      <BasicAlerts message={message} show={show} />
      <DataGrid
        rows={affectationDetails}
        columns={columns}
        pageSize={rowsPerPage}
        disableColumnFilter
      />
    </div>
  );
}
 */
//react-hooks/exhaustive-deps
//eslint-disable no-unused-vars 
// eslint-disable jsx-a11y/role-supports-aria-props 
// eslint-disable jsx-a11y/anchor-is-valid *
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { IconButton, TableCell } from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid-premium';
import BasicAlerts from 'src/components/Alert/alert1';
import axios from 'axios';

export default function TableAffectation() {
  const [affectationDetails, setAffectationDetails] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  } 

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAffectationDetails();
  }, [affectationDetails]);

  /* const getAffectationDetails = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/affectations1');
      if (!response.ok) {
        throw new Error(
          'Une erreur est survenue lors de la récupération des détails des affectations'
        );
      }
      const data = await response.json();
      const affectationsWithId = data.map((affectation) => ({
        ...affectation,
        id: affectation._id, // Utilisez la valeur de _id comme id
        Nom: affectation.collaborateurDetails[0].Nom,
        Prenom: affectation.collaborateurDetails[0].Prenom,
        Filiale: affectation.collaborateurDetails[0].Filiale,
        Direction: affectation.collaborateurDetails[0].Direction,
        Matricule: affectation.collaborateurDetails[0].Matricule,
        Grade: affectation.collaborateurDetails[0].Grade,
        Email: affectation.collaborateurDetails[0].Email,
        NumeroGsm: affectation.collaborateurDetails[0].NumeroGsm,
        NumeroGsmPersonnel: affectation.collaborateurDetails[0].NumeroGsmPersonnel,
        TelephoneFixe: affectation.collaborateurDetails[0].TelephoneFixe,
        Permis: affectation.collaborateurDetails[0].Permis,
        DateValiditePermis: formatDate(affectation.collaborateurDetails[0].DateValiditePermis),
        CIN: affectation.collaborateurDetails[0].CIN,
        DateValiditéCIN: formatDate(affectation.collaborateurDetails[0].DateValiditéCIN),
        NumeroPassport: affectation.collaborateurDetails[0].NumeroPassport,
        DateValiditéPassport: formatDate(affectation.collaborateurDetails[0].DateValiditéPassport),
        Num_parc: affectation.vehiculeDetails[0].Num_parc,
        WW: affectation.vehiculeDetails[0].WW,
        Num_Chassis: affectation.vehiculeDetails[0].Num_Chassis,
        DM_Circulation: affectation.vehiculeDetails[0].DM_Circulation,
        Pf: affectation.vehiculeDetails[0].Pf,
        Num_Immat: affectation.vehiculeDetails[0].Num_Immat,
        Marque: affectation.vehiculeDetails[0].Marque,
        Couleur: affectation.vehiculeDetails[0].Couleur,
        Prestataire: affectation.vehiculeDetails[0].Prestataire,
        Font_Service: affectation.vehiculeDetails[0].Font_Service,
        Ref_Pneus: affectation.vehiculeDetails[0].Ref_Pneus,
        Echeance_Aut_Circulation: formatDate(affectation.vehiculeDetails[0].Echeance_Aut_Circulation),
        Echaence_Visite_Tech: formatDate(affectation.vehiculeDetails[0].Echaence_Visite_Tech),
        Assurance_Contrat_Cours: formatDate(affectation.vehiculeDetails[0].Assurance_Contrat_Cours),
        Cartes_Verte: affectation.vehiculeDetails[0].Cartes_Verte,
        Vignete: formatDate(affectation.vehiculeDetails[0].Vignete),
      }));
      setAffectationDetails(affectationsWithId);
    } catch (error) {
      console.error(error);
    }
  };  */
  const getAffectationDetails = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/affectations1');
      if (!response.ok) {
        throw new Error(
          'Une erreur est survenue lors de la récupération des détails des affectations'
        );
      }
      const data = await response.json();
      const affectationsWithId = data.map((affectation) => {
        const collaborateurDetails = affectation.collaborateurDetails[0];
        const vehiculeDetails = affectation.vehiculeDetails[0];
  
        const affectationWithDetails = {
          ...affectation,
          id: affectation._id,
          Nom: collaborateurDetails ? collaborateurDetails.Nom : '',
          Prenom: collaborateurDetails ? collaborateurDetails.Prenom : '',
          Filiale: collaborateurDetails ? collaborateurDetails.Filiale : '',
          Direction: collaborateurDetails ? collaborateurDetails.Direction : '',
          Matricule: collaborateurDetails ? collaborateurDetails.Matricule : '',
          Grade: collaborateurDetails ? collaborateurDetails.Grade : '',
          Email: collaborateurDetails ? collaborateurDetails.Email : '',
          NumeroGsm: collaborateurDetails ? collaborateurDetails.NumeroGsm : '',
          NumeroGsmPersonnel: collaborateurDetails ? collaborateurDetails.NumeroGsmPersonnel : '',
          TelephoneFixe: collaborateurDetails ? collaborateurDetails.TelephoneFixe : '',
          Permis: collaborateurDetails ? collaborateurDetails.Permis : '',
          DateValiditePermis: collaborateurDetails ? formatDate(collaborateurDetails.DateValiditePermis) : '',
          CIN: collaborateurDetails ? collaborateurDetails.CIN : '',
          DateValiditéCIN: collaborateurDetails ? formatDate(collaborateurDetails.DateValiditéCIN) : '',
          NumeroPassport: collaborateurDetails ? collaborateurDetails.NumeroPassport : '',
          DateValiditéPassport: collaborateurDetails ? formatDate(collaborateurDetails.DateValiditéPassport) : '',
          Num_parc: vehiculeDetails ? vehiculeDetails.Num_parc : '',
          WW: vehiculeDetails ? vehiculeDetails.WW : '',
          Num_Chassis: vehiculeDetails ? vehiculeDetails.Num_Chassis : '',
          DM_Circulation: vehiculeDetails ? vehiculeDetails.DM_Circulation : '',
          Pf: vehiculeDetails ? vehiculeDetails.Pf : '',
          Num_Immat: vehiculeDetails ? vehiculeDetails.Num_Immat : '',
          Marque: vehiculeDetails ? vehiculeDetails.Marque : '',
          Couleur: vehiculeDetails ? vehiculeDetails.Couleur : '',
          Prestataire: vehiculeDetails ? vehiculeDetails.Prestataire : '',
          Font_Service: vehiculeDetails ? vehiculeDetails.Font_Service : '',
          Ref_Pneus: vehiculeDetails ? vehiculeDetails.Ref_Pneus : '',
          Echeance_Aut_Circulation: vehiculeDetails ? formatDate(vehiculeDetails.Echeance_Aut_Circulation) : '',
          Echaence_Visite_Tech: vehiculeDetails ? formatDate(vehiculeDetails.Echaence_Visite_Tech) : '',
          Assurance_Contrat_Cours: vehiculeDetails ? formatDate(vehiculeDetails.Assurance_Contrat_Cours) : '',
          Cartes_Verte: vehiculeDetails ? vehiculeDetails.Cartes_Verte : '',
          Vignete: vehiculeDetails ? formatDate(vehiculeDetails.Vignete) : '',
        };
  
        return affectationWithDetails;
      });
  
      setAffectationDetails(affectationsWithId);
    } catch (error) {
      console.error(error);
    }
  };
  


  const OnDelete = (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      axios.delete(`http://localhost:3001/api/deleteAffectation/${id}`)
        .then(res => {
          console.log(res.data);
          setMessage(res.data.message);
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 4000);
        });
    }
  };

  const columns = [
    
    { field: 'Nom', headerName: 'Nom', width: 150 },
    { field: 'Prenom', headerName: 'Prénom', width: 150 },
    { field: 'Filiale', headerName: 'Filiale', width: 150 },
    { field: 'Direction', headerName: 'Direction', width: 150 },
    { field: 'Matricule', headerName: 'Matricule', width: 150 },
    { field: 'Grade', headerName: 'Grade', width: 150 },
    { field: 'Email', headerName: 'Email', width: 150 },
    { field: 'NumeroGsm', headerName: 'Numéro GSM', width: 150 },
    { field: 'NumeroGsmPersonnel', headerName: 'Numéro GSM Personnel', width: 200 },
    { field: 'TelephoneFixe', headerName: 'Téléphone Fixe', width: 150 },
    { field: 'Permis', headerName: 'Permis', width: 150 },
    { field: 'DateValiditePermis', headerName: 'Date de validité du permis', width: 200 },
    { field: 'CIN', headerName: 'CIN', width: 150 },
    { field: 'DateValiditéCIN', headerName: 'Date de validité de la CIN', width: 200 },
    { field: 'NumeroPassport', headerName: 'Numéro de passeport', width: 200 },
    { field: 'DateValiditéPassport', headerName: 'Date de validité du passeport', width: 200 },
    { field: 'Num_parc', headerName: 'Numéro de parc', width: 150 },
    { field: 'WW', headerName: 'WW', width: 150 },
    { field: 'Num_Chassis', headerName: 'Numéro de châssis', width: 150 },
    { field: 'DM_Circulation', headerName: 'DM Circulation', width: 150 },
    { field: 'Pf', headerName: 'Pf', width: 100 },
    { field: 'Num_Immat', headerName: 'Numéro d\'immatriculation', width: 200 },
    { field: 'Marque', headerName: 'Marque', width: 150 },
    { field: 'Couleur', headerName: 'Couleur', width: 150 },
    { field: 'Prestataire', headerName: 'Prestataire', width: 150 },
    { field: 'Font_Service', headerName: 'Font Service', width: 150 },
    { field: 'Ref_Pneus', headerName: 'Réf Pneus', width: 150 },
    { field: 'Echeance_Aut_Circulation', headerName: 'Échéance Aut Circulation', width: 200 },
    { field: 'Echaence_Visite_Tech', headerName: 'Échéance Visite Tech', width: 200 },
    { field: 'Assurance_Contrat_Cours', headerName: 'Assurance Contrat Cours', width: 200 },
    { field: 'Cartes_Verte', headerName: 'Cartes Verte', width: 150 },
    { field: 'Vignete', headerName: 'Vignete', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <TableCell>
          <IconButton
            aria-label="delete"
            onClick={() => OnDelete(params.row.id)}
          >
            <GridDeleteIcon />
          </IconButton>
        </TableCell>
      )
    },
  ];




  return (
    <div style={{ height: 800, width: '100%' }}>
      <BasicAlerts message={message} show={show} />
      <DataGrid
        rows={affectationDetails}
        columns={columns}
        pageSize={rowsPerPage}
      />
    </div>
  );
}