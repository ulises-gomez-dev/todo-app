from fastapi import FastAPI
from pydantic import BaseModel


class Todo(BaseModel):
    id: int | None = None
    description: str


app = FastAPI()


todosArray = []


@app.get("/todos")
async def root():
    return todosArray


@app.post("/todos/")
async def create_todo(todo: Todo):
    if todo.id is None:
        todo.id = len(todosArray)

    todosArray.append(todo)
    
    return todo


@app.put("/todos/{todo_id}")
async def update_todo(todo_id: int, todo: Todo):
    for todoItem in todosArray:
        if todoItem.id == todo_id:
            todoItem.description = todo.description
            return {"message": "Todo updated", "id": todo_id}

    return {"message": "Todo not found", "id": todo_id}


@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int):
    del todosArray[todo_id]
    
    for i in range(len(todosArray)):
        todoItem = todosArray[i]
        todoItem.id = i

    return {"message": "Todo successfully deleted"}
