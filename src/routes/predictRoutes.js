const predictHandler = require("../handlers/predictHandler")

const predictRoutes = [
    {
        method: "POST",
        path: "/predict",
        handler: predictHandler.postPredict,
        options: {
            auth: false,
            payload: {
                allow: 'multipart/form-data',
                multipart: true
            }
        }
    },
]

module.exports = predictRoutes
