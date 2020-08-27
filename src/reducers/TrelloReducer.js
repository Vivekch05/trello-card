import { GET_TASK, SUBMIT_TASK, SUBMIT_CARD, DELETE_TASK, DELETE_CARD } from "../actions/Types";

const initState = {
    taskList: [],
    cardList: [],
    selectedDataList: [],
    taskList1:[]
};
export default function (state = initState, action) {
    switch (action.type) {
        case GET_TASK:
            return {
                ...state,
                taskList: action.payload,
            };
        case SUBMIT_TASK:
            return {
                ...state,
                taskList: [...state.taskList, action.payload]
            };
        case SUBMIT_CARD:
            return {
                ...state,
                cardList: [...state.cardList, action.payload]
            };
        case DELETE_TASK:
            return {
                ...state,
                taskList: action.payload
            };
        case DELETE_CARD:
            return {
                ...state,
                taskList1: action.payload
            };
        // case SELECTED_DATA:
        // return {
        //     ...state,
        //     selectedDataList: action.payload
        // };
        default:
            return state;
    }
}