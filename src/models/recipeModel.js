const recipe = [
    {
        id_resep: "R1",
        name: "Bubur Singkong Isi Ikan dan Ayam dengan Saus Jagung Manis",
        image: "link cloud storage",
        kategori: 0,
        porsi: 3,
        langkah: [
            {
                step: 1,
                deskripsi: "Masak singkong hingga lembut."
            },
            {
                step: 2,
                deskripsi: "Tambahkan ikan dan ayam ke dalam singkong."
            },
            {
                step: 3,
                deskripsi: "Masak saus jagung manis secara terpisah."
            }
        ],
        bahan: [
            {
                id_bahan: "B1",
                nama_bahan: "Singkong",
                jumlah: "200g"
            },
            {
                id_bahan: "B2",
                nama_bahan: "Ikan",
                jumlah: "100g"
            },
            {
                id_bahan: "B3",
                nama_bahan: "Ayam",
                jumlah: "100g"
            }
        ],
        nutrisi: {
            kalori: 250,
            lemak: 10,
            protein: 20,
            karbohidrat: 30,
            serat: 5,
            gula: 10,
            natrium: 300
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
]

module.exports = recipe
