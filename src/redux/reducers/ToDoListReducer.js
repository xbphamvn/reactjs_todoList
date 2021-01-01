import { themesArr } from '../../StyledComponents/Themes/ThemeManager';
import { add_task_btn, del_task_btn, handle_theme_opt, mark_done_btn, edit_task_btn, update_task_btn } from '../types/ToDoListType';

const defaultReducer = {
    currentTheme: themesArr[1].themeObj,
    toDoTaskArr: [
        { id: 'task-1', taskDesc: 'Fix bug 1', done: true },
        { id: 'task-2', taskDesc: 'Fix bug 2', done: false },
        { id: 'task-3', taskDesc: 'Fix bug 3', done: true },
        { id: 'task-4', taskDesc: 'Fix bug 4', done: false }
    ],
    updateObj: {}
}

const ToDoListReducer = (state = defaultReducer, action) => {
    switch (action.type) {
        case handle_theme_opt:
            return { ...state, currentTheme: themesArr[--action.themeID].themeObj };

        case add_task_btn:
            if (action.taskDesc.trim() === '') {
                alert('Task name is required!');
                return { ...state };
            }
            let index = state.toDoTaskArr.findIndex(task => task.taskDesc.toLowerCase() === action.taskDesc.trim().toLowerCase());
            if (index !== -1) {
                alert('Task is already exited!');
                return { ...state };
            }
            return { ...state, toDoTaskArr: [...state.toDoTaskArr, { id: Date.now(), taskDesc: action.taskDesc, done: false }] };

        case update_task_btn:
            if (action.taskDesc.trim() === '') {
                alert('Task name is required!');
                return { ...state };
            }
            let updateIndex = state.toDoTaskArr.findIndex(task => task.taskDesc.toLowerCase() === action.taskDesc.trim().toLowerCase());
            if (updateIndex !== -1) {
                alert('Nothing changed!');
                return { ...state };
            }
            state.updateObj.taskDesc = action.taskDesc;
            for (let task in state.toDoTaskArr) {
                if (task.id === state.updateObj.id) {
                    task = state.updateObj;
                }
            }
            return { ...state, toDoTaskArr: [...state.toDoTaskArr] };

        case edit_task_btn:
            let taskEdit = state.toDoTaskArr.find(task => task.id.toString() === action.editTaskId);
            return { ...state, updateObj: taskEdit };

        case mark_done_btn:
            let doneTask = state.toDoTaskArr.find(task => task.id.toString() === action.doneTaskId);
            if (doneTask) {
                doneTask.done = true;
            }
            // console.log(state.toDoTaskArr);
            // state.toDoTaskArr = [...state.toDoTaskArr];
            return { ...state, toDoTaskArr: [...state.toDoTaskArr] };

        case del_task_btn:
            // let delTaskIndex = state.toDoTaskArr.findIndex(task => task.id === action.delTaskID);
            // state.toDoTaskArr.splice(delTaskIndex, 1);
            // state.toDoTaskArr = state.toDoTaskArr.filter(task => task.id !== action.delTaskId);
            // state.toDoTaskArr = [...state.toDoTaskArr];
            return { ...state, toDoTaskArr: state.toDoTaskArr.filter(task => task.id.toString() !== action.delTaskId) };
        default:
            return { ...state };
    }
}

export default ToDoListReducer;
