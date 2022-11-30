import { connect } from "react-redux";
import * as auth from "../../redux/features/auth/authRedux";

import React from 'react'

import { useNavigate } from "react-router-dom";


 const Logout = (props) => {
    let { show } = props;
    const navigate = useNavigate();
    React.useEffect(() => {
        props.logout();
        navigate('/')
    
      }, []);

    
    
    return (<></>
     
    )
}

export default connect(null, auth.actions)(Logout);