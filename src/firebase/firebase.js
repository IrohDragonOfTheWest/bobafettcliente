import app from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/auth'

import firebaseConfig from './config'


//crea el objeto 
class Firebase {
    //es un metodo que hara match
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.db = app.firestore();
        this.storage = app.storage();
        this.auth = app.auth();
    }
}

const firebase = new Firebase();

export default firebase;