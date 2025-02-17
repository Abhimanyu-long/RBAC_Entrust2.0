import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/startlogin/Register";
import Login from "./components/startlogin/Login";
import { Dashboard } from "./Pages/Dashboard";
import { AuthProvider } from "../context/AuthContext";
import { VerifyEmail } from "./Pages/VerifyEmail";
import { UserAgreement } from "./components/useragreement/UserAgreement";
import { TermsAndCondition } from "./components/useragreement/TermsAndCondition";
import ForgotPassword from "./components/startlogin/ForgotPassword";
import Protected from "../services/Protected";
import Unauthorized from "./Pages/Unauthorized"; 
import "@fontsource/open-sans/400.css";
import SuccessCard from "./components/models/Success";
import { ReferralAgreement } from "./components/useragreement/ReferralAgreement";



function App() {
  // Listen for storage events to update sessionStorage
  useEffect(() => {
    const handleStorageEvent = (event) => {
      if (event.key === "sessionSync" && event.newValue) {
        const sessionData = JSON.parse(event.newValue);
        if (sessionData.token) {
          sessionStorage.setItem("token", sessionData.token);
        }
        if (sessionData.userData) {
          sessionStorage.setItem("user_data", sessionData.userData);
        }
      }
    };

    window.addEventListener("storage", handleStorageEvent);

    // Manual synchronization on load
    const sessionSyncData = localStorage.getItem("sessionSync");
    if (sessionSyncData) {
      const sessionData = JSON.parse(sessionSyncData);
      if (sessionData.token) {
        sessionStorage.setItem("token", sessionData.token);
      }
      if (sessionData.userData) {
        sessionStorage.setItem("user_data", sessionData.userData);
      }
    }

    return () => window.removeEventListener("storage", handleStorageEvent);
  }, []);

  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/useragreement" element={<UserAgreement />} />
        <Route path="/termsandcondition" element={<TermsAndCondition />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/referralagreement" element={<ReferralAgreement />} />
    
        {/* Unauthorized route */}
        <Route path="/not-authorized" element={<Unauthorized />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <Protected component={Dashboard} componentName="Dashboard" />
          }
        />

      </Routes>
    </AuthProvider>
  );
}

export default App;

  // this is latest code 

// import React, { Suspense } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import routesConfig from "./routes/routesConfig";
// import ProtectedRoute from "./routes/ProtectedRoute";

// const App = () => {
//   return (
//     <Router>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           {routesConfig.map(({ path, component: Component, allowedRoles }) => (
//             <Route key={path} path={path} element={<ProtectedRoute component={Component} componentName={path} />} />
//           ))}
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// };

// export default App;












// import React, { Suspense } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import routesConfig from "./routes/routesConfig";
// import ProtectedRoute from "./routes/ProtectedRoute";

// const App = () => {
//   // Simulate a logged-in user's role (replace this with your auth logic)
//   const userRole = "user"; // Example: "user", "admin", or "guest"

//   return (
//     <Router>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           {routesConfig.map(({ path, component: Component, allowedRoles }) => (
//             <Route
//               key={path}
//               path={path}
//               element={
//                 <ProtectedRoute
//                   component={Component}
//                   allowedRoles={allowedRoles}
//                   userRole={userRole}
//                 />
//               }
//             />
//           ))}
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// };

// export default App;




// services/
//   authService.js
//   roleService.js
// routes/
//   routesConfig.js
//   ProtectedRoute.js
// App.js



// routesConfig.js
// const routesConfig = [
//   {
//     path: "/dashboard",
//     component: () => import("../pages/Dashboard"),
//     allowedRoles: ["admin", "user"],
//   },
//   {
//     path: "/admin",
//     component: () => import("../pages/Admin"),
//     allowedRoles: ["admin"],
//   },
//   {
//     path: "/profile",
//     component: () => import("../pages/Profile"),
//     allowedRoles: ["user", "admin"],
//   },
//   {
//     path: "/login",
//     component: () => import("../pages/Login"),
//     allowedRoles: ["guest"],
//   },
// ];

// export default routesConfig;


// ProtectedRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";
// import authService from "../services/authService";
// import roleService from "../services/roleService";

// const ProtectedRoute = ({ component: Component, allowedRoles }) => {
//   const user = authService.getCurrentUser();

//   if (!roleService.hasRole(user, allowedRoles)) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Component />;
// };

// export default ProtectedRoute;



// import React, { Suspense } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import routesConfig from "./routes/routesConfig";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import authService from "./services/authService";

// const App = () => {
//   // Example user (replace with real login logic)
//   React.useEffect(() => {
//     const mockUser = { name: "John Doe", roles: ["user"] };
//     authService.login(mockUser);
//   }, []);

//   return (
//     <Router>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           {routesConfig.map(({ path, component: Component, allowedRoles }) => (
//             <Route
//               key={path}
//               path={path}
//               element={
//                 <ProtectedRoute
//                   component={Component}
//                   allowedRoles={allowedRoles}
//                 />
//               }
//             />
//           ))}
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// };

// export default App;




// import { roleConfig } from './roleConfig'; // Adjust the import path as needed

// const roleService = {
//   /**
//    * Check if the user has any of the required roles for a feature or page.
//    * @param {Object} user - The current user object.
//    * @param {string} feature - The feature or page to check (key from roleConfig).
//    * @returns {boolean} - True if the user has access, false otherwise.
//    */
//   hasAccess: (user, feature) => {
//     if (!user || !user.roles) return false;
//     const allowedRoles = roleConfig[feature];
//     if (!allowedRoles) {
//       console.warn(`Feature "${feature}" is not defined in roleConfig.`);
//       return false;
//     }
//     return allowedRoles.some((role) => user.roles.includes(role));
//   },
// };

// export default roleService;









// help me to do 

// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { roleConfig } from './roleConfig'
// import { jwtDecode } from 'jwt-decode';

// const Protected = ({ component: Component, componentName }) => {
//   const { isAuthenticated, userdetails } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");

//     if (token) {
//       const decodedToken = jwtDecode(token);
//       const currentTime = Math.floor(Date.now() / 1000);
//       const timeLeftInSeconds = decodedToken.exp - currentTime;

//       if (timeLeftInSeconds <= 0) {
//         // Token is expired
//         navigate("/login");
//         return;
//       }

//       // Fetch allowed roles for the component from the config
//       const allowedRoles = roleConfig[componentName] || [];
      
//       // Retrieve roles either from userdetails or sessionStorage
//       const userRoles = userdetails?.roles?.map((role) => role.role_name) || JSON.parse(sessionStorage.getItem("roles"))?.map((role) => role.role_name) || [];
      
//       // Check if the user has access
//       const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

//       if (!hasAccess) {
//         // Redirect to a not authorized page if the user does not have the required role
//         navigate("/not-authorized");
//       }
//     } else {
//       // No token found
//       navigate("/login");
//     }
//   }, [navigate, componentName, userdetails]);

//   if (isAuthenticated) {
//     return <Component />;
//   }

//   return null;
// };

// export default Protected;

// const roleConfig = {
//     Dashboard: ['administrator', 'Client Admin', 'Anonymous User'],
//     ActiveTimer: ['administrator', 'Client Admin', 'Anonymous User'],
//     AddClientUser: ['administrator', 'Client Admin', 'Anonymous User'],
//     AddFund: ['administrator', 'Client Admin', 'Anonymous User'],
//     DefaultGroup: ['administrator', 'Client Admin', 'Anonymous User'],
//     AllocateCase: ['administrator', 'Client Admin', 'Anonymous User'],
//     AddUser: ['administrator', 'Client Admin', 'Anonymous User'],
//     ReviewInvoice: ['administrator', 'Client Admin', 'Anonymous User'],
//     BasicFilterDemo: ['administrator', 'Client Admin', 'Anonymous User'],
//     AutoChargeHistory: ['administrator', 'Client Admin', 'Anonymous User'],
//     ProjectTrackerRecord: ['administrator', 'Client Admin', 'Anonymous User'],
//     FullCalendar: ['administrator', 'Client Admin', 'Anonymous User'],
//   };

// const roleService = {
//   /**
//    * Check if the user has any of the required roles for a feature or page.
//    * @param {Object} user - The current user object.
//    * @param {string} feature - The feature or page to check (key from roleConfig).
//    * @returns {boolean} - True if the user has access, false otherwise.
//    */
//   hasAccess: (user, feature) => {
//     if (!user || !user.roles) return false;
//     const allowedRoles = roleConfig[feature];
//     if (!allowedRoles) {
//       console.warn(`Feature "${feature}" is not defined in roleConfig.`);
//       return false;
//     }
//     return allowedRoles.some((role) => user.roles.includes(role));
//   },
// };

// export default roleService;

// how i will update my code 
// Protected component



