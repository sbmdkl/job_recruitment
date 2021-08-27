import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
   width: 100%;
   background-color: #343a40;
   padding: 40px 0px;
   border-top-left-radius: 10%;
   border-top-right-radius: 10%;
   text-align: center;
`;

function Footer() {
   return (
      <FooterContainer>
         <span className="small text-light">Copyright ©2021 All rights reserved</span>
      </FooterContainer>
   );
}

export default Footer;
