const FirestoreClient = require('./firestoreClient');

const getByPath = async() => {
    const result = await FirestoreClient.getByPath('Users/es2kw9rtIHhtmgJGZ9xJxpSeiSN2');
    console.log(result);
}

getByPath();

