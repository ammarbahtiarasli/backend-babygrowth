const { firestore, storeData } = require("../services/firestore")
const crypto = require("crypto")
const { predictTexture } = require("../services/inferenceService")

const postPredict = async (request, h) => {
    const { image } = request.payload

    // Memprediksi tekstur
    const { confidenceScore, label, suggestion } = await predictTexture(model, image)

    let id = crypto.randomBytes(16).toString("hex")
    const data = {
        id: id,
        label,
        confidenceScore,
        suggestion,
    }

    return h.response({
        status: "success",
        message: "Gambar telah diprediksi.",
        data: data
    }).code(200)
}

module.exports = postPredict
