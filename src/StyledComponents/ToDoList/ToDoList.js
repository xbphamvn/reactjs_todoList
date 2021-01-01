import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Container } from '../Components/Container';
import { Dropdown } from '../Components/Dropdown';
import { Heading2, Heading3 } from '../Components/Heading';
import { TextField } from '../Components/TextField';
import { Button } from '../Components/Button';
import { Table, Thead, Th, Tr } from '../Components/Table';
import { connect } from 'react-redux';
import { addTaskAction, deleteTaskAction, editTaskAction, handleThemeAction, markDoneTaskAction, updateTaskAction } from '../../redux/actions/ToDoListActions';
import { themesArr } from '../Themes/ThemeManager';

class ToDoList extends Component {

    state = {
        taskDesc: ''
    }

    renderToDoList = () => {
        return this.props.toDoTaskArr.filter(task => !task.done).map((task, index) => {
            return (
                <Tr key={index}>
                    <Th style={{ verticalAlign: 'middle' }}>{task.taskDesc}</Th>
                    <Th className="text-right">
                        <Button className="ml-1 btn-sm" value={task.id} onClick={(e) => { this.props.dispatch(editTaskAction(e.currentTarget.value)) }}><i className="fa fa-edit"></i></Button>
                        <Button className="ml-1 btn-sm" value={task.id} onClick={(e) => { this.props.dispatch(markDoneTaskAction(e.currentTarget.value)) }}><i className="fa fa-check"></i></Button>
                        <Button className="ml-1 btn-sm" value={task.id} onClick={(e) => { this.props.dispatch(deleteTaskAction(e.currentTarget.value)) }}><i className="fa fa-trash"></i></Button>
                    </Th>
                </Tr>
            );
        });
    }

    renderDoneList = () => {
        return this.props.toDoTaskArr.filter(task => task.done).map((task, index) => {
            return (
                <Tr key={index}>
                    <Th style={{ verticalAlign: 'middle' }}>{task.taskDesc}</Th>
                    <Th className="text-right">
                        <Button className="ml-1 btn-sm" value={task.id} onClick={(e) => { this.props.dispatch(deleteTaskAction(e.currentTarget.value)) }}><i className="fa fa-trash"></i></Button>
                    </Th>
                </Tr>
            );
        });
    }

    renderThemesArr = () => {
        return themesArr.map((theme, index) => {
            return (
                <option key={index} value={theme.id}>{theme.name}</option>
            );
        });
    }

    render() {
        return (
            <ThemeProvider theme={this.props.currentTheme}>
                <Container className="w-50">
                    <Dropdown onChange={(e) => { this.props.dispatch(handleThemeAction(e.target.value)) }}>
                        {this.renderThemesArr()}
                    </Dropdown>
                    <hr />
                    <Heading2>To do list</Heading2>
                    <hr />
                    <TextField label="Task name" className="w-50" name="taskDesc" value={this.state.taskDesc} onChange={(e) => { this.setState({ taskDesc: e.target.value }) }} />
                    <Button onClick={() => { this.props.dispatch(addTaskAction(this.state.taskDesc)) }} className="ml-2"><i className="fa fa-plus"></i> Add task</Button>
                    <Button onClick={() => { this.props.dispatch(updateTaskAction(this.state.taskDesc)) }} className="ml-2"><i className="fa fa-sync-alt"></i> Update task</Button>
                    <hr />
                    <Heading3>Task to do</Heading3>
                    <Table>
                        <Thead>
                            {this.renderToDoList()}
                        </Thead>
                    </Table>
                    <hr />
                    <Heading3>Task completed</Heading3>
                    <Table>
                        <Thead>
                            {this.renderDoneList()}
                        </Thead>
                    </Table>
                </Container>
            </ThemeProvider>
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.updateObj.id !== this.props.updateObj.id) {
            this.setState({
                taskDesc: this.props.updateObj.taskDesc
            });
        }
    }
}

const mapStateToProps = state => {
    return {
        currentTheme: state.ToDoListReducer.currentTheme,
        toDoTaskArr: state.ToDoListReducer.toDoTaskArr,
        updateObj: state.ToDoListReducer.updateObj
    }
}

export default connect(mapStateToProps)(ToDoList);