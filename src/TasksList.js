import { Form, Card, Row, Col, Alert } from "react-bootstrap";


function TasksList() {
  return (
    <Card>
      <Card.Header>
        <Card.Title as="h4">Set Tasks</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col className="pr-1" md="12">
              <Form.Group>
                <div className="mb-3">

                  <label>Aggregate by:</label>

                  <Form.Select aria-label="Default select example">
                    <option value="1">Do not aggregate</option>
                    <option value="1">Degree</option>
                    <option value="2">Sets</option>
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="pr-1" md="12">
              <Form.Group>
                <label>Sort By:</label>
                <div key="sort-radio" className="mb-3">
                  <Form.Check
                    checked
                    type="radio"
                    id="sort-radio-degree"
                    label="degree"
                    name="radioButtonSet"
                  />

                  <Form.Check
                    type="radio"
                    label="cardinality"
                    id="sort-radio-cardinality"
                    name="radioButtonSet"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Form.Group>
                <div className="mb-3">

                  <Form.Check
                    checked
                    type="checkbox"
                    label="Hide Empty intersections?"
                    id="hide-empty-interesections"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <div className="mb-3">

                <label>Dataset information:</label>

                <Alert key="data-set-info" variant="info">
                  Name: "Social Graph"
                  <br />
                  Number of sets: 7
                  <br />
                  Attributes: 2
                  <br />
                  Elements: 628
                  <br />
                  Author: grouplens
                  <br />
                  <br />
                  <br />
                  Description:
                  "Social graph data for co-usage of multiple online social platforms. Each element is a person using one or multiple of the platforms (the sets)."
                </Alert>
              </div>
            </Col>
          </Row>
          <div className="clearfix"></div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default TasksList;
