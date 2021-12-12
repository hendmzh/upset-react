import { Navbar, Container, Form, Row, Col } from "react-bootstrap";


function Header() {
  return (
    <Container fluid>
    <Navbar bg="light" expand="lg">
    <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Navbar.Brand
            className="mr-2"
          >
            Simple Implementation of Upset: A tool for visualizing intersecting sets
          </Navbar.Brand>
        </div>
        </Container>
    </Navbar>

    <Row className="justify-content-md-center">
    <Col xs lg="3">
    <Form>
<Form.Group controlId="formFile" className="mb-3">
<Form.Label>Select a dataset:</Form.Label>
<Form.Select aria-label="Default select example">
<option value="1">Social Graphs</option>
  <option value="2">Simpsons Characters</option>
</Form.Select></Form.Group>
</Form>
    </Col>
    <Col xs lg="3">
    <Form>
<Form.Group controlId="formFile" className="mb-3">
<Form.Label>Or Upload your dataset as a JSON file:</Form.Label>
<Form.Control type="file" />
</Form.Group>
</Form>
    </Col>


  </Row>
    </Container>
  );
}

export default Header;
