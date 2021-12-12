import React, { Component } from "react";
import TasksList from './TasksList';
import ElementView from './ElementVisualization';
import { Container, Col, Row } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Matrix from './Matrix';
import Papa from 'papaparse';


var sets = [];
var data = [];
var matrix = [[]];
var elements = []
var inersections_cardinality = {}
var inersections_elements = {}
var max_cardinality = 0;
var attributes_matrix = [];

class Upset extends Component {

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
            attributes_matrix: [],
            query: [],
        };

        this.getElementView = this.getElementView.bind(this);

    }

    async componentDidMount() {
        const _ = await GetData();
        var query = GetAttributesOfIntersection("100000")
        this.setState({
            data: data,
            sets: sets,
            matrix: matrix,
            elements: elements,
            inersections_cardinality: inersections_cardinality,
            inersections_elements: inersections_elements,
            max_cardinality: max_cardinality,
            attributes_matrix: attributes_matrix,
            query: query,
        });
    }

    getElementView(val){
        var newElements = GetAttributesOfIntersection(val)
        console.log(newElements)
        console.log("newElements")

        this.setState({
            query: newElements,
        });
    }

    render() {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md="2">
                            <TasksList />

                        </Col>

                        <Col md="8">
                            <Matrix

                                data={this.state.data}
                                sets={this.state.sets}
                                matrix={this.state.matrix}
                                elements={this.state.elements}
                                inersections_cardinality={this.state.inersections_cardinality}
                                inersections_elements={this.state.inersections_elements}
                                max_cardinality={this.state.max_cardinality}
                                sendData={this.getElementView}
                            />

                        </Col>
                        <Col md="2">

                            <ElementView 
                            query = {this.state.query}
                            />

                        </Col>
                    </Row>
                </Container>
            </>

        );
    }
}


async function GetData() {
    data = Papa.parse(await fetchCsv());
    sets = data.data[0].slice(1, 7)
    matrix = data.data.slice(1).map(function (row) { return row.slice(1, 7); });
    elements = data.data.slice(1).map(function (row) { return row.slice(0, 1); });
    inersections_cardinality = generateEmptyIntersections(sets.length)

    inersections_cardinality = CalculateIntersections(inersections_cardinality, matrix)
    attributes_matrix = GetAttributes(data.data)
}

function generateEmptyIntersections(n) {
    var states = [];

    // Convert to decimal
    var maxDecimal = parseInt("1".repeat(n), 2);

    // For every number between 0->decimal
    for (var i = 0; i <= maxDecimal; i++) {
        // Convert to binary, pad with 0, and add to final results
        states.push(i.toString(2).padStart(n, '0'));
    }
    //initializing all intersection values to 0 (cardinality)
    var hash = {};
    for (i = 0; i <= maxDecimal; i++) {
        hash[states[i]] = 0
    }

    return hash;
}

function CalculateIntersections(intersects, data_matrix) {
    var cardinality = 0
    var str = ""
    var com_elements = []


    for (var comb in intersects) {
        cardinality = 0
        com_elements = []

        for (var i = 0; i < data_matrix.length; i++) {
            str = data_matrix[i].join("");
            if (str.valueOf() === comb.valueOf()) {
                cardinality++;
                com_elements.push(elements[i])
            }
        }
        intersects[comb] = cardinality;
        inersections_elements[comb] = com_elements
        if (cardinality > max_cardinality) {
            max_cardinality = cardinality;
        }
    }
    return intersects;
}

function GetAttributes(full_data) {

    var attribute_list = []

    attribute_list.push(full_data[0][0]);
    attribute_list.push(full_data[0][8]);

    var attribute_columns = []

    var col0 = full_data.map(d => d[0]);
    var col8 = full_data.map(d => d[8]);

    attribute_columns.push(col0)
    attribute_columns.push(col8)

    var attrs = []

    for (var i = 1; i < col0.length; i++) {
        var obj = {}
        for (var j=0; j < attribute_list.length; j++) {
            obj[attribute_list[j]] = attribute_columns[j][i]
        }
        attrs.push(obj)
    }
    return attrs;
}


function GetAttributesOfIntersection(intersection_id) {

    var element_intersection = [{}]
    for(var j =0; j < inersections_elements[intersection_id].length; j++){
        for(var i = 0; i< attributes_matrix.length;  i++){
            if(attributes_matrix[i].Name.valueOf() === inersections_elements[intersection_id][j][0].valueOf()){
                element_intersection.push(attributes_matrix[i])
                break
            }
        }
    }
    return element_intersection.slice(1);
}

async function fetchCsv() {
    const response = await fetch('data/socialgraph/socialgraph.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    return csv;
}

export default Upset;
