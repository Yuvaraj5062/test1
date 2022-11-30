import {
    ADD_PATIENT_REQUEST,
    GET_SYMPTOMS_LIST_REQUEST,
    ADD_PATIENT,
    SET_SYMPTOMS_LIST_REQUEST,
    SET_FIRSTNAMES_LIST_REQUEST,
    GET_FIRSTNAMES_LIST_REQUEST,
    GET_LASTNAMES_LIST_REQUEST,
    SET_LASTNAMES_LIST_REQUEST,
    SET_PATIENTS_MESSAGES
} from './constants'

const INIT_STATE = {
    symptoms: [],
    patient: [],
    patientFirstNames: [],
    patientLastNames: [],
    loading: false,
    message: '',
    status: ''
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_SYMPTOMS_LIST_REQUEST:
            return {
                ...state,
                status: '',
                message: ''
                // loading: true
            };
        case SET_SYMPTOMS_LIST_REQUEST:
            return {
                ...state,
                symptoms: action.payload,
                loading: false,
                message: ''
            };
        case GET_FIRSTNAMES_LIST_REQUEST:
            return {
                ...state,
                // loading: true
            };
        case SET_FIRSTNAMES_LIST_REQUEST:
            return {
                ...state,
                patientFirstNames: action.payload,
                // loading: false
            };
        case GET_LASTNAMES_LIST_REQUEST:
            return {
                ...state,
                // loading: true
            };
        case SET_LASTNAMES_LIST_REQUEST:
            return {
                ...state,
                patientLastNames: action.payload,
                // loading: false
            };
        case ADD_PATIENT:
            return {
                ...state,
                loading: true,
            }
        case ADD_PATIENT_REQUEST:
            return {
                ...state,
                patient: action.payload.data,
                message: action.payload.message,
                status: action.payload.statusCode,
                loading: false
            };
        case SET_PATIENTS_MESSAGES:
            return {
                ...state,
                message: '',
                status: '',
                loading: false
            }
        default:
            return state;
    }
};