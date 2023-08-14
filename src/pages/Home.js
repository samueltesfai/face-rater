import React, { useRef, useState } from 'react';
import { Container, Button, Form, Image as BootstrapImage, Row, Col, Navbar, Nav, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Home.css";
import { Link } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs-converter';




function Home() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const model = useRef(null);

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    const preprocessImage = async (imageSrc) => {
        // Create an HTMLImageElement from the source
        const img = new Image();
        img.src = imageSrc;

        await tf.nextFrame();  // Wait for the image to load

        let tensor = tf.browser.fromPixels(img)
            .resizeNearestNeighbor([224, 224])
            .toFloat();

        // Scale pixels between -1 and 1, sample-wise
        tensor = tensor.div(tf.scalar(127.5)).sub(tf.scalar(1.0)).expandDims();

        tensor.print(true);
        const tensorMean = tensor.mean();
        const tensorMax = tensor.max();
        const tensorMin = tensor.min();
        tensorMean.data().then(meanValue => console.log(`Mean: ${meanValue}`));
        tensorMax.data().then(maxValue => console.log(`Max: ${maxValue}`));
        tensorMin.data().then(minValue => console.log(`Min: ${minValue}`));


        return tensor;
    };

    const handleImageChange = (event) => {

        if (!event.target.files.length) {
            // No file was selected, just return
            return;
        }

        setError(null);

        setImage(event.target.files[0]);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);

        // Clear the result whenever a new file is uploaded
        setResult(null);
    };

    const handleSubmit = async () => {
        if (!image) {
            setError('Please select an image.');
            return;
        }

        setLoading(true); // Start loading


        const formData = new FormData();
        formData.append('file', image);

        //const url = 'https://5te9nx8fk1.execute-api.us-west-1.amazonaws.com';

        try {
            if (!model.current) {
                const MODEL_URL = `${process.env.PUBLIC_URL}/refinedjs_model2-1/model.json`;
                const loadedModel = await loadGraphModel(MODEL_URL);
                model.current = loadedModel;
                console.log("Model Loaded")
            }

            const prediction = preprocessImage(imagePreview).then(
                (preprocessedImage) => model.current.predict(preprocessedImage).dataSync()[0]
            )

            const score = (
                await Promise.all([
                    prediction,
                    sleep(5000)
                ])
            )[0];

            setResult(
                Math.round(100 * (1 + (9 * score))) / 100
            );
            setError(null);
        } catch (err) {
            console.error("Error making prediction:", err);
            setError('Error making prediction. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const LoadingOverlay = () => {
        const scanningStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '5px',
            background: 'rgba(0,255,0,0.8)',
            animation: 'scan 2s infinite',
            filter: 'blur(2px)'
        };

        const imageContainerStyle = {
            position: 'relative',
            width: '300px',
            height: '300px',
            backgroundImage: `url(${imagePreview})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden',
        };

        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.7)',
                zIndex: 999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                {imagePreview && (
                    <div style={imageContainerStyle}>
                        <div style={scanningStyle}></div>
                    </div>
                )}
                <div style={{ color: 'white', marginTop: '10px' }}>Scanning...</div>
            </div>
        );
    };


    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
            {loading && <LoadingOverlay />}
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
                <Row className="justify-content-center">
                    <Col md={6} className="text-center">

                        {/* Note to the user */}
                        <Alert variant="info">
                            For best results, please upload an image of just your face with a neutral facial expression.
                        </Alert>


                        {imagePreview ? (
                            <BootstrapImage src={imagePreview} alt="Uploaded Preview" thumbnail />
                        ) : (
                            <div style={{ border: "1px dashed gray", padding: "60px 0", fontSize: "16px" }}>
                                Upload an Image
                            </div>
                        )}

                        <Form.Group style={{ marginTop: '20px' }}>
                            <Form.Control type="file" id="imageUpload" onChange={handleImageChange} />
                        </Form.Group>

                        {result && (
                            <div style={{ fontSize: '20px', marginTop: '20px' }}>
                                Attractiveness Score: {result}
                            </div>
                        )}

                        {error && (
                            <Alert variant="danger" style={{ marginTop: '20px' }}>
                                {error}
                            </Alert>
                        )}

                        <Button variant="primary" block onClick={handleSubmit} style={{ marginTop: '20px' }}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
