import React from 'react';
import { Navbar, Container, Row, Col, Nav, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/About.css";

function About() {
    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Face Rater</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container style={{ marginTop: '50px', maxWidth: '900px', background: '#fff', padding: '30px', borderRadius: '8px' }}>
                <Row className="justify-content-center mb-5">
                    <Col md={10} className="text-center">
                        <h1>About This Project</h1>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md={10} className="text-left">
                        <h3>Model Development Process</h3>
                        <p>
                            The heart of this application lies in its advanced model, which employs the ResNet architecture, specifically ResNet50V2, as a feature extractor. Through the integration of Bayesian optimization, hyperparameters were meticulously tuned to achieve the best possible model performance.
                        </p>
                        <p>
                            The model's training dataset is derived from the <a href='https://www.chicagofaces.org/'> Chicago Face Database (CFD)</a>, encompassing images of 597 unique individuals from various ethnic backgrounds. Notably, each model showcases neutral facial expressions. The test results of the model were impressive, with a minor deviation of just 0.83% on average.
                        </p>
                        <p>
                            <span style={{ fontWeight: 'bold', color: 'red', backgroundColor: 'yellow' }}>Note:</span> While our model showcases remarkable results, the scores shouldn't be taken too seriously. The model was trained on a relatively modest dataset and the labels came from an average of about 30 participants' views— at best, the model is predicting how this specific group of people might rate you. Futhermore, attractiveness is inherently subjective and varies between cultures, societies, and individuals. Therefore it is misleading to train a machine learning model to quantify attractiveness, which essentially is generalizing a subjective concept. This project aims to intrigue and demonstrate the power of computer vision in deep learning, rather than deliver objective results.
                        </p>

                        <h3>Application Architecture</h3>
                        <p>
                            Previously, the application employed a back-end framework engineered using Flask for the core computation of generating the face rating score. This was seamlessly deployed and connected to the front-end using AWS Elastic Beanstalk and API Gateway. The API Gateway served as a bridge to facilitate the communication between the React-based front-end and the Flask-powered back-end. However, to enhance security and performance, we transitioned to leveraging TensorFlow.js on the client side, eliminating the need for the aforementioned back-end architecture. Now, all processing happens directly in the user's browser, ensuring improved security and faster response times. On the front-end, React and Bootstrap continue to offer users an interactive and responsive experience, hosted on GitHub pages.
                        </p>


                        <h3>Contact Information</h3>
                        <p>If you find this project intriguing or have any queries, you're welcome to reach out:</p>
                        <ListGroup horizontal className="justify-content-center">
                            <ListGroup.Item className='link-li'>
                                <img src={`${process.env.PUBLIC_URL}/icons/github.png`} alt='github' width="20" height="20" />
                                &nbsp;
                                <a href="https://github.com/samueltesfai" target="_blank" rel="noreferrer">GitHub</a>
                            </ListGroup.Item>
                            <ListGroup.Item className='link-li'>
                                <img src={`${process.env.PUBLIC_URL}/icons/linkedin.png`} alt='linkedin' width="20" height="20" />
                                &nbsp;
                                <a href="https://www.linkedin.com/in/samuel-tesfai-940b72197/" target="_blank" rel="noreferrer">LinkedIn</a>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default About;
