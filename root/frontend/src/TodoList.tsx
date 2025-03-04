"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from "lucide-react"
import { fetchTodos } from "./services/api"

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos("http://127.0.0.1:8000/todos/");
        setTodos(data);
      }
      catch (error) {
        console.log(error);
      }
    }

    getTodos();
  }, []);

  const addTodo = async () => {
    const url = "http://127.0.0.1:8000/todos/"
    const body = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTodo })
    }

    const response = await fetch(url, body);
    console.log(response.status)

    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = async (id: number) => {
    const url = `http://127.0.0.1:8000/todos/${id}`
    const body = {method: "DELETE"}

    const response = await fetch(url, body);
    console.log(response.status)

    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2 p-2 border rounded">
            <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} id={`todo-${todo.id}`} />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`flex-grow ${todo.completed ? "line-through text-gray-500" : ""}`}
            >
              {todo.text}
            </label>
            <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}