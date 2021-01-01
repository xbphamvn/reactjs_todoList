import { handle_theme_opt, add_task_btn, del_task_btn, mark_done_btn, edit_task_btn, update_task_btn } from "../types/ToDoListType";

export const handleThemeAction = (themeID) => (
    {
        type: handle_theme_opt,
        themeID
    }
)

export const addTaskAction = (taskDesc) => (
     {
        type: add_task_btn,
        taskDesc
    }
)

export const updateTaskAction = (taskDesc) => (
     {
        type: update_task_btn,
        taskDesc
    }
)

export const editTaskAction = (editTaskId) => (
    {
        type: edit_task_btn,
        editTaskId
    }
)

export const markDoneTaskAction = (doneTaskId) => (
    {
        type: mark_done_btn,
        doneTaskId
    }
)

export const deleteTaskAction = (delTaskId) => (
    {
        type: del_task_btn,
        delTaskId
    }
)