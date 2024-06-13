![BabyGrowth](https://storage.googleapis.com/babygrowth-bucket/logo.png)

# Babygrowth API

REST API untuk Android Mobile App babygrowth

## Endpoint

Development : [http://localhost:3000/{url}](http://localhost:3000/{url})

Production : [http://34.101.83.16:3000/{url}](http://34.101.83.16:3000/%7Burl%7D)

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


``` json
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


``` json
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


``` json
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


`name` as `string`,

`birthday` as `date`,

`height` as `number`,

`weight` as `number`,

`gender` as `string`,

- Response


``` json
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

### Get All Recipes

- URL


`/recipe`

- Method

    `GET`

- Request Body


`none`

use token JWT

- Response


``` json
{
    "status": "success",
    "message": "All Recipes found",
    "data": {
        "0": {
            "id": "R1",
            "name": "Pure Ikan Ungu",
            "image": "R2.png",
            "kategori": 0,
            "porsi": 1,
            "langkah": [
                {
                    "step": 1,
                    "deskripsi": "Kukus ikan, labu siam, tahu dan ubi ungu hingga matang"
                },
                {
                    "step": 2,
                    "deskripsi": "Lumat/blender semua bahan di atas"
                },
                {
                    "step": 3,
                    "deskripsi": "Tambahkan santan dan kaldu jamur"
                },
                {
                    "step": 4,
                    "deskripsi": "Tambahkan air, saring dan sajikan"
                }
            ],
            "bahan": [
                {
                    "jumlah": "60",
                    "nama_bahan": "Ikan Tuna",
                    "id_bahan": "B21"
                },
                {
                    "jumlah": "20",
                    "nama_bahan": "Labu Siam",
                    "id_bahan": "B14"
                },
                {
                    "jumlah": "20",
                    "nama_bahan": "Tahu",
                    "id_bahan": "B13"
                },
                {
                    "jumlah": "60",
                    "nama_bahan": "Ubi Ungu",
                    "id_bahan": "B22"
                },
                {
                    "jumlah": "400",
                    "nama_bahan": "Ayam",
                    "id_bahan": "B23"
                },
                {
                    "jumlah": "100g",
                    "nama_bahan": "Ayam",
                    "id_bahan": "B24"
                },
                {
                    "jumlah": "100g",
                    "nama_bahan": "Ayam",
                    "id_bahan": "B18"
                }
            ],
            "nutrisi": {
                "kalori": 250,
                "karbohidrat": 30,
                "gula": 10,
                "protein": 20,
                "serat": 5,
                "natrium": 300,
                "lemak": 10
            },
            "createdAt": "2024-06-06T13:49:41.526Z",
            "updatedAt": "2024-06-06T13:49:41.526Z"
        },
    }
}

 ```

### Get Recipes by ID

- URL


`/recipe/{id}`

- Method

    `GET`

- Request Body


`none`

use token JWT

- Response


``` json
{
    "status": "success",
    "message": "Recipe found",
    "data": {
        "id": "R1",
        "name": "Pure Ikan Ungu",
        "image": "R2.png",
        "kategori": 0,
        "porsi": 1,
        "langkah": [
            {
                "step": 1,
                "deskripsi": "Kukus ikan, labu siam, tahu dan ubi ungu hingga matang"
            },
            {
                "step": 2,
                "deskripsi": "Lumat/blender semua bahan di atas"
            },
            {
                "step": 3,
                "deskripsi": "Tambahkan santan dan kaldu jamur"
            },
            {
                "step": 4,
                "deskripsi": "Tambahkan air, saring dan sajikan"
            }
        ],
        "bahan": [
            {
                "jumlah": "60",
                "nama_bahan": "Ikan Tuna",
                "id_bahan": "B21"
            },
            {
                "jumlah": "20",
                "nama_bahan": "Labu Siam",
                "id_bahan": "B14"
            },
            {
                "jumlah": "20",
                "nama_bahan": "Tahu",
                "id_bahan": "B13"
            },
            {
                "jumlah": "60",
                "nama_bahan": "Ubi Ungu",
                "id_bahan": "B22"
            },
            {
                "jumlah": "400",
                "nama_bahan": "Ayam",
                "id_bahan": "B23"
            },
            {
                "jumlah": "100g",
                "nama_bahan": "Ayam",
                "id_bahan": "B24"
            },
            {
                "jumlah": "100g",
                "nama_bahan": "Ayam",
                "id_bahan": "B18"
            }
        ],
        "nutrisi": {
            "kalori": 250,
            "karbohidrat": 30,
            "gula": 10,
            "protein": 20,
            "serat": 5,
            "natrium": 300,
            "lemak": 10
        },
        "createdAt": "2024-06-06T13:49:41.526Z",
        "updatedAt": "2024-06-06T13:49:41.526Z"
    }
}

 ```

### Get Recipes search by Name

- URL


`/recipe/search/{name}`

- Method

    `GET`

- Request Body


`none`

use token JWT

- Response


``` json
{
    "status": "success",
    "message": "Recipe found",
    "data": {
        "id": "R1",
        "name": "Pure Ikan Ungu",
        "image": "R2.png",
        "kategori": 0,
        "porsi": 1,
        "langkah": [
            {
                "step": 1,
                "deskripsi": "Kukus ikan, labu siam, tahu dan ubi ungu hingga matang"
            },
            {
                "step": 2,
                "deskripsi": "Lumat/blender semua bahan di atas"
            },
            {
                "step": 3,
                "deskripsi": "Tambahkan santan dan kaldu jamur"
            },
            {
                "step": 4,
                "deskripsi": "Tambahkan air, saring dan sajikan"
            }
        ],
        "bahan": [
            {
                "jumlah": "60",
                "nama_bahan": "Ikan Tuna",
                "id_bahan": "B21"
            },
            {
                "jumlah": "20",
                "nama_bahan": "Labu Siam",
                "id_bahan": "B14"
            },
            {
                "jumlah": "20",
                "nama_bahan": "Tahu",
                "id_bahan": "B13"
            },
            {
                "jumlah": "60",
                "nama_bahan": "Ubi Ungu",
                "id_bahan": "B22"
            },
            {
                "jumlah": "400",
                "nama_bahan": "Ayam",
                "id_bahan": "B23"
            },
            {
                "jumlah": "100g",
                "nama_bahan": "Ayam",
                "id_bahan": "B24"
            },
            {
                "jumlah": "100g",
                "nama_bahan": "Ayam",
                "id_bahan": "B18"
            }
        ],
        "nutrisi": {
            "kalori": 250,
            "karbohidrat": 30,
            "gula": 10,
            "protein": 20,
            "serat": 5,
            "natrium": 300,
            "lemak": 10
        },
        "createdAt": "2024-06-06T13:49:41.526Z",
        "updatedAt": "2024-06-06T13:49:41.526Z"
    }
}

 ```

### Create Recipe

- URL


`/recipe`

- Method

    `POST`

- Request Body


`name` as `string`

`image` as `string`

`steps` as `array`

`ingredients` as `array`

`nutritions` as `array`

use token JWT

- Response


``` json
{
    "status": "success",
    "message": "Recipe created",
    "data": {
        "id": "R121",
        "name": "Test",
        "image": "R1000.png",
        "steps": [
            {
                "step": 1,
                "deskripsi": "Lorem"
            }
        ],
        "ingredients": [
            {
                "id_bahan": "B22",
                "nama_bahan": "ubi ungu",
                "jumlah": 60
            }
        ],
        "nutrition": {
            "kalori": 141.1,
            "lemak": 9.1,
            "protein": 8.9,
            "karbohidrat": 5.8,
            "serat": 0,
            "gula": 0,
            "natrium": 0
        },
        "createdAt": "2024-06-08T11:01:32.982Z",
        "updatedAt": "2024-06-08T11:01:32.982Z"
    }
}

 ```

### Prediction Texture

- URL


`/predict`

- Method

    `POST`

- Request Body


`image` as `image`

use token JWT

- Response


``` json
{
    "status": "success",
    "message": "Model is predicted successfully.",
    "data": {
        "id": "03c89e758efc476c39688d0d84d26cc7",
        "label": "Lunak",
        "suggestion": "disarankan untuk dikonsumsi oleh anak-anak."
    }
}
 ```

 last updated : 08/06/2024
