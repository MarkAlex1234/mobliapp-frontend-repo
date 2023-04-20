import { profileEnd } from 'console';
import React,{useEffect,useState} from 'react';
import './App.css';
import AdminPortal from './pages/AdminPortal';
import firebase from 'firebase/compat/app';
import AuthGoogle from './components/auth/AuthGoogle';
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom';
// Import the functions you need from the SDKs you need
import serviceAccount from '../src/firebase.json';
import Authenticated from './components/auth/Authenticated';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig:any ={
     apiKey: serviceAccount.apiKey,
    authDomain: serviceAccount.authDomain,
    projectId: serviceAccount.projectId,
    storageBucket: serviceAccount.storageBucket,
    messagingSenderId: serviceAccount.messagingSenderId,
    appId: serviceAccount.appId,
    measurementId: serviceAccount.measurementId
}
// Initialize Firebase

function App() {
  firebase.initializeApp(firebaseConfig);
  const [user, setUser] = useState<{email: string, uid: string}>({email: "", uid: ""});

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((User:any)=>{
      console.log(User);
      if(User && User.email){
        setUser({email: User.email || "", uid: User.uid || ""});
      } else {
        setUser({email: "",uid: ""});
      }
    });
  }, []);
  const navigate = useNavigate(); // Define the `navigate` function

  const handleSignOut = () => {
    firebase.auth().signOut();
    setUser({email: null || "", uid: null ||""});
    navigate(-1);
    console.log(user); // add this line
  }
  
  return (
    <div className="App">
     
        <Routes>
          {user.email ? (
            <Route path="/authenticated" element={<Authenticated user={user} />} />
          ) : (
            <Route path="/" element={<AuthGoogle auth={firebase.auth()} />}/>
          )} 
        </Routes>
      
      <div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default App;
