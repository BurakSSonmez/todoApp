import React, { Component } from "react";
import TodoDataService from "../services/todo.service";
import { Link } from "react-router-dom";

export default class TodoesList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTodoes = this.retrieveTodoes.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTodo = this.setActiveTodo.bind(this);
        this.removeAllTodoes = this.removeAllTodoes.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            todoes: [],
            currentTodo: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveTodoes();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveTodoes() {
        TodoDataService.getAll().then(response => {
            this.setState({
                todoes: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveTodoes();
        this.setState({
            currentTodo: null,
            currentIndex: -1
        });
    }

    setActiveTodo(todo, index) {
        this.setState({
            currentTodo: todo,
            currentIndex: index
        });
    }

    removeAllTodoes() {
        TodoDataService.deleteAll().then(response => {
            console.log(response.data);
            this.refreshList();
        }).catch(e => {
            console.log(e);
        });
    }

    searchTitle() {
        TodoDataService.findByTitle(this.state.searchTitle).then(response => {
            this.setState({
                todoes: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        const { searchTitle, todoes, currentTodo, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Basliga göre ara"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle} />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}>Ara</button>    
                        </div>    
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Yapilacaklar Listesi</h4>
                    <ul className="list-group">
                        {todoes && todoes.map((todo, index) => (
                            <li className={"list-group-item" + (index === currentIndex ? "acive" : "")}
                                onClick={() => this.setActiveTodo(todo, index)} key={index} >
                                {todo.title}
                            </li>    
                        ))}
                    </ul>

                    <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllTodoes}>Hepsini Kaldir</button>
                </div>
                <div className="col-md-6">
                    {currentTodo ? (
                        <div>
                            <h4>Yapilacak</h4>
                            <div>
                                <label>
                                    <strong>Baslik: </strong>
                                </label>{" "}
                                {currentTodo.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Aciklama: </strong>    
                                </label>{" "}
                                {currentTodo.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Durum: </strong>    
                                </label>{" "}
                                {currentTodo.published ? "Yayinlandi" : "Bekliyor"}
                            </div>

                            <Link to={"/todoes/" + currentTodo.id} className="badge badge-warning">Duzenle</Link>
                        </div>                
                    ) : (
                        <div>
                            <br />
                            <p>Lutfen ise tikla</p>
                        </div>    
                    )}
                </div>
            </div>
        );
    }
}