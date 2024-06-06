const tf = require('@tensorflow/tfjs-node')

const predictTextureClassification = async (model, image) => {
    // Pra-pemrosesan gambar (sama seperti sebelumnya)
    const tensor = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()

    // Prediksi dengan model
    const prediction = model.predict(tensor)

    // Ambil semua skor prediksi (bukan hanya satu)
    const scoreArray = await prediction.data()

    // Indeks kelas dengan skor tertinggi
    const maxIndex = scoreArray.indexOf(Math.max(...scoreArray))

    // Label tekstur berdasarkan indeks
    const labels = ['Bukan Makanan', 'Kasar', 'Lumat', 'Lunak']
    const label = labels[maxIndex]

    // Skor kepercayaan (dalam persen)
    const confidenceScore = scoreArray[maxIndex] * 100

    // Saran (opsional)
    let suggestion = ""
    switch (label) {
        case 'Bukan Makanan':
            suggestion = "Ini bukan makanan. Coba masukkan gambar makanan."
            break
        case 'Kasar':
            suggestion = "Tekstur makanan ini kasar."
            break
        case 'Lumat':
            suggestion = "Tekstur makanan ini lumat."
            break
        case 'Lunak':
            suggestion = "Tekstur makanan ini lunak."
            break
    }

    return { confidenceScore, label, suggestion }
}

module.exports = { predictTextureClassification }
