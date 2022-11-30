import {
    GET_INPROGRESS_LIST_REQUEST,
    SET_INPROGRESS_LIST_REQUEST,
    SET_SCHEDULED_LIST_REQUEST,
    GET_SCHEDULED_LIST_REQUEST,
    GET_COMPLETED_LIST_REQUEST,
    SET_COMPLETED_LIST_REQUEST,
    GET_PAST_LIST_REQUEST,
    SET_PAST_LIST_REQUEST,
    SET_DASHBOARD_MESSAGES,
    OPEN_PDF,
    SET_PDF
} from "./constants";

const INIT_STATE = {
    scheduled: [],
    country: [],
    completed: [],
    past: [],
    loading: false,
    message: '',
    status: '',
    pdf:''
   
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_SCHEDULED_LIST_REQUEST:
            return {
                ...state,
                status: '',
                // message:''
                loading: true
            };

        case SET_SCHEDULED_LIST_REQUEST:
            return {
                ...state,
                scheduled: action.payload,
                loading: false,
                // message:''
            };

        case GET_INPROGRESS_LIST_REQUEST:
            return {
                ...state,
                status: '',
                // message:''
                loading: true
            };

        case SET_INPROGRESS_LIST_REQUEST:
            return {
                ...state,
                inProgress: action.payload,
                loading: false,
                // message:''
            };


        case GET_COMPLETED_LIST_REQUEST:
            return {
                ...state,
                status: '',
                // message:''
                loading: true
            };

        case SET_COMPLETED_LIST_REQUEST:
            return {
                ...state,
                completed: action.payload,
                loading: false,
                message:''
            };
        case GET_PAST_LIST_REQUEST:
            return {
                ...state,
                status: '',
                // message:''
                loading: true
            };

        case SET_PAST_LIST_REQUEST:
            return {
                ...state,
                past: action.payload,
                loading: false,
                // message:''
            };
            case OPEN_PDF:
                return {
                    ...state,
                    status: '',
                    // message:''
                    loading: true
                };
    
            case SET_PDF:
                return {
                    ...state,
                    pdf: action.payload,
                    loading: false,
                    // message:''
                };
        case SET_DASHBOARD_MESSAGES:
            
            return {
                ...state,
                 message: action.payload,
                status: '',
                loading: false
            }

        default:
            return state;
    }
};