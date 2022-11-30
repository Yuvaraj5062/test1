import { useState } from "react";
import { useSelector } from 'react-redux';
const useToken = () => {
  const {auth} = useSelector((state) => state)

  let jwtToken = auth.user;
   const [token, setToken] = useState(jwtToken);
  return {  
  setToken,
  token
  };
};
export default useToken;
