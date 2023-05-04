import React,{useEffect} from 'react'
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css';
import logo from '../../assets/images/png/mobli.png';
const AuthGoogle = (props:any) => {
    useEffect(()=>{
        document.title = "admin login";
        const ui:any = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(props.auth);
        ui.start(".firebase-auth-container", {
            signInOptions:[
                {
                    provider:firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                }
            ],
            signInSuccessUrl: '/adminportal',
            privacyPolicyUrl: '<your-url>',
        });},[props.auth])
  return (<>
    <div style={{backgroundColor : "#73c2fb"}}><img src={logo} /></div>
    <div><h1>Mobli Admin Portal</h1></div>
    <div className={"firebase-auth-container"}></div>
    </>
  )
}

export default AuthGoogle