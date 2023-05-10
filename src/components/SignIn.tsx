import React, { useEffect, useRef } from "react";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { Card } from "@mui/material";

const SignIn: React.FC = () => {
  const uiRef:React.MutableRefObject<firebaseui.auth.AuthUI | null> = useRef<firebaseui.auth.AuthUI | null>(null);
  document.title = "admin login";
  useEffect(() => {
    const uiConfig:firebaseui.auth.Config = {
      signInOptions: [
        {provider:firebase.auth.EmailAuthProvider.PROVIDER_ID,
        disableSignUp:{
            status: true,
        }, }],
      signInSuccessUrl: '/admin-portal',
      privacyPolicyUrl: '<your-url>',
    };

    const ui:firebaseui.auth.AuthUI = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(getAuth());
    uiRef.current = ui;
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
      <div style={{marginTop: "10%"}} id="firebaseui-auth-container"></div>
  );
};

export default SignIn;