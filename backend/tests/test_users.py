def test_create_user(client):
    response = client.post(
        "/api/v1/users/",
        json={"username": "testuser", "email": "test@example.com", "password": "password123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data

def test_get_user(client):
    # Setup - first create a user to get
    create_response = client.post(
        "/api/v1/users/",
        json={"username": "testuser2", "email": "test2@example.com", "password": "password123"}
    )
    user_id = create_response.json()["id"]

    # Test getting the user
    response = client.get(f"/api/v1/users/{user_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test2@example.com"
    assert data["id"] == user_id
