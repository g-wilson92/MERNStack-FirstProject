import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from "../logo.svg";

const Todo = props => (
    <div style={{ width: "30%",
                  float: "left",
                  paddingTop: 20}}>
        <img src={logo} width="100" height="100" alt="CodingTheSmartWay.com" />
        <h3 className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</h3>
        <p className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</p>
        <p className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</p>
        <p>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </p>
    </div>
)

export default class TodosList extends Component{
    constructor(props){
        super(props);
        this.state = {todos: []};
    }
    
    componentDidMount(){
        axios.get('http://localhost:4000/todos/')
            .then(response => {
            this.setState({ todos: response.data});
        }).catch(function(error){
            console.log(error);
        })
    }
    
    todoList(){
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }
    
    render(){
        return(
            <div>
                <h3>Todos List</h3>
                <div style={{ marginTop: 40,
                              display: "inline",
                              textAlign: "center",
                              paddingTop: 20}} >
                        { this.todoList() }
                </div>
            </div>
        )
    }
}