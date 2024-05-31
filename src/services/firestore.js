const { Firestore } = require('@google-cloud/firestore')

const fs_users = new Firestore({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    databaseId: "babygrowth"
})

// async function storeData(id, data) {
//     const db = new Firestore()

//     const predictCollection = db.collection('users')
//     return predictCollection.doc(id).set(data)
// }

module.exports = fs_users
