import React from "react";
import PropTypes from 'prop-types';
import { FaEdit, FaWindowClose } from "react-icons/fa";
import './Tarefas.css';


export default function Tarefas({ tarefa, handleEdit, handleDelet }) {
    return(
        <ul className="tarefa">
            {tarefa.map((tarefa, index) => (
                <li key={tarefa}>
                    {tarefa}
                    <span>
                        <FaEdit 
                        onClick={(e) => handleEdit(e, index)}  
                        className="edit" 
                        />

                        <FaWindowClose 
                        onClick={(e) => handleDelet(e, index)} 
                        className="delet" 
                        />
                    </span>
                </li>
            ))}
        </ul>
    )
}

Tarefas.propTypes = {
    handleEdit: PropTypes.func.isRequired,
    handleDelet: PropTypes.func.isRequired,
    tarefa: PropTypes.array.isRequired,
};