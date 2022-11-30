import {
  GET_INPROGRSS_DATA_BY_NAME_LIST_REQUEST,
  POST_INPROGRESS_PROBLEM_DIAGNOSIS,
  SET_INPROGRESS_DATA_LIST_REQUEST,
  ADD_UPDATE_MEDICATION,
  MEDICATION_MESSAGES,
  ADD_UPDATE_MEDICATION_REQUEST,
  GET_MEDICATION_DETAIL_LIST_REQUEST,
  SET_MEDICATION_DETAIL_LIST_REQUEST,
  GET_ALL_PROBLEM_DIAGNOSIS,
  GET_PHYSICIANS_DESCRIPTION_LIST_REQUEST,
  SET_PHYSICIANS_DESCRIPTION_LIST_REQUEST,
  GET_DIAGNOSIS_LIST_REQUEST,
  SET_DIAGNOSIS_LIST_REQUEST,
  SET_INPROGRESS_PROBLEM_DIAGNOSIS,
  CLEAR_MESSAGES
} from "./constants";

const INIT_STATE = {
  inprogressData: [],
  medication: [],
  physiciansDescription:[],
  loading: false,
  message: "",
  status: "",
  medicationDetail: [],
  problemDiagnosisMessage:'',
  diagnosis:[],
  addUpdateMessage:''
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INPROGRSS_DATA_BY_NAME_LIST_REQUEST:
      return {
        ...state,
        status: "",
        // message:''
        // loading: true
      };
    case SET_INPROGRESS_DATA_LIST_REQUEST:
      return {
        ...state,
        inprogressData: action.payload,
        // loading: false,
        // message:''
      };

    case GET_MEDICATION_DETAIL_LIST_REQUEST:
      return {
        ...state,
        status: "",
        // message:''
        loading: true,
      };
    case SET_MEDICATION_DETAIL_LIST_REQUEST:
      return {
        ...state,
        medicationDetail: action.payload,
        loading: false,
        // message:''
      };
    case GET_ALL_PROBLEM_DIAGNOSIS:
      return {
        ...state,
        status: "",
      };
    case POST_INPROGRESS_PROBLEM_DIAGNOSIS:
      return {
        ...state,
        loading: true,
      };
      case SET_INPROGRESS_PROBLEM_DIAGNOSIS:
        return {
          ...state,
          loading: false,
          status:action.payload.statusCode,
          problemDiagnosisMessage:action.payload.message,
          message:'',
        };
      
    case ADD_UPDATE_MEDICATION:
      return {
        ...state,
        loading: true,
      };
    case ADD_UPDATE_MEDICATION_REQUEST:
      return {
        ...state,
        medication: action.payload.data,
        addUpdateMessage: action.payload.message,
        status: action.payload.statusCode,
        loading: false,
      };
      case GET_PHYSICIANS_DESCRIPTION_LIST_REQUEST:
        return {
            ...state,
            // status:'',
            message:''
           // loading: true
        };
    case SET_PHYSICIANS_DESCRIPTION_LIST_REQUEST:
        return {
            ...state,
            physiciansDescription: action.payload,
            loading: false,
            message:''
        };

        case GET_DIAGNOSIS_LIST_REQUEST:
        return {
            ...state,
            // status:'',
            message:''
           // loading: true
        };
    case SET_DIAGNOSIS_LIST_REQUEST:
        return {
            ...state,
            diagnosis: action.payload,
            loading: false,
            message:''
        };


    case MEDICATION_MESSAGES:
      return {
        ...state,
        loading: false,
        message: action.payload,
        problemDiagnosisMessage:''
      };

      case CLEAR_MESSAGES:
    
      return {
        ...state,
        loading: false,
        message: '',
        problemDiagnosisMessage:'',
        addUpdateMessage:'',
         status:''
      };
    default:
      return state;
  }
};
