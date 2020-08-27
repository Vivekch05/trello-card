import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { Card, Form, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { submitCard } from '../actions/TrelloAction';
class CreateNewCard extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        cartBody: ""
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.submitCard(this.props.getTaskList,this.state,this.props.id);
        console.log(this.props.id);
    }
    handleReset = () => {
        this.setState(() => this.initialState);
    }

    render() {
        // console.log(this.props.id);
        return (
            <Card>
                {/* <Card.Header style={{ background: "linear-gradient(to right, #ff0000 50%, #ff3399 91%)", color: "white" }}><FontAwesomeIcon icon={faPlusSquare} />&nbsp;Edit Your Data</Card.Header> */}
                <Form onReset={this.handleReset} onSubmit={this.handleSubmit}>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridId">
                                <Form.Control as="textarea" rows="3" required autoComplete="off"
                                    type="text" name="cartBody"
                                    value={this.state.cartBody}
                                    onChange={this.handleChange}
                                    placeholder="Enter Your Card Name"
                                    className="bg-white text-black"
                                />
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{ textAlign: "right" }}>
                        <Button style={{ marginRight: "5px" }} size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave} />
                            &nbsp;Add Card
                        </Button>
                        <Button size="sm" variant="info" type="reset"><FontAwesomeIcon icon={faUndo} />
                            &nbsp;Reset Card
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        )
    }
}
const mapStateToProps = (state) => ({
    getTaskList: state.trelloItem.taskList,
    // getSeletcedDataList: state.dataItem.selectedDataList


});
export default connect(mapStateToProps, { submitCard })(CreateNewCard);
