// API: son lugares en internet que nosotros podemos consultar informacion de lo que sea
// lo que hace es conectar una base de datos con el fontend

const { useEffect, useCallback } = require("react")

// declaro mi cariable global, y ahora en los fetch llamo a esta variable
let URL_BASE = 'https://playground.4geeks.com/apis/fake/todos/user/gabriel'


// Que hace mi aplicacion?

// 1- Traerse todas las tareas guardadas en db (API) --> no existe estatus 404  READY
// 2- Crear usuario  READY
// 3- guarda tareas  READY
// 4- borrar tareas cuando le doy click  READY
// 5- Eliminar usuario con todas las tareas

// ahora que ya sabemos que hace mi aplicacion, la siguiente etapa es conocer la API
//con la API que nos estan dando "https://playground.4geeks.com/apis/fake/todos/" como hacer esas cosas

// necesitamos una herramienta para consultar APIS, usaremos thunder
// necesitamos probar la API antes de hacer un fetch porque nosotros no somos los dueños de la API, no sabemos si esta caida o cualquier cosa

// vemos en la api como podemos traernos la tarea

// necesito que la primera vez que se renderice llame a la API y me muestre las tareas
// esto se hace en useEffect


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
                setTareaLista(data)
            }
            if (response.status == 404) {
                createUser()
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    // tengo mi funcion que va a crear usuarios
            // esta usa fetch, por lo tanto sera asincrona
    const createUser = async() => {
        try {
            //cuando se hace metodo post, tiene dos parametros.
            // 1- la url para consultar
            // 2- el objeto con los detalles -> los detalles pueden ser: que metodo es, si lleva content type etc
                    // es await porque es asincrona, es decir, una promesa
                            // al fetch le tengo que pasar la url al que yo quiero traerme todas las tareas
            let response = await fetch(URL_BASE, {
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


    // guardar tareas 
                // como voy a usar un fetch dentro de esta funcion, la hago asincrona
    const saveTask = async (event) => {
        if (event.key === "Enter") {
        try {
            let response = await fetch(URL_BASE, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                                //dice que le pase una lista
                body: JSON.stringify([...tareaLista, tarea])
            })

            if (response.ok) {
                getTask()
                setTarea(initialTarea)
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
        let newArray = TareaLista.filter((item, index) => index != id)

        try {
            let response = await fetch(URL_BASE, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newArray)
            })

            // si la respuesta es ok llamamos a getTask que es el que se encarga de agregar mis tareas en el estado
            if (response.ok) {
                getTask
            }
        } catch (error) {
            console.log(error)
        }
    }


    // borrar al usuario con todas las tareas
    async function deleteAll() {
        try {
             let response = await fetch(URL_BASE, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
             })

             if (response.ok) {
                getTask
             }
        } catch (error) {
            
        }
    }

// necesitamos ejecutar solo una vez esta getTask
// el useEffect es una funcion que recibe como primer parametro un callback y como segundo parametro las dependencias useEffect(() => {}, [])
    useEffect(() => {
        //dentro de las llaves llamamos a gettask para que se ejecute la primera vez que cargue nuestra pagina web
        getTask()
    }, []
    )