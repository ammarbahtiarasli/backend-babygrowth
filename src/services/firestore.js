const { Firestore } = require('@google-cloud/firestore')

const firestore = new Firestore({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    databaseId: "babygrowth"
})

async function storeData(collectionName, id, data) {
    try {
        // Validate collection name
        if (collectionName !== 'users' && collectionName !== 'recipes') {
            throw new Error("Invalid collection name. Must be 'users' or 'recipes'")
        }

        const collectionRef = firestore.collection(collectionName)
        await collectionRef.doc(id).set(data)

        console.log(`Data successfully stored in collection '${collectionName}' with ID: ${id}`)
    } catch (error) {
        console.error(`Error storing data in collection '${collectionName}':`, error)
        throw error // Re-throw for further error handling
    }
}


module.exports = storeData
