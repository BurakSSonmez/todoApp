import React, { Component } from "react";
import TodoDataService from "../services/todo.service";

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getTodo = this.getTodo.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);

        this.state = {
            currentTodo: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getTodo(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function(prevState) {
            return {
                currentTodo: {
                    ...prevState.currentTodo,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentTodo: {
                ...prevState.currentTodo,
                description: description
            }
        }));
    }

    getTodo(id) {
        TodoDataService.get(id).then(response => {
            this.setState({
                currentTodo: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentTodo.id,
            title: this.state.currentTodo.title,
            description: this.state.currentTodo.description,
            published: status
        };

        TodoDataService.update(this.state.currentTodo.id, data).then(response => {
            this.setState(prevState => ({
                currentTodo: {
                    ...prevState.currentTodo,
                    published: status
                }
            }));
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    updateTodo() {
        TodoDataService.update(
            this.state.currentTodo.id,
            this.state.currentTodo
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "Basariyla guncellendi"
            });
        }).catch(e => {
            console.log(e)
        });
    }

    deleteTodo() {
        TodoDataService.delete(this.state.currentTodo.id).then(response => {
            console.log(response.data);
            this.props.history.push('/todoes')
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        const { currentTodo } = this.state;

        return (
            <div>
                { currentTodo ? (
                    <div className="edit-form">
                        <h4>Todo</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Baslik</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentTodo.title}
                                    onChange={this.onChangeTitle} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Aciklama</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentTodo.description}
                                    onChange={this.onChangeDescription} />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Durum: </strong>
                                </label>
                                {currentTodo.published ? " Yayinlandi " : " Bekliyor "}
                            </div>
                        </form>
                        {currentTodo.published ? (
                            <button className="badge badge-primary mr-2"
                                    onClick={() => this.updatePublished(false)}>Yayindan Kaldir</button>
                        ) : (
                            <button className="badge badge-primary mr-2"
                                    onClick={() => this.updatePublished(true)}>Yayinla</button>
                        )}
                        <button className="badge badge-danger mr-2"
                                onClick={this.deleteTodo}>Sil</button>
                        <button type="submit" className="badge badge-success" onClick={this.updateTodo}>Guncelle</button>
                        <p>{this.state.message}</p>
                        </div>        
                ) : (
                    <div>
                        <br />
                        <p>Lutfen ise tikla</p>
                    </div>    
                )}
            </div>
        );
    }
}