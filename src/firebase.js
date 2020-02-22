import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

        let firebaseConfig = {
            apiKey: "AIzaSyAKfDjJ7156tuw5vFmNzQvfoVWYjpzlroY",
            authDomain: "reactapp-7eb07.firebaseapp.com",
            databaseURL: "https://reactapp-7eb07.firebaseio.com",
            projectId: "reactapp-7eb07",
            storageBucket: "reactapp-7eb07.appspot.com",
            messagingSenderId: "1094506070552",
            appId: "1:1094506070552:web:5dc47238770c527e4ef96d",
            measurementId: "G-C9HG10GLM2"
          };

class firebase{
    constructor(){
        app.initializeApp(firebaseConfig);
        // Referenciando a database para acessar em outros locais 
        this.app = app.database();

        this.storage = app.storage();
    }

    login(email, password){
        return app. auth().signInWithEmailAndPassword(email, password)
    }

    logout(){
        return app.auth().signOut();
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isInitialized(){
        return new Promise(resolve =>{
            app.auth().onAuthStateChanged(resolve);
        })

}

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null;
        }

        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid)
        .once('value').then(callback);
    }
}
    export default new firebase();