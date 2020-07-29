import patientData from '../../data/patients'
import { Patient, NonSensitivePatientData, NewPatient, NewEntry, Entry } from '../types';
import { v4 as uuidv4 } from 'uuid';

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
  return patient;
};

const addEntry = (entry: NewEntry, patientId: string): Patient | undefined => {
  
  const newEntry = {
    id: uuidv4(),
    date: new Date().toISOString().slice(0,10),
    ...entry
  }

  const patient = patients.find(p => p.id === patientId);
  patient?.entries.push(newEntry as Entry)

  return patient;
}

export default {
  getPatients,
  getNonSensitivePatientData,
  addPatient,
  findById,
  addEntry
};