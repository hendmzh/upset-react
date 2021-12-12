import React, { Component } from "react";
import { Form, Card, Table, Row, Col, Badge } from "react-bootstrap";
import { LineChart, Line, Legend, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';



const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const table = [
  { id: "1", Name: "Test1", Degree: "30" },

  { id: "2", Name: "Test2", Degree: "50" },
];


class ElementView extends Component {

  constructor() {
    super();
    this.state = {
      query: table
    };
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title as="h4">Element View</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col className="pr-1" md="12">
                <LineChart
                  width={250}
                  height={250}
                  data={this.props.query}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Degree" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="12">
                <label>Element queries:</label>
                <div>
                  <Badge>{this.props.query.length}</Badge>

                </div>
              </Col>
            </Row>
            <Row>
              <Col md="12">

                <label>Query result:</label>

                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      {
                        (typeof this.props.query[2] != 'undefined') ? 
                        (Object.keys(this.props.query[2]).map((val, index) => {
                          return (

                            <th>
                              {val}
                            </th>
                          )
                        })) : <td></td>
                      }
                    </tr>
                  </thead>

                  <tbody>
                    {
                      this.props.query.map((element) => {
                        if (typeof element !== 'undefined') {
                          return (
                            <tr>
                              {
                                Object.keys(element).map((val, index) => {
                                  return (
                                    <td>
                                      {element[val]}
                                    </td>

                                  )
                                })
                              }
                            </tr>
                          )
                        }
                      })

                    }
                  </tbody>
                </Table>

              </Col>
            </Row>

            <div className="clearfix"></div>
          </Form>
        </Card.Body>
      </Card>
    );
  }

}

export default ElementView;
