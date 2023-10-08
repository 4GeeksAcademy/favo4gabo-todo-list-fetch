import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue,setInputValue] = useState( { label: "", done: false},)
	const [todos,setTodos] = useState([])

	const deleteTask = (id) => {
		let newArray = todos.filter((item, index) => index !== id);
		setTodos(newArray);
	}
	const addTask = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/gabriel', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
	}
		)}

	function updateList (updateList) {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/gabriel', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
	}


	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Hello Rigo!</h1>
			<p>
				<img src={rigoImage} />
			</p>
			<a href="#" className="btn btn-success">
				If you see this green button... bootstrap is working...
			</a>
			<p>
				Made by{" "}
				<a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with
				love!
			</p>
		</div>
	);
};

export default Home;
