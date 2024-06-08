const postPredict = require("../handlers/predictHandler")

const predictRoutes = [
    {
        method: "POST",
        path: "/predict",
        handler: postPredict,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true
            }
        }
    }
]

module.exports = predictRoutes
