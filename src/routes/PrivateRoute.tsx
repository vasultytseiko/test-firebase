import React, { ReactNode, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SignIn from "../pages/SignIn/SignIn";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const auth = getAuth(); // get the Firebase Auth
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // update the state to authenticated
        setIsAuthenticated(true);
      } else {
        //navigate to the SignIn page
        setIsAuthenticated(false);
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
