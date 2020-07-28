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

const addEntry = (entry: NewEntry): Entry | undefined => {
  
  const newEntry = {
    id: uuidv4(),
    ...entry
  }
  //patientData.find(p => p.id === patientId)?.entries.push(newEntry as Entry);

  //const patient = patients.find(p => p.id === patientId);

  return newEntry as Entry;
}

export default {
  getPatients,
  getNonSensitivePatientData,
  addPatient,
  findById,
  addEntry
};