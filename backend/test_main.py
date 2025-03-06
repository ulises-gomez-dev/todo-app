from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_todos():
    response = client.get("/todos/")
    assert response.status_code == 200

def test_create_todos():
    response = client.post(
        "/todos/",
        json={"text": "clean up bedroom"}
    )

    data = response.json()

    assert response.status_code == 200
    assert type(data["id"]) == int
    assert data["text"] == "clean up bedroom"
    assert data["completed"] == False