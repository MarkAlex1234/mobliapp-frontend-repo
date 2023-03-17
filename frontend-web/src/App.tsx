import { profileEnd } from 'console';
import React from 'react';
import './App.css';
import GoogleMapView from './components/GoogleMapView';
import GraphView from './components/GraphView';
import SearchBar from './components/SearchBar';
import SettingsBar from './components/SettingsBar';
import ViewLayer from './components/ViewLayer';
//bringing API KEYs
//console.log(process.env.DB_HOST);
function App() {
  let isActive = true;
  return (
    <div className="App">
      <SearchBar/>
      <GraphView/>
      <ViewLayer/>
      <SettingsBar/>
      <GoogleMapView/>
    </div>
  );
}

export default App;
