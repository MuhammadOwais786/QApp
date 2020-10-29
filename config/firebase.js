import * as firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDuIDILyFB6GdaYZAn1oH-0Tsxpa0b0qzs",
    authDomain: "qappbymowais.firebaseapp.com",
    databaseURL: "https://qappbymowais.firebaseio.com",
    projectId: "qappbymowais",
    storageBucket: "qappbymowais.appspot.com",
    messagingSenderId: "768430248689",
    appId: "1:768430248689:web:498d01a87c40eefbed8f50",
    measurementId: "G-WXRYVE5X3S"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

function registerUser(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
}

function loginUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}

function getSpecificCompany(companyId) {
    return db.collection('companiesData').doc(companyId).get()
    
}

function storage() {
    return firebase.storage()
}

function getCompanies(limit) {
    const ref = firebase.firestore().collection('companiesData').limit(limit).orderBy('companyName')
    // if (searchText) return ref.where('companyName', '==', searchText).get()
    return ref.get()
}


function getToken(companyId) {
    return db.collection('setToken')
        .where('userId', '==', companyId).get()
}

function getTodayToken(companyId) {
    return db.collection('CompanyInfo').doc(companyId).get()
}

export {
    getCompanies,
    registerUser,
    loginUser,
    getSpecificCompany,
    firebase,
    storage,
    getTodayToken,
    getToken
}