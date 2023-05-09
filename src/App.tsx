import React from 'react';
import './App.css';
import getFirebaseConfig from './modules/FirebaseConfig';
import AdminAuth from './hooks/AdminAuth';

function App() {
  return AdminAuth();
}

export default App;
