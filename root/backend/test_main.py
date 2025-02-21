from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_todos():
    res = client.get("/todos/")
    assert res.status_code == 200
