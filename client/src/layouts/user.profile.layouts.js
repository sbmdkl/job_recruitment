import { motion } from 'framer-motion';
import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import NavbarComponent from './components/Navbar';

function UserLayouts(props) {
   const { page } = props;

   return (
      <>
         <NavbarComponent page={page} />
         <Container>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}>
               <>{props.children}</>
            </motion.div>
         </Container>
         <Footer />
      </>
   );
}

export default UserLayouts;
