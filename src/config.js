import firebase from 'firebase'

export const appName = "advreact-alex"
export const firebaseConfig = {
    apiKey: "AIzaSyAnfWi4OFWJzxwcM8gsba3BDHMeVHJ-UjQ",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "201396372415"
}

firebase.initializeApp(firebaseConfig)