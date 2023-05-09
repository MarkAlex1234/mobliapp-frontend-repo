import Firebase from "../types/firebase_types";
import serviceAccount from "../services/auth/firebase.json";
export default function getFirebaseConfig(){
    const firebaseConfig:Firebase ={
        apiKey: serviceAccount.apiKey,
        authDomain: serviceAccount.authDomain,
        projectId: serviceAccount.projectId,
        storageBucket: serviceAccount.storageBucket,
        messagingSenderId: serviceAccount.messagingSenderId,
        appId: serviceAccount.appId,
        measurementId: serviceAccount.measurementId
    }
    return firebaseConfig as Firebase;
}