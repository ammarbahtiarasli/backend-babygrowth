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


async function updateData(collectionName, id, data) {
    try {
        // Validate collection name (same as before)
        if (collectionName !== 'users' && collectionName !== 'recipes') {
            throw new Error("Invalid collection name. Must be 'users' or 'recipes'")
        }

        const collectionRef = firestore.collection(collectionName)
        const docRef = collectionRef.doc(id)

        // Check if the document exists
        const docSnapshot = await docRef.get()
        if (!docSnapshot.exists) {
            throw new Error(`Document with ID ${id} does not exist in collection '${collectionName}'`)
        }

        // Update the document
        await docRef.update(data)

        console.log(`Data successfully updated in collection '${collectionName}' with ID: ${id}`)
    } catch (error) {
        console.error(`Error updating data in collection '${collectionName}':`, error)
        throw error // Re-throw for further error handling
    }
}


module.exports = { firestore, storeData, updateData }
