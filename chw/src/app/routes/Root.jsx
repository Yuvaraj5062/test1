import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "../../pages/login/Login";
import Main from "../../pages/main/Main";
import AuthRoutes from "../../component/auth-route/AuthRoute";
import { routeData } from "../../data/RouteData";
import { useSelector } from "react-redux";
import Error from "../../pages/error-page/Error";
const Root = () => {
  const path = useLocation().pathname;
  const { auth } = useSelector((state) => state);

  return (
    <>
      <Routes>
        <Route path="/not-found" element={<Error />} />
        <Route
          path="/"
          element={
            auth.user ? (
              auth.user.roleName === "ClinicalStaff" ? (
                <Navigate to="/patient/add-patient" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Login />
            )
          }
        // element={<Login />}
        />
        {/* element={auth.user ? <Navigate to="/dashboard" /> : <Login />} */}
        {/* <Route path="/" element={<Login />} /> */}
        <Route
          path="/*"
          element={
            <AuthRoutes path={path}>
              <Main>
                <Routes>
                  {routeData.map((item, index) => {
                    return (
                      <Route
                        path={item.path}
                        element={
                          <item.element>
                            <Routes>
                              {item.role.includes(auth.user.roleName) &&
                                item.children &&
                                item.children.map((childItem, id) => {
                                  return (
                                    <Route
                                      path={childItem.path}
                                      element={
                                        <childItem.element></childItem.element>
                                      }
                                      key={id}
                                    />
                                  );
                                })}
                              <Route path="*" element={<Navigate to="/not-found" />}></Route>
                            </Routes>
                          </item.element>
                        }
                        key={index}
                      />
                    );
                  })}
                  <Route path="*" element={<Navigate to="/not-found" />}></Route>
                </Routes>
              </Main>
            </AuthRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default Root;
