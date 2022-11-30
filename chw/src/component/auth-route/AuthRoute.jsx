import { Navigate } from "react-router-dom";
import useToken from "../../hooks/use-token/useToken";

const AuthRoutes = ({ children }) => {
  const { token } = useToken();
  
  if (!token) {
    return <Navigate to="/" />;
  } 
  else if (token) {
    return children;
  }
  //  else {
  //   return <Navigate to="notpermitted" />;
  // }
};
export default AuthRoutes;
