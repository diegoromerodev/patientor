import { State } from "./state";
import { Patient, Diagnosis } from "../types";

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
      type: "SET_LAST_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS";
      payload: Diagnosis[];
    };


export const reducer = (state: State, action: Action): State => {
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
    case "SET_LAST_PATIENT":
        return {
            ...state,
            lastPatient: action.payload
        };
    case "SET_DIAGNOSIS":
        return {
            ...state,
            diagnosis: {
                ...action.payload.reduce((acc, d) => {
                    return {...acc, [d.code]: d};
                }, {})
            }
        };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
    return { 
    type: "SET_PATIENT_LIST", 
    payload: patients 
    };
};

export const addPatient = (patient: Patient): Action => {
    return {
        type: "ADD_PATIENT",
        payload: patient
    };
};

export const setLastPatient = (patient: Patient): Action => {
    return {
        type: "SET_LAST_PATIENT",
        payload: patient
    };
};

export const setDiagnosis = (diagnosisList: Array<Diagnosis>): Action => {
    return {
        type: "SET_DIAGNOSIS",
        payload: diagnosisList
    };
};