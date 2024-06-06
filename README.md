REST API untuk mobile app babygrowth
Endpoint
Development : http://localhost:3000/{url}
Production : http://34.101.83.16:3000/{url}
Register
URL

/register
Method
  POST
Request Body

username as string
email as string, must be unique
password as string, must be at least 8 characters
Response



JSON








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


Login
URL

/login
Method
  POST
Request Body

email as string, must be unique
password as string, must be at least 8 characters
Response



JSON








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


Profile
URL

/profile
Method
  GET
Request Body

none
use token JWT.
Response



JSON








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


Edit Profile
URL

/profile
Method
  POST
Request Body

name as string,
birthday as date,
height as number,
weight as number,
gender as string,
Response



JSON








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


Get All Recipes
URL

/recipe
Method
  GET
Request Body

none
use token JWT
Response



JSON








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


Get Recipes by ID
URL

/recipe/{id}
Method
  GET
Request Body

none
use token JWT
Response



JSON








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
