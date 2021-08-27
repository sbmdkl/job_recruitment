import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function JobCard({ job }) {
   return (
      <>
         <Card className="my-2 my-lg-1 my-xl-2 shadow-sm" style={{ maxWidth: 200 }}>
            <div className="d-flex justify-content-center">
               <img src="/company-logo.png" alt="img" style={{ maxHeight: 200, maxWidth: 190 }} />
            </div>
            <div className=" px-3 text-left">
               <h6>{job?.title ?? 'Job Title'}</h6>
               {/* <small className="d-block">
                  <i className="bx bx-building"></i> Job Company
               </small> */}
               <small className="d-block">
                  <i className="bx bx-map"></i> {job?.location ?? 'location'}
               </small>
               <small className="d-block">
                  <i className="bx bx-category-alt"></i> {job?.industry ?? 'industry'}
               </small>
               <small className="d-block">
                  <em>exp: </em>{' '}
                  {job?.seniority_level?.split(',').map((item, index) => (
                     <div key={index} className="badge text-light mr-1 bg-info">
                        {item}
                     </div>
                  ))}
               </small>
            </div>
            <div className="p-2">
               <Link to={`/jobs/${job?.id ?? job?._id}`}>
                  <Button className=" d-flex justify-content-center align-items-center" variant="primary" block>
                     <p style={{ marginBottom: 3 }}>view</p> <i className="ml-2 bx bx-arrow-to-right"></i>
                  </Button>
               </Link>
            </div>
         </Card>
      </>
   );
}

export default JobCard;
