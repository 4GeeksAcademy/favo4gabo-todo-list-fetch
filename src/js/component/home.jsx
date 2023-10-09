import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("")
	const [todos, setTodos] = useState([])
	const eliminateTask = (index) => {
		setTodos(todos.filter(
			(t, currentIndex) => index != currentIndex))
	}
	const addTask = (event) => {
		console.log(event.key)
		if (event.key == "Enter") {
			setTodos([...todos, inputValue]);
			setInputValue ("")	
		}
	}
	function updateList (updateList) {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/gabriel', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      }
		})
		.then(resp => {
			console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
			console.log(resp.status); // el código de estado = 200 o código = 400 etc.
			console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
			return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
			console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
		})
		.catch(error => {
			//manejo de errores
			console.log(error);
		});
	}


	return (
		<div className="container">
			<h1>To-do list</h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown= {addTask}
						placeholder="que debes hacer?">
					</input>

				</li>
				{todos.map((item, index) =>				
					<li className="d-flex justify-content-between w-100"> {item} {" "}				
					<i 
						className="fa-solid fa-trash" 
							onClick={() => eliminateTask (index)}></i>
					</li>)}		
						
			</ul>
			<div>{todos.length} tareas</div>
		</div>
	);
};

export default Home;
