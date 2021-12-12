import React, { Component } from "react";
import { Card, Table, Badge, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as solidCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as lightCircle } from '@fortawesome/free-regular-svg-icons'


class Matrix extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            sets: [],
            matrix: [[]],
            elements: [],
            inersections_cardinality: {},
            inersections_elements: {},
            max_cardinality: 0,
        };

        this.selectRow = this.selectRow.bind(this);

    }

    selectRow(val){
        this.props.sendData(val);
      }

    render() {
        return (

            <Card>
                <Card.Body>
                    <Table className="table-hover">
                        <thead>
                            <tr>
                                {this.props.sets.map((object, i) => <td style={{ textAlign: 'center', fontSize: '15px'}} ><Badge   bg="success" >{object}</Badge></td>)}
                                <th style={{ backgroundColor: 'white', color: 'white', textAlign: 'left' }} className="border-0"> </th>
                                <th style={{ backgroundColor: 'gray', color: 'white', textAlign: 'left' }} className="border-0"> Cardinality </th>
                            </tr>
                        </thead>
                        <tbody>

                            {

                                Object.keys(this.props.inersections_cardinality).map((val, index) => {
                                    if(this.props.inersections_cardinality[val] !== 0){
                                    return (

                                        <tr>
                                            {Array.from(val, (e, i) => {
                                                return <td style={{ width: '3%', textAlign: 'left' }}><FontAwesomeIcon style={{ color: 'gray' }} icon={e.valueOf() === "1".valueOf() ? solidCircle : lightCircle} /></td>
                                            })}
                                            <td></td>

                                            <td className="text-muted" style={{ textAlign: 'left', fontSize: '15px'}}><Badge bg="secondary" style={{ width: getWidth(this.props.inersections_cardinality[val], this.props.max_cardinality) }} onClick={() => this.selectRow(val)}> </Badge>{this.props.inersections_cardinality[val]}</td>

                                        </tr>

                                    )}
                                })

                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        );
    }
}


const getWidth = function(car, max_car) {
    return (car/max_car * 40.0)+"%";
}

export default Matrix;