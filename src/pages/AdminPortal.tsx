import React from 'react'
import SideSettings from '../components/SideSettings'
import SideGraphView from '../components/SideGraphView'
import { Images } from '../modules/Logo'
import { postUser } from '../services/api/BusAPI';
import { UserInterface } from '../types/UserInterfaceTypes';
import { user, user1, user2 } from '../__TEST__/users';
const AdminPortal = (props: any) => {

  //Adding dummy user here


  // Call the postUser method
  postUser(user).then((response: any) => {
    // Handle the response
    console.log('User added:', response);
  })
    .catch((error: any) => {
      // Handle the error
      console.error('Error adding user:', error);
    });

  //postUser(user1).then((response: any) => {
  //  // Handle the response
  //  console.log('User added:', response);
  //})
  //  .catch((error: any) => {
  //    // Handle the error
  //    console.error('Error adding user:', error);
  //  });

  //postUser(user2).then((response: any) => {
  //  // Handle the response
  //  console.log('User added:', response);
  //})
  //  .catch((error: any) => {
  //    // Handle the error
  //    console.error('Error adding user:', error);
  //  });

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "white", width: "100%", height: "40px", zIndex: 1 }}>
        <SideSettings onClick={props.onClick} />
        <img src={Images.Mobli.url} style={{ width: "35px", height: "35px", position: "fixed", zIndex: 0 }} />
        <SideGraphView />
      </div>
    </React.Fragment>
  );
}

export default AdminPortal