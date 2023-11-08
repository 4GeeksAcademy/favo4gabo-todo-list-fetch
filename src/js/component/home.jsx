import React, { useEffect, useState } from "react";

// declaro mi cariable global, y ahora en los fetch llamo a esta variable
let url_base = 'https://playground.4geeks.com/apis/fake/todos/user/gabriel'

// Que hace mi aplicacion?

// 1- Traerse todas las tareas guardadas en db (API) --> no existe estatus 404  READY
// 2- Crear usuario  READY
// 3- guarda tareas  READY
// 4- borrar tareas cuando le doy click  READY
// 5- Eliminar usuario con todas las tareas READY

//create your first component
const Home = () => {

    const [inputValue, setInputValue] = useState({ label: "", done: false },)
	const [todos, setTodos] = useState([])
    const [error, setError] = useState(false)


    // lo primero que debo hacer es una funcion que se traiga todas las tareas de la API
    // va a ser async
    const getTask = async() => {
        // se recomienda que cuando hagamos consultas a las APIS manejemos los errores, entonces usaremos try catch
        try {
            // aqui va la logica, lo primero que necesitamos? hacer la consulta a la API
                // declaro mi variable, le quiero llamar response
                    // es await porque es asincrona, es decir, una promesa
                            // al fetch le tengo que pasar la url al que yo quiero traerme todas las tareas
            let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/gabriel")           
            // creo otra variable que sera lo que voy a traducir de lo que trae la respuesta a un formto que js pueda usar
            let data = await response.json()
            // preguntamos si el estatus es 200
            
            if (response. status == 200) {
                setTodos(data)
            }
            if (response.status == 404) {
                createUser()
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    // mi funcion que va a crear usuarios
    // usa fetch, por lo tanto sera asincrona
    const createUser = async() => {
        try {
            //cuando se hace metodo post, tiene dos parametros.
            // 1- la url para consultar
            // 2- el objeto con los detalles -> los detalles pueden ser: que metodo es, si lleva content type etc
                    // es await porque es asincrona, es decir, una promesa
                            // al fetch le tengo que pasar la url al que yo quiero traerme todas las tareas
            let response = await fetch(url_base, {
                // key: value
                method: 'POST',
                // lleva un objeto{} de cabecera que lleva este fetch, ahora que envio cosas debo decir como va codificado
                headers: {
                    // esto debe estar escrito exactamente asi
                                    //esto lo se por la documentacion de la API
                    'Content-Type': "application/json"
                },
                // tengo que pasar este formato de js a un formato de js plano
                        //stringify lo pasa a texto
                                    // paso un array vacio como indica la API
                body: JSON.stringify([])
            })

            if (response.ok) {
                getTask()
            }
        } catch (error) {
            console.log()
        }
    }


    const handleChange = (event) => {
        setInputValue({
            label: event.target.value,
            done: false
        })
    }


    // guardar tareas 
    // como voy a usar un fetch dentro de esta funcion, la hago asincrona
    const saveTask = async (event) => {
        if (event.key === "Enter") {
        try {
            let response = await fetch(url_base, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                                //dice que le pase una lista
                body: JSON.stringify([...todos, inputValue])
            })

            if (response.ok) {
                getTask()
                setInputValue({
                    label: "",
                    done: false
                },)
                setError(false)
            }
        } catch (error) {
            console.log(error)
        }
        }
    }


    // borrar tareas
    const deleteTask = async (id) => {
                            // este filter lo que hace es sacar la tarea que se va a eliminar y nos da un nuevo array con todas las tareas nuevas
        let newArray = todos.filter((item, index) => index != id)
        try {
            let response = await fetch(url_base, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newArray)
            })
            // si la respuesta es ok llamamos a getTask que es el que se encarga de agregar mis tareas en el estado
            if (response.ok) {
                getTask()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // borrar al usuario con todas las tareas
    async function deleteAll() {
        try {
            let response = await fetch(url_base, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                getTask()
            }
        } catch (error) {
            console.log(error)
        }
    }


    // necesitamos ejecutar solo una vez esta getTask
// el useEffect es una funcion que recibe como primer parametro un callback y como segundo parametro las dependencias useEffect(() => {}, [])
    useEffect(() => {
        //dentro de las llaves llamamos a gettask para que se ejecute la primera vez que cargue nuestra pagina web
        getTask()
    }, [])


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <h1>To-Do List</h1>            
                    {error ? <p className="alert alert-danger">Todos los campos son obligatorios</p> : ""}
                        <input 
                            type="text"
                            placeholder="que hay que hacer"
                            value={inputValue.label}
                            onChange={handleChange}
                            onKeyDown={saveTask}
                        />
                    <ol>                    
                        {todos.map((item, index) => (
                        <li key={item.label} className="item">
                            <span className="task">
                                {item.label}
                                <i className="fas fa-trash" onClick={() => deleteTask(index)}></i>
                            </span>
                        </li>
                        ))}                    
                    </ol>
                    <button className="btn btn-outline-danger mt-5" onClick={() => deleteAll()}> Delete All Task </button>
                </div>
            </div>
        </div>
    );
};

export default Home;

// 1.- Traese todas las tareas guardadas en db(API) --> no existe estatus 404, ready
// 2.- Crear un usario---> ready
// 3.- Guarda tareas --->  ready
// 4.- Borrar tareas cuando le doy click 
// 5.- Eliminar usuario con todas las tareas

// API 