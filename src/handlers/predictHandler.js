const { storePredict } = require("../services/firestore")
const crypto = require("crypto")
const predictTexture = require("../services/inferenceService")

const postPredict = async (request, h) => {
    const { image } = request.payload
    const { model } = request.server.app

    // Memprediksi tekstur
    const { confidenceScore, label, suggestion } = await predictTexture(model, image)

    let id = crypto.randomBytes(16).toString("hex")
    const data = {
        id: id,
        label,
        suggestion,
    }

    await storePredict(id, data)

    return h.response({
        status: "success",
        message: confidenceScore > 99 ? 'Model is predicted successfully.' : 'Model is predicted successfully but under threshold. Please use the correct picture',
        data: data
    }).code(200)
}

module.exports = postPredict
