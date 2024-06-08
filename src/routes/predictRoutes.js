const predictHandler = require("../handlers/predictHandler")

const predictRoutes = [
    {
        method: "GET",
        path: "/predict",
        options: {
            auth: false,
        },
        handler: predictHandler.postPredict,
    },
]

module.exports = predictRoutes
