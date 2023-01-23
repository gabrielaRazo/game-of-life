import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './footer.css';

const Footer = () => {
  return (
    <>
      <hr />
      <Container>
        <Row>
          <Col
            lg={{ span: 11, offset: 3 }}
            md={{ span: 11, offset: 1 }}
            xs={{ span: 11, offset: 1 }}
          >
            <p className="footer">
              Build with React JS by Gabriela Razo Roldán 2023
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
