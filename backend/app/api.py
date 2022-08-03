from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://localhost:8000",
    "localhost:8000",
]

todos = [
    {"id": 1, "title": "learn fastapi", "done": False},
    {"id": 2, "title": "learn uvicorn", "done": False},
    {"id": 3, "title": "learn postgres", "done": False},
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}


@app.get("/getTodos")
async def read_todos() -> list:
    return {"data": todos}


@app.post("/addTodos")
async def create_todo(todo: dict) -> dict:
    todos.append(todo)


@app.put("/updateTodos/{id}")
async def update_todo(id: int) -> dict:
    for t in todos:
        if t["id"] == id:
            t["done"] = not t["done"]
            return {"data": t}
    return {"data": "Item not found"}
