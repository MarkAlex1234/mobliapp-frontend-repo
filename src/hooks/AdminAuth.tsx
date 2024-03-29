import { useEffect,useState } from "react";
import getFirebaseConfig from "../modules/FirebaseConfig";
import firebase from "firebase/compat/app";
import {Auth, User, getAuth} from "firebase/auth";
import {Routes, Route, useNavigate,Navigate, NavigateFunction} from "react-router-dom";
import SignIn from "../components/SignIn";
import AdminPortal from "../pages/AdminPortal";
import {Button} from "@mui/material";

export default function AdminAuth(){
    document.title = "admin login";
    const app:firebase.app.App = firebase.initializeApp(getFirebaseConfig());
    const auth:Auth = getAuth(app);
    const user:firebase.User | null = firebase.auth().currentUser;
    const[login,setLogin] = useState(user !== null);
    const navigator:NavigateFunction = useNavigate();
    function signOut():void{
        navigator("/login");
        firebase.auth().signOut();
    }

    useEffect(()=> {
        auth.onAuthStateChanged((user:User | null)=> {
            //if the user is currently active
            if(user !== null){
                setLogin(user !== null);
            }else{
                //if the user is not currently active
                setLogin(user !== null);
            }
        });
      
    },[login,user,auth])
    return (<div className="App">
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            {/* pass the method inside here. */}
            <Route path="/login" element={<SignIn/>}/>
            {login ? <Route path= "/admin-portal" element={<AdminPortal onClick={signOut}/>}/>: <></> }
        </Routes>
    </div>);
}
//<div>what bitch<Button onClick={signOut}>SO</Button></div>
