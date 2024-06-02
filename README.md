# Babygrowth API

REST API untuk mobile app babygrowth

## Endpoint

http://localhost:3000



### Register

- URL

`/register`

- Method

 `POST`

- Request Body

`username` as `string`

`email` as `string`, must be unique

`password` as `string`, must be at least 8 characters

- Response

```json
{
   "status": "success",
    "message": "User created",
    "data": {
        "id": "5e5b4add-351d-4c11-9622-819a958f9a96",
        "username": "lanang",
        "email": "lanang@gmail.com",
        "password": "12345678",
        "name": null,
        "birthday": null,
        "height": null,
        "weight": null,
        "gender": null,
        "createdAt": "2024-05-31T10:08:52.381Z",
        "updatedAt": "2024-05-31T10:08:52.381Z"
    }
}
```

### Login

- URL

`/login`

- Method

 `POST`

- Request Body

`email` as `string`, must be unique

`password` as `string`, must be at least 8 characters

- Response

```json
{
   "status": "success",
    "message": "User login",
    "data": {
        "id": "5e5b4add-351d-4c11-9622-819a958f9a96",
        "username": "lanang",
        "email": "lanang@gmail.com",
        "name": null,
        "birthday": null,
        "height": null,
        "weight": null,
        "gender": null,
        "createdAt": "2024-05-31T10:08:52.381Z",
        "updatedAt": "2024-05-31T10:08:52.381Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhbmFuZ0BnbWFpbC5jb20iLCJpYXQiOjE3MTcxNTAyMTJ9.86FXsM8MFOm_lZMbRHXBOJxrUJBNKL-hzkyAVFpUi5A"
    }
}
```

### Profile

- URL

`/profile`

- Method

 `GET`

- Request Body

`none`

 use token JWT.

- Response

```json
{
   "status": "success",
    "message": "User Profile",
    "data": {
        "id": "5e5b4add-351d-4c11-9622-819a958f9a96",
        "username": "lanang",
        "email": "lanang@gmail.com",
        "name": null,
        "birthday": null,
        "height": null,
        "weight": null,
        "gender": null,
        "createdAt": "2024-05-31T10:08:52.381Z",
        "updatedAt": "2024-05-31T10:08:52.381Z",
    }
}
```

### Edit Profile

- URL

`/profile`

- Method

 `POST`

- Request Body

`username` as `string`, must be unique

`email` as `string`, must be unique

`password` as `string`, must be at least 8 characters

- Response

```json
{
    "status": "success",
    "message": "User profile updated",
    "data": {
        "name": "ripan banget",
        "birthday": "2020-01-01",
        "height": 40,
        "weight": 45,
        "gender": "Laki-laki",
        "updatedAt": "2024-06-02T15:41:58.163Z"
    }
}
```
