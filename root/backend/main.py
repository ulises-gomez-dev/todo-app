from typing import Annotated
from fastapi import Depends, FastAPI
from sqlmodel import Field, Session, SQLModel, create_engine, select


class Todo(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    description: str


sqlite_file_name = "todo_app.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

# Setting "echo" to "True" prints all the SQL statements it executes (remove in production) 
engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/todos/")
async def read_todos(session: SessionDep) -> list[Todo]:
    todos = session.exec(select(Todo)).all()
    return todos


@app.post("/todos/")
async def create_todo(todo: Todo, session: SessionDep) -> Todo:
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


@app.put("/todos/{todo_id}")
async def update_todo(todo_id: int, newTodo: Todo, session: SessionDep) -> Todo:
    todo = session.get(Todo, todo_id)
    todo.description = newTodo.description
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int, session: SessionDep):
    todo = session.get(Todo, todo_id)
    session.delete(todo)
    session.commit()
    return {"Todo deleted successfully": True}
