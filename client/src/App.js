import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Switch, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// keeping app.css below to override toast css
import './App.css';
import HomePage from './pages';
import CompanyProfile from './pages/profile/company.profile';
import UserProfile from './pages/profile/user.profile';
import CompanyLogin from './pages/login/company.login';
import UserLogin from './pages/login/user.login';
import CompanySignup from './pages/signup/company.signup';
import UserSignup from './pages/signup/user.signup';
import SingleJobPage from './pages/singleJobPage';
import setBaseUrl from './axios/set.base.url';
import { observer } from 'mobx-react';
import Searches from './pages/searches';

const App = observer(() => {
   const location = useLocation();

   useEffect(() => {
      setBaseUrl();
      // initial setting of token

      return () => {};
   }, []);

   useEffect(() => {
      window.scrollTo(0, 0);
      return () => {};
   }, [location]);

   return (
      <>
         <div className="App">
            <ToastContainer
               position="top-right"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
            />
            <AnimatePresence exitBeforeEnter initial={false}>
               <Switch location={location} key={location.pathname}>
                  <Route exact path="/">
                     <HomePage />
                  </Route>
                  <Route exact path="/login">
                     <UserLogin />
                  </Route>
                  <Route exact path="/signup">
                     <UserSignup />
                  </Route>
                  <Route path="/login/company">
                     <CompanyLogin />
                  </Route>
                  <Route path="/signup/company">
                     <CompanySignup />
                  </Route>
                  <Route path="/profile/company/:company_id">
                     <CompanyProfile />
                  </Route>
                  <Route path="/profile/user/:user_id">
                     <UserProfile />
                  </Route>
                  <Route path="/jobs/:job_id">
                     <SingleJobPage />
                  </Route>
                  <Route path="/search">
                     <Searches />
                  </Route>
                  <Route>
                     <div>
                        <h1>404</h1>
                        <p>Page Not Found</p>
                     </div>
                  </Route>
               </Switch>
            </AnimatePresence>
         </div>
      </>
   );
});

export default App;
