// export const BASE_URL = "http://192.168.1.114:8001/api/"; 
// export const BASE_URL = "http://192.168.1.199:24722/api/";

 export const BASE_URL = "https://demo-chw-be.archesoftronix.in/api/";

//  export const BASE_URL = "https://chwbe-qa.archesoftronix.in/api/"; //QA
export default {
  default: {
    baseUrl: BASE_URL,
    login: BASE_URL + "Authentication/UserLoginAsync",
    refreshtoken:
      BASE_URL + "Authentication/GenerateTokenFromRefreshTokenAsync",
    //patient
    addPatient: BASE_URL + "User/AddUpdatePatientAsync",
    getSymptoms: BASE_URL + "User/GetAllSymptomsAsync",
    getSearchFirstName: BASE_URL + "User/GetAllPatientFirstNameAsync",
    getSearchLastName: BASE_URL + "User/GetAllPatientLastNameAsync",
    getPatientDetailById: BASE_URL + "User/GetPatientAilmentDetailsAsync",
    getAllDoctors: BASE_URL + "User/GetAllDoctorNameAsync",
    addAppointment: BASE_URL + "Appointment/AddAppointmentAsync",
    getPatientByFirstName: BASE_URL + "User/GetPatientDetailsAsync",
    //appointments
    getSummaryReprot: BASE_URL + "Diagnosis/GetSummaryByAilmentAsync",
    //State
    getCountryUrl: BASE_URL + "Region/GetAllCountry",
    getCountryByNameUrl: BASE_URL + "Region/GetCountryByNameAsync",
    getStateUrl: BASE_URL + "Region/GetAllStateByCountryPhoneCode",
    getStateByNameUrl: BASE_URL + "Region/GetStateByNameAsync",
    getCityUrl: BASE_URL + "Region/GetCityByStateAsync",
    getCityByNameUrl: BASE_URL + "Region/GetCityByNameAsync",
    //Dashboard
    getDashboardDataURl: BASE_URL + "Appointment/GetAllAppointmentAsync",
    changePatientStatus: BASE_URL + "Appointment/UpdateAppointmentStatusAsync",
    deleteAppointment: BASE_URL + "Appointment/DeleteAppointmentAsync",
    //Physicians
    deleteMedication: BASE_URL + "Diagnosis/DeleteMedicationAsync",
    getInprogressDataByName: BASE_URL + "User/GetPatientAilmentDetailsAsync",
    postInprogressProblemDiagnosis:
      BASE_URL + "Diagnosis/AddProblemAndDiagnosisAsync",
    //pdf
    openpdfurl: BASE_URL + "Diagnosis/GetSummaryReportByAilmentAsync",
    // Physician ProblemIdentification
    getAllProblem: BASE_URL + "Diagnosis/GetAllProblemAsync",
    getAllDiagnosis: BASE_URL + "Diagnosis/GetAllDiagnosisAsync",
    //medication
    getMedicationDataURl: BASE_URL + "Diagnosis/GetAllMedicineAsync",
    addUpdateMedication: BASE_URL + "Diagnosis/AddUpdateMedicationAsync",
    getMedicationDetailById:
      BASE_URL + "Diagnosis/GetAllMedicationByAilmentAsync",
  },
};
