import { State } from "./state";
import { Patient, Diagnose, Entry } from "../types";
import PatientListPage from "../PatientListPage";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "GET_PATIENT";
      payload: Patient;
    }
  | {
      type: "GET_DIAGNOSES";
      payload: Diagnose[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Patient;
    };

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  }  
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  }
};

export const addEntry = (patient: Patient): Action => {
  return {
    type: "ADD_ENTRY",
    payload: patient
  }
};

export const getPatient = (patient: Patient): Action => {
  return {
    type: "GET_PATIENT",
    payload: patient
  }
};

export const getDiagnoses = (diagnoses: Diagnose[]): Action => {
  return {
    type: "GET_DIAGNOSES",
    payload: diagnoses
  }  
};

export const reducer = (state: State, action: Action): State => {
  console.log(typeof state.patients);
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        },
        patient: {
          [action.payload.id]: action.payload
        }
      };
    case "GET_PATIENT":
      return {
        ...state,
        patient: {
          [action.payload.id]: action.payload
        }
      };
    case "GET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};
