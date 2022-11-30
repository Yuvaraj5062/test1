import Button from "../../component/Button/Button";
import Divider from "../../component/divider/Divider";
import TextField from "../../component/TextField/TextField";
import styles from "./signin.module.scss";
import { connect } from "react-redux";
import * as auth from "../../redux/features/auth/authRedux";
import useForm from "../../hooks/use-form/useForm";
import * as authRequest from "../../redux/features/auth/authCrud";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { encrypt, decrypt } from "../../config/crypto/CryptoAES";
import {
  SignInViewIcon,
  ViewHideSigninIcon,
} from "../../component/svg-component";
const SignIn = (props) => {
  const [loginError, setLoginError] = useState({
    message: "",
    type: "",
  });
  const [show, setShow] = useState(false);

  const [remember, setRemember] = React.useState(
    localStorage.getItem("rPass") ? true : false
  );

  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleFocus, data, errors, setData } =
    useForm({
      //ref: ref,

      validations: {
        email: {
          required: {
            value: true,
            message: "Please enter your email address",
          },
          pattern: {
            value:
              /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            message: "Please enter valid email address",
          },
        },
        password: {
          required: {
            value: true,
            message: "Please enter password",
          },
          // custom: {
          //   isValid: (value) =>
          //     value && value.length >= 8 && value.length <= 16 ? true : false,
          //   message: "password must be between 8 and 16 characters",
          // },
        },
      },
      onSubmit: () => handleSubmitForm(data),
    });
  useEffect(() => {
    const val = localStorage.getItem("rUserName");
    const pass = localStorage.getItem("rPass");

    setData({
      email: val,
      password: pass,
    });
  }, []);
  const handleSubmitForm = (data) => {
    localStorage.removeItem("rUserName");
    localStorage.removeItem("rPass");
    if (remember) {
      localStorage.setItem("rUserName", data.email);
      localStorage.setItem("rPass", data.password);
    }
    setLoginError({
      message: "",
      type: "loader",
    });
    const payload = {
      userName: data.email,
      password: data.password,
    };

    const header = { headers: { "Content-Type": "application/json" } };
   
   
    
    authRequest
      .login(encrypt(payload), header)
      .then((response) => {
        console.log("outer",response.data)
        if (response.statusCode === 200) {     
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          if (remember) {
            localStorage.setItem("rUserName", data.email);
            localStorage.setItem("rPass", data.password);
          } else {
            localStorage.removeItem("rUserName");
            localStorage.removeItem("rPass");
          }

          // setTimeout(function () {
          //   if (response.data.data.roleName === "Doctor") {
          //     navigate("/dashboard");
          //   }
          // else if (response.data.data.roleName === "ClinicalStaff") {
          //   navigate("/patient/add-patient");
          // }
          // }, 0);
          
          props.login({
            authKey: response.data,
            user: response.data,
          });
        } else {
          setLoginError({
            message: response.data.message,
            type: "error",
          });
          setTimeout(function () {
            setLoginError({
              message: response.data.message,
              type: "",
            });
          }, 3000);
        }
      })
      .catch((error) => {
        setLoginError({
          message: "Something went wrong",
          type: "error",
        });
        setTimeout(function () {
          setLoginError({
            message: "Something went wrong",
            type: "",
          });
        }, 3000);
      });
  };
  const handleShowHide = (val) => {
    setShow(val);
  };

  const checkHandler = () => {
    console.log("re", remember);
    setRemember(!remember);
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.signInContainer}>
          <span className={styles.signInText}>Sign in</span>
          <span className={styles.adminPanel}>
            Enter your email address and password
          </span>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            {loginError.message && (
              <div className={styles.error}>{loginError.message}</div>
            )}
            {/* {loginError.type === "loader" && (
              <Spinner/>
              
            )} */}
            <TextField
              type="text"
              label="Email  address"
              placeholder="Enter email"
              customclass={styles.emailInputField}
              customclassInputType={styles.input}
              customclassContainer={styles.container}
              name="email"
              value={data.email}
              handelChange={handleChange("email")}
            />
            {errors.email && !loginError.message && (
              <div className={styles.error}>{errors.email}</div>
            )}
            <div className={styles.container}>
              <TextField
                type={show ? "text" : "password"}
                label="Password"
                placeholder="Password"
                customclass={styles.passwordInputField}
                customclassInputType={styles.input}
                customclassContainer={styles.container}
                name="password"
                value={data.password}
                handelChange={handleChange("password")}
              />
              {show ? (
                <SignInViewIcon
                  handleClick={() => handleShowHide(false)}
                  customClass={styles.viewIcon}
                />
              ) : (
                <ViewHideSigninIcon
                  handleClick={() => handleShowHide(true)}
                  customClass={styles.viewIcon}
                />
              )}
              {errors.password && !loginError.message && (
                <div className={styles.error}>{errors.password}</div>
              )}
            </div>
            <div className={styles.mainText}>
              <div className={styles.mainArea}>
                {/* <input type="checkbox" className={styles.checkbox1} /> */}
                {/* {localStorage.getItem("rPass")  */}

                {/* <input
        type="checkbox"
        id="checkbox"
        checked={remember}
        onChange={checkHandler}
      /> */}

                <input type="checkbox" className={styles.checkbox} />
                <span className={styles.rememberMe}>Remember Me</span>
              </div>
              <div>
                <span className={styles.password}>Forgot password?</span>
              </div>
            </div>
            <Divider customClass={styles.divider} />
            <Button
              title="Sign in"
              loader={loginError.type ? true : false}
              type="submit"
              customclass={styles.signinButton}
            />
          </form>
        </div>
      </div>
    </>
  );
};
export default connect(null, auth.actions)(SignIn);
