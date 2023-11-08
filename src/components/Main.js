import React, { Component } from "react";

//form
import { FaPlus } from "react-icons/fa";

//tarefas
import { FaEdit, FaWindowClose } from "react-icons/fa";

import './Main.css';

export default class Main extends Component {
    state = {
        novaTarefa: '',
        tarefa: [],
        index: -1,
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { tarefa, index } = this.state;
        let { novaTarefa } = this.state;

        novaTarefa = novaTarefa.trim();

        if(tarefa.indexOf(novaTarefa) !== -1) return;

        const novasTarefas = [... tarefa];
        
        if( index == -1){
            this.setState({
                tarefa: [... novasTarefas, novaTarefa],
                novaTarefa: '',
            });
        } else {
            novasTarefas[index] = novaTarefa;

            this.setState({
                tarefa: [... novasTarefas],
                index: -1,
            });

        }

    }

    handleChange = (e) => {
        this.setState({
            novaTarefa: e.target.value,
        }); 
    }


    handleEdit = (e, index) => {
        const { tarefa } = this.state;

        this.setState({
            index,
            novaTarefa: tarefa[index],

        });
    }

    handleDelet = (e, index) => {
        const { tarefa } = this.state;
        const novasTarefas = [... tarefa];

        novasTarefas.splice(index, 1);

        this.setState({
            tarefa: [... novasTarefas],
        });
    }

    render() {
        const { novaTarefa, tarefa } = this.state;

        return (
            <div className="main">
                <h1>Lista de Tarefas</h1>

                <form onSubmit={this.handleSubmit} action="#" className="form">
                    <input 
                        onChange = {this.handleChange} 
                        type="text"
                        value={novaTarefa}
                    />
                    <button type="submit">
                        <FaPlus />
                    </button>
                </form>

                <ul className="tarefa">
                    {tarefa.map((tarefa, index) => (
                        <li key={tarefa}>
                            {tarefa}
                            <span>
                                <FaEdit 
                                onClick={(e) => this.handleEdit(e, index)}  
                                className="edit" 
                                />

                                <FaWindowClose 
                                onClick={(e) => this.handleDelet(e, index)} 
                                className="delet" 
                                />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}