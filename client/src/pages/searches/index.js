import axios from 'axios';
import parser from 'html-react-parser';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Dropdown, FormControl, InputGroup, Row, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { getDecoded, handleLogout } from '../../auth/auth.states';

function Searches() {
   const [input, setInput] = useState('');
   const [searchResults, setSearchResults] = useState();
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
         if (input.length > 0) {
            setIsLoading(true);
            axios
               .get('/es/search?q=' + input)
               .then((res) => {
                  console.log(res);
                  setSearchResults(res.data.data);
               })
               .catch((err) => {
                  console.log(err);
               })
               .finally(() => {
                  setIsLoading(false);
               });
         }
      }, 300);

      return () => clearTimeout(delayDebounceFn);
   }, [input]);

   //    const handleInputChange = (e) => {
   //       setInput(e.target.value);
   //       if (pageIndex > 0) {
   //          setPageIndex(0);
   //       }

   //       setIsLoading(true);
   //    };

   return (
      <>
         <ReactTooltip type="dark" className="p-1" />
         <div className="bg-light" style={{ minHeight: '100vh' }}>
            <Menu />
            <Container className="p-5">
               <p className="lead d-flex align-items-center">
                  <span className="mr-2">Search for Jobs and people</span>
                  {!!isLoading && (
                     <Spinner
                        className="text-muted"
                        animation="border"
                        role="status"
                        style={{ borderWidth: 3, height: 20, width: 20 }}>
                        <span className="sr-only">Loading...</span>
                     </Spinner>
                  )}
               </p>
               <InputGroup className="shadow-sm">
                  <FormControl
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="search"
                     size="lg"
                  />
                  <InputGroup.Append>
                     <Button size="lg" variant="success">
                        <i className="bx bx-search"></i>
                     </Button>
                  </InputGroup.Append>
               </InputGroup>

               {searchResults?.length <= 0 && (
                  <div className="p-5 my-3 bg-white border rounded text-muted shadow-sm">
                     <h5 className="lead">No Results Found</h5>
                  </div>
               )}
               {searchResults?.length > 0 && (
                  <div className="p-4 my-3 border rounded bg-white rounded shadow-sm">
                     <h5 className="mb-4 lead text-muted">Search Results ({searchResults.length})</h5>

                     {searchResults?.map((result, index) => {
                        if (index < 10) {
                           return (
                              <div key={result?.id ?? index}>
                                 <Row className=" flex-wrap align-items-center">
                                    <Col xs={4}>
                                       <span>{parser(result?.highlight?.title?.[0] ?? result?.source?.title)}</span>
                                    </Col>
                                    <Col xs={3}>
                                       <i className="mr-1 small bx bx-user"></i>
                                       <span>{parser(result?.highlight?.name?.[0] ?? result?.source?.name)}</span>
                                    </Col>
                                    <Col xs={4}>
                                       <i className="mr-1 small bx bx-mail-send"></i>
                                       <span>{parser(result?.highlight?.email?.[0] ?? result?.source?.email)}</span>
                                    </Col>
                                    <Col xs={1}>
                                       <Link to={'/profile/user/' + result?.id}>
                                          <Button variant="primary" data-tip="view profile">
                                             <i className="bx bxs-user"></i>
                                          </Button>
                                       </Link>
                                    </Col>
                                 </Row>
                                 <hr />
                              </div>
                           );
                        }
                        return <></>;
                     })}
                     {searchResults.length > 10 && (
                        <Button
                           className="d-flex align-items-center justify-content-center text-muted"
                           variant="light"
                           block>
                           <span>Show more</span> <i className={`ml-1 bx bxs-chevron-down`}></i>
                        </Button>
                     )}
                  </div>
               )}
            </Container>
         </div>
      </>
   );
}

export default Searches;

const Menu = () => {
   const history = useHistory();

   const goHome = () => {
      history.push('/');
   };

   const logout = () => {
      handleLogout();
      if (getDecoded()?.role === 'company') history.push('/login/company');
      else history.push('/login');
      return;
   };

   const visitProfile = () => {
      history.push(`/profile/${getDecoded()?.role}/${getDecoded()?.id}`);
   };
   return (
      <Dropdown style={{ position: 'absolute', top: 10, left: 10 }}>
         <Dropdown.Toggle id="dropdown-basic" variant="light">
            <i className=" bx bx-menu" style={{ fontSize: 24 }}></i>
         </Dropdown.Toggle>

         <Dropdown.Menu>
            {getDecoded()?.role === 'user' && (
               <Dropdown.Item onClick={() => goHome()}>
                  <Row className="align-items-center justify-content-center">
                     <Col sm={3}>
                        <i className="bx bx-home-alt"></i>
                     </Col>
                     <Col sm={9}>
                        <span>home</span>
                     </Col>
                  </Row>
               </Dropdown.Item>
            )}

            <Dropdown.Item onClick={() => visitProfile()}>
               <Row className="align-items-center justify-content-center">
                  <Col sm={3}>
                     <i className="bx bx-user"></i>
                  </Col>
                  <Col sm={9}>
                     <span>profile</span>
                  </Col>
               </Row>
            </Dropdown.Item>

            <Dropdown.Item onClick={() => logout()}>
               <Row className="align-items-center justify-content-center">
                  <Col sm={3}>
                     <i className="mr-2 bx bx-log-out"></i>
                  </Col>
                  <Col sm={9}>
                     <span>log out</span>
                  </Col>
               </Row>
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
};
