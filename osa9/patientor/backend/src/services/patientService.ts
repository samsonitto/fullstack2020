import patientData from '../../data/patients'

import { Patient, NonSensitivePatientData, NewPatient } from '../types';

const patients: Array<Patient> = patientData

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: patient.ssn,
    ...patient
  };

  patientData.push(newPatient)

  return newPatient;  
};

export default {
  getPatients,
  getNonSensitivePatientData,
  addPatient
};