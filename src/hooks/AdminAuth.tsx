import { useEffect } from "react";
import getFirebaseConfig from "../modules/FirebaseConfig";
import firebase from "firebase/compat/app";
import {Routes, Route, useNavigate} from "react-router-dom";


export default function AdminAuth(){
    firebase.initializeApp(getFirebaseConfig());
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user:firebase.User | null)=> {
            console.log(user?.email);
        })
    })
    return (<div className="App">
        <Routes>
            <Route path="adminPortal" element={<div></div>}/>
            <Route path="/" element={<div></div>}/>
        </Routes>
    </div>);
}