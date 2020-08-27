import React, { Component } from 'react'
import { Button, Modal, Row, Col, Card, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CreateNewTask from './CreateNewTask';
import { connect } from 'react-redux';
import { getTask, deleteTask } from '../actions/TrelloAction';
import CreateNewCard from './CreateNewCard';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            view: false,
            parentId: "",
            childId: ""
        }
    }
    componentDidMount() {
        this.props.getTask();
    }
    handleShow = () => {
        this.setState({ show: true })
    }
    handleView = (e) => {
        this.setState((prevState) =>
            ({ view: !prevState.view })
        );
        this.setState({ childId: e.target.id });
        // console.log(e.target.id);
    }

    handleClose = () => {
        this.setState({ show: false });
    }
    handleCloseView = () => {
        this.setState({ view: false });
    }
    handleTaskDelete = (e) => {
        this.props.deleteTask(this.props.getTaskList, e);
        console.log(e.target)
    }
    handleCardDelete = (e) => {
        // this.props.deleteCard(this.props.getTaskList, e);
        console.log(e.target.name, e.target.id);
    }
    render() {
        return (
            <div className="container jumbotron">
                <Button style={{ marginRight: "5px" }} size="sm" variant="success" onClick={this.handleShow}>
                    <FontAwesomeIcon icon={faPlusSquare} name="task" />&nbsp;New Task
                </Button>
                <Row style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", margin: "30px 0 0 10px" }}>
                    {
                        this.props.getTaskList.length !== 0 ?
                            <>
                                {
                                    this.props.getTaskList.map((parrentItem) => {
                                        // console.log(parrentItem.id);
                                        return (

                                            <Col sm={4} style={{ padding: "10px" }}>
                                                <Card style={{ width: '18rem' }}>
                                                    <Button style={{ margin: "5px 5px 0 230px" }} size="lg" variant="" id={parrentItem.id} onClick={this.handleTaskDelete}>
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </Button>
                                                    <Card.Body>

                                                        <Card.Title style={{ backgroundColor: "grey", color: "white", textAlign: "center", padding: "10px" }}>{parrentItem.body}</Card.Title>

                                                        {
                                                            parrentItem.cartBody.map((item2) => {
                                                                return (
                                                                    <>
                                                                        <ListGroup.Item action variant="light" class="list-item" style={{ margin: "5px" }}>
                                                                            <p style={{ color: "black" }}>{item2.body}</p>
                                                                            <div style={{ float: "right" }}>
                                                                                <Button variant="" size="sm" id={item2.id} name={parrentItem.id} onClick={this.handleCardDelete}>
                                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                                </Button>
                                                                            </div>
                                                                        </ListGroup.Item>

                                                                    </>
                                                                )
                                                            })
                                                        }

                                                        <Button style={{ margin: "5px" }} size="sm" variant="primary" id={parrentItem.id} onClick={this.handleView}>
                                                            <FontAwesomeIcon icon={faPlusSquare} />&nbsp;Add New Card
                                            </Button>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    })
                                }
                            </>: " "
    }
                </Row>


                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateNewTask />
                    </Modal.Body>
                </Modal>


                <Modal show={this.state.view} onHide={this.handleCloseView}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateNewCard id={this.state.childId} />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    getTaskList: state.trelloItem.taskList,
    // getCardList: state.trelloItem.cardList,
    // getSeletcedDataList: state.dataItem.selectedDataList


});
export default connect(mapStateToProps, { getTask, deleteTask })(LandingPage);

