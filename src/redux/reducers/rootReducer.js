import { combineReducers } from "redux";
import ToDoListReducer from './ToDoListReducer';

const rootReducer = combineReducers({
    ToDoListReducer,
});

export default rootReducer;