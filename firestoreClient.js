const { Firestore } = require('@google-cloud/firestore');
const firestore = require('@google-cloud/firestore');
const path = require('path');

var fs = require('fs');

class FirestoreClient{
constructor(){

    this.firestore = new Firestore({
        projectId:'tttgame-8b5cb',
        keyFilename:path.join(__dirname,'./tttgame-8b5cb-firebase-adminsdk-wsmly-8a9400663e.json')
    })
}

async getByPath(path){
const docRef = this.firestore.doc(path);
const  response = await docRef.get();
var words = JSON.stringify(response.data(),null,2);
fs.writeFile('data.json',words, finished);
function finished(err){
    console.log('all set.');
}
return response.data();
}
}

module.exports= new FirestoreClient();