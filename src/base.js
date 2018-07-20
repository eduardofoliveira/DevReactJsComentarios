import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAmoRk9lkROzrPUHCWjO54WmW7uqiGeYKI",
    authDomain: "reactjs-a9dd2.firebaseapp.com",
    databaseURL: "https://reactjs-a9dd2.firebaseio.com",
    projectId: "reactjs-a9dd2",
    storageBucket: "reactjs-a9dd2.appspot.com",
    messagingSenderId: "948209811334"
})
const db = firebase.database(firebaseApp)
const base = Rebase.createClass(db)

export const providers = {
    'facebook': new firebase.auth.FacebookAuthProvider()
}

export const auth = firebaseApp.auth()
export default base