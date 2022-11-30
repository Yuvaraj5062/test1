import {
  AppointmentsIcon,
  ClinicalICon,
  DashboardICon,
  PatientsIcon,
  PhysiciansIcon,
  SignOutIcon,
  AllPatientIcon,
  AddPatientIcon,
  EditPatientIcon,
  AllAppointmentsIcon,
  AddAppoinmentsIcon,
  EditDoctorIcon,
} from "../component/svg-component";
import Appointments from "../pages/appointments/Appointments";
import EditDoctor from "../pages/appointments/edit-doctor/EditDoctor";
import ClinicalStaff from "../pages/clinical-staff/ClinicalStaff";
import Dashboard from "../pages/dashboard/Dashboard";
import Logout from "../pages/logout/Logout";
import AllAppointments from '../pages/appointments/all-appointments/AllAppointments'
import AddAppointment from "../pages/appointments/add-appointment/AddAppointment";
import Patient from '../pages/patient/Patient'
import AllPatient from '../pages/patient/all-patient/AllPatient'
import EditPatient from '../pages/patient/edit-patient/EditPatient'
import AddPatient from '../pages/patient/add-patient/AddPatient' 
import Scheduled from '../pages/dashboard/scheduled/Scheduled'
import InProgress from '../pages/dashboard/in-progress/InProgress'
import Completed from '../pages/dashboard/completed/Completed'
import Past from "../pages/dashboard/past/Past";
import Physicians from '../pages/physicians/Physicians'
import PhysicianInProgress from '../pages/physicians/physician-in-progress/PhysicianInProgress'
import SummaryReport from "../pages/dashboard/summary-report/SummaryReport";
export const routeData = [
  {
    title: "Dashboard",
    icon: DashboardICon,
    element: Dashboard,
    navigate: "dashboard",
    path:'/dashboard/*',
    dropdown: false,
    role: ["ClinicalStaff", "Doctor"],
    children: [
      {
        element: Scheduled,
        path:"",
      },
      {
        element: InProgress,
        path:"inprogress",
        
      },
      {
        element: Completed,
        path:"completed",
      },
      {
        element: Past,
        path:"past",
        
      },
      
    ],
  },
  {
    title: "All Physicians",
    icon: PhysiciansIcon,
    element: Physicians,
    navigate: "physicians",
    path:'physicians/*',
    dropdown: false,
    role: ["ClinicalStaff", "Doctor"],
    children: [
      {
        element: PhysicianInProgress,
        path:"",
      },   
    ],
  },
 
  {
    title: "Appointments",
    icon: AppointmentsIcon,
    element: Appointments,
    navigate: "appointments",
    path:"appointments/*",
    dropdown: true,
    role: ["ClinicalStaff", "Doctor"],
 
    children: [
      {
        title: "All Appointments",
        icon: AllAppointmentsIcon,
        navigate: "appointments",
        element: AllAppointments,
        path:""
      },
      {
        title: "Add Appointment",
        icon: AddAppoinmentsIcon,
        navigate: "appointments/add-appointment",
        path:"add-appointment",
        element: AddAppointment,
      },
      {
        title: "Edit Doctor",
        icon: EditDoctorIcon,
        navigate: "appointments/edit-doctor",
        path:"edit-doctor",
        element: EditDoctor,
      },
    ],
  },
  {
    title: "Patients",
    icon: PatientsIcon,
    element:Patient,
    navigate: "patient",
    path:"patient/*",
    dropdown: true,
    role: ["ClinicalStaff", "Doctor"],
    children: [
      {
        title: "All Patient",
        icon: AllPatientIcon,
        element: AllPatient,
        navigate: "patient",
        path:"",
      },
      {
        title: "Add Patient",
        icon: AddPatientIcon,
        element: AddPatient,
        navigate: "patient/add-patient",
        path:"add-patient",
        
      },
      {
        title: "Edit Patient",
        icon: EditPatientIcon,
        element:EditPatient ,
        navigate: "patient/edit-patient",
        path:"edit-patient",
        
      },
    ],
  },
  {
    title: "Clinical staff",
    icon: ClinicalICon,
    navigate: "clinicalstaff",
    path:"clinicalstaff",
    role: ["ClinicalStaff", "Doctor"],
    element: SummaryReport,
    children:null
    // dropdown: true,
    // children: [
    //   {
    //     title: "Patient1",
    //     icon: ClinicalICon,
    //     navigate: "patient",
    //   },
    //   {
    //     title: "Patient",
    //     icon: Patients,
    //     navigate: "patient",
    //   },
    //   {
    //     title: "Patient",
    //     icon: Patients,
    //     navigate: "patient",
    //   },
    // ],
  },
  {
    role: ["ClinicalStaff", "Doctor"],
    children:null,
    title: "Sign out",
    element: Logout,
    icon: SignOutIcon,
    navigate: "logout",
    path:"logout",
    dropdown: false,
  },
];
