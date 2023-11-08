import React, { Component } from "react";
import Form from "./Form";
import Tarefas from "./Tarefas";
import './Main.css';

export default class Main extends Component {
    state = {
        novaTarefa: '',
        tarefa: [],
        index: -1,
    };

    componentDidMount() {
        const tarefa = JSON.parse(localStorage.getItem('tarefa'));

        if (!tarefa) return;

        this.setState({ tarefa});
    }

    componentDidUpdate(prevProps, PrevState) {
        const { tarefa } = this.state;

        if (tarefa === PrevState.tarefa) return;

        localStorage.setItem('tarefa', JSON.stringify(tarefa));
    }

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
                novaTarefa: '',
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

                <Form 
                    handleSubmit={this.handleSubmit} 
                    handleChange={this.handleChange}
                    novaTarefa={novaTarefa}
                />

                <Tarefas
                    tarefa = {tarefa}
                    handleEdit = {this.handleEdit}
                    handleDelet = {this.handleDelet}
                />

            </div>
        );
    }
}