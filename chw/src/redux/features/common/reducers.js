import {
    GET_CITY_BY_NAME_LIST_REQUEST,
    GET_CITY_LIST_REQUEST,
    GET_STATE_BY_NAME_LIST_REQUEST,
    GET_STATE_LIST_REQUEST,
    SET_CITY_LIST_REQUEST,
    SET_STATE_LIST_REQUEST,
    GET_MEDICATION_LIST_REQUEST,
    SET_MEDICATION_LIST_REQUEST,
    GET_COUNTRY_LIST_REQUEST,
    SET_COUNTRY_LIST_REQUEST,
    GET_COUNTRY_BY_NAME_LIST_REQUEST
} from "./constants";

const INIT_STATE = {
    state: [],
    country: [],
    city: [],
    medication: [],
    loading: false,
    message: '',
    status: ''
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_STATE_LIST_REQUEST:
            return {
                ...state,
                status: '',
                // message:''
                // loading: true
            };
        case GET_STATE_BY_NAME_LIST_REQUEST:
            return {
                ...state,
                status: '',
                // message:''
                // loading: true
            };
        case SET_STATE_LIST_REQUEST:
            return {
                ...state,
                state: action.payload,
                // loading: false,
                // message:''
            };

        case GET_COUNTRY_LIST_REQUEST:
            return {
                ...state,
                status: '',
                // message:''
                // loading: true
            };
        case GET_COUNTRY_BY_NAME_LIST_REQUEST:
            return {
                ...state,
                country: [],

            };
        case SET_COUNTRY_LIST_REQUEST:
            return {
                ...state,
                country: action.payload,
                // loading: false,
                // message:''
            };

        case GET_CITY_LIST_REQUEST:
            return {
                ...state,
                status: '',
                // message:''
                // loading: true
            };
        case GET_CITY_BY_NAME_LIST_REQUEST:
            return {
                ...state,
                status: '',
                // message:''
                // loading: true
            };
        case SET_CITY_LIST_REQUEST:
            return {
                ...state,
                city: action.payload,
                // loading: false,
                // message:''
            };

        case GET_MEDICATION_LIST_REQUEST:
            return {
                ...state,
                status: '',
                // message:''
                // loading: true
            };
        case SET_MEDICATION_LIST_REQUEST:
            return {
                ...state,
                medication: action.payload,
                // loading: false,
                // message:''
            };

        default:
            return state;
    }
};