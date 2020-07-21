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

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(d => d.id === id);
/*   if (patient) {
    patient.entries = []
  } */
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatientData,
  addPatient,
  findById
};