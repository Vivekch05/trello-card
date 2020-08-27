import { SUBMIT_TASK, GET_TASK, SUBMIT_CARD, DELETE_TASK,DELETE_CARD } from './Types';
import axios from 'axios';

export const getTask = () => (dispatch) => {
    axios.get("http://localhost:3000/tasks")
        .then((response) => {
            //console.log(response.data);
            dispatch({ type: GET_TASK, payload: response.data });
        })
}
export const submitTask = (state) => (dispatch) => {
    const taskData = {
        body: state.body,
        cartBody: []
    };
    console.log(taskData);
    axios.post(`http://localhost:3000/tasks`, taskData)
        .then((response) => {
            console.log(response);
            dispatch({ type: SUBMIT_TASK, payload: response.data });
        }, (error) => {
            console.log(error);
        });
}
export const submitCard = (totalTask, state, id) => (dispatch) => {
    console.log(totalTask);
    const filterData = totalTask.filter(item => item.id === id)
    console.log(filterData);
    const taskData = {
        id: '_' + Math.random().toString(36).substr(2, 9),
        body: state.cartBody
    };
    filterData[0].cartBody.push(taskData);
    const finalData = {
        id: id,
        body: filterData[0].body,
        cartBody: filterData[0].cartBody
    }
    console.log(finalData);
    axios.put(`http://localhost:3000/tasks/${id}`, finalData)
        .then((response) => {
            console.log(response);
            dispatch({ type: SUBMIT_CARD, payload: response.data });
        }, (error) => {
            console.log(error);
        });
}

export const deleteTask = (allData, e) => (dispatch) => {
    console.log(e.target.id);
    const filterData = allData.filter(item => item.id !== e.target.id);
    console.log(filterData);
    axios.delete(`http://localhost:3000/tasks/${e.target.id}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
            dispatch({ type: DELETE_TASK, payload: filterData });
        })
}


export const deleteCard = (allData, e) => (dispatch) => {
    console.log(e.target.name,e.target.id);
    const filterData = allData.filter(item => item.id === e.target.name);
    console.log(filterData);
    const filterCardData = filterData[0].cartBody.filter(item => item.id !== e.target.id)
    console.log(filterCardData);
    axios.delete(`http://localhost:3000/tasks/${e.target.id}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
            dispatch({ type: DELETE_CARD, payload: filterCardData });
        })
}

