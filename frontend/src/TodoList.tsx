"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from "lucide-react"
import { getTodos, addTodo, updateTodo, removeTodo } from "./services/api.ts"

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('')

  useEffect(() => {
    getTodos().then(data => setTodos(data))
  }, []);

  const createNewTodo = async () => {
    addTodo(text)
      .then(() => {
        if (text.trim() !== "") {
          const newTodo: Todo = { 
            id: Date.now(), 
            text, 
            completed: false 

          };
          setTodos([...todos, newTodo])
          setText('')
        }
      })
      .catch(error => console.log(error))
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          const updatedTodo: Todo = {
            ...todo,
            completed: !todo.completed
          }; 
          updateTodo(updatedTodo);
          return updatedTodo
        }
        return todo
      })
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo"
          onKeyPress={(e) => e.key === "Enter" && createNewTodo()}
        />
        <Button onClick={createNewTodo}>Add</Button>
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
            <Button variant="ghost" size="icon" onClick={() => {
              // deletes todo from useState and database
              const id: number = todo.id;
              removeTodo(id).then(msg => console.log(msg))
              setTodos(todos.filter(todo => todo.id !== id))
            }}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}