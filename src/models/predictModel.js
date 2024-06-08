const predict = [
    {
        status: "success",
        message: "Model is predicted successfully.",
        data: {
            id: "<id> as int",
            result: "<Class Model> as string ",
            explanation: "<Disease explanation> as string ",
            suggestion: "<suggestion> as string ",
            confidenceScore: "<score> as float ",
            createdAt: "<timestamp> as datetime"
        }
    }
]

module.exports = predict
