import diagnoseData from '../../data/diagnoses.json'

import { DiagnoseEntry } from '../types';

const diagnoses: Array<DiagnoseEntry> = diagnoseData

const getDiagnoses = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};