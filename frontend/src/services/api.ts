const baseUrl: string = "http://127.0.0.1:8000";

export async function getTodos() {
    /*** 
     * Returns a Promise, where the Resolved value is a todos list as a JSON object.
     * @returns {Promise} todos
    */
    const todosRequestEndpoint: string = "/todos";
    const urlToFetch: string = baseUrl + todosRequestEndpoint;

    try {
        const response: any = await fetch(urlToFetch);
        if (response.ok) {
            const todos = await response.json();
            return todos;
        }
        throw new Error(`HTTP error status: ${response.status}`)

    } catch (error) {
        console.log(error);
    }
}

export async function addTodo(text: string) {
    const addTodoEndpoint: string = "/todos";
    const urlToFetch: string = baseUrl + addTodoEndpoint;
    const objToFetch: Object = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ text })
    };

    try {
        const response: any = await fetch(urlToFetch, objToFetch);
        if (response.ok) {
            const todo = await response.json();
            return todo;
        }
        throw new Error(`HTTP error status: ${response.status}`)

    } catch (error) {
        console.log(error);
    }

}

export async function updateTodo(todo: any) {
    const updateTodoEndpoint: string = `/todos/${todo.id}`;
    const urlToFetch: string = baseUrl + updateTodoEndpoint;
    const objToFetch: Object = {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ "text": todo.text, "completed": todo.completed })
    };

    try {
        const response: any = await fetch(urlToFetch, objToFetch);
        if (response.ok) {
            const todo = await response.json();
            return todo
        }

        throw new Error(`HTTP error status: ${response.status}`)

    } catch (error) {
        console.log(error);
    }
}

export async function removeTodo(todoId: Number) {
    const updateTodoEndpoint: string = `/todos/${todoId}`;
    const urlToFetch: string = baseUrl + updateTodoEndpoint;
    const objToFetch: Object = { method: "DELETE" };

    try {
        const response: any = await fetch(urlToFetch, objToFetch);
        if (response.ok) {
            const todo = await response.json();
            return todo
        }

        throw new Error(`HTTP error status: ${response.status}`)

    } catch (error) {
        console.log(error);
    }
}