from typing import Annotated
from fastapi import Depends, FastAPI
from sqlmodel import Field, Session, SQLModel, create_engine, select
from fastapi.middleware.cors import CORSMiddleware


class Todo(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    text: str
    completed: bool | None = False


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

# Allow any localhost port (e.g., 5174, 3000, 8000, etc.)
origins = [
    "http://localhost",
    "http://127.0.0.1"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[f"{origin}:{port}" for origin in origins for port in range(5000, 6000)],  # Allow ports 5000-5999
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/todos/")
async def read_todos(session: SessionDep) -> list[Todo]:
    """
    Returns a list of Todo objects to the client.

    @param  session  a session dependency for get request 
    @return          a list of Todo objects        
    """
    todos = session.exec(select(Todo)).all()
    return todos


@app.post("/todos/")
async def create_todo(todo: Todo, session: SessionDep) -> Todo:
    """
    Adds a new todo to the database.  

    @param todo     a Todo object
    @param session  a session dependency for our post request 
    @return         a Todo object
    """
    session.add(todo)
    session.commit()
    session.refresh(todo)

    return todo


@app.put("/todos/{todo_id}")
async def update_todo(todo_id: int, newTodo: Todo, session: SessionDep) -> Todo:
    """
    Modifies the description of a pre-existing todo object stored in the database.  

    @param todo_id
    @param newTodo
    @param session
    @return 
    """
    todo = session.get(Todo, todo_id)
    todo.text = newTodo.text
    todo.completed = newTodo.completed
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int, session: SessionDep):
    """
    Deletes a todo object from the database.  

    @param todo_id
    @param session
    @return 
    """
    todo = session.get(Todo, todo_id)
    session.delete(todo)
    session.commit()
    return {"Todo deleted successfully": True}
