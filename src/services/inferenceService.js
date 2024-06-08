const tf = require('@tensorflow/tfjs-node')

async function predictTexture(model, image) {
    const tensor = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()

    const prediction = model.predict(tensor)
    const score = await prediction.data()
    const confidenceScore = Math.max(...score) * 100

    const classes = ['Bukan Makanan', 'Kasar', 'Lumat', 'Lunak']

    const classResult = tf.argMax(prediction, 1).dataSync()[0]
    const label = classes[classResult]

    let explanation, suggestion

    if (label === 'Bukan Makanan') {
        explanation = "Gambar yang Anda masukkan bukan makanan."
        suggestion = "Silakan masukkan gambar makanan yang benar."
    }

    if (label === 'Kasar') {
        explanation = "Makanan yang Anda masukkan memiliki tekstur kasar."
        suggestion = "tidak disarankan untuk dikonsumsi oleh anak-anak."
    }

    if (label === 'Lumat') {
        explanation = "Makanan yang Anda masukkan memiliki tekstur lumat."
        suggestion = "disarankan untuk dikonsumsi oleh anak-anak."
    }

    if (label === 'Lunak') {
        explanation = "Makanan yang Anda masukkan memiliki tekstur lunak."
        suggestion = "disarankan untuk dikonsumsi oleh anak-anak."
    }

    return { confidenceScore, label, explanation, suggestion }
}

module.exports = predictTexture
