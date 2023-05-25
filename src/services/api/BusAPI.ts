import axios from "axios";
import { UserInterface } from "../../types/UserInterfaceTypes";
export async function getActiveBusId(currentBusId: string) {
  try {
    const response = await axios
      .get(`http://localhost:8000/bus/active/${currentBusId}`, {
        headers: {
          "Access-Control-Allow-Origin": "", // allow requests from any origin
          "Access-Control-Allow-Methods": "GET", // allow only GET requests
          "Access-Control-Allow-Headers": "Content-Type", // allow requests with Content-Type header
        },
      })
      .then((data) => {
        return data.data;
      });
    console.log("bus:active");
    return response;
  } catch (error) {
    console.error(`error: ${error}`);
    throw error;
  }
}

export async function getAllActiveBuses() {
  try {
    const response = await axios
      .get("http://localhost:8000/bus/active/all", {
        headers: {
          "Access-Control-Allow-Origin": "", // allow requests from any origin
          "Access-Control-Allow-Methods": "GET", // allow only GET requests
          "Access-Control-Allow-Headers": "Content-Type", // allow requests with Content-Type header
        },
      })
      .then((data: any) => {
        return JSON.stringify(data);
      });
    console.log(JSON.parse(response));
    return JSON.parse(response);
  } catch (error) {
    console.error(`error: ${error}`);
    throw error;
  }
}

export async function getUserNearetBuses(userId:string) {
  try {
    const response = await axios
    // this Users/ user / USER ID
      .get(`http://localhost:8000/users/user/${userId}/nearest-buses`, {
        headers: {
          "Access-Control-Allow-Origin": "", // allow requests from any origin
          "Access-Control-Allow-Methods": "GET", // allow only GET requests
          "Access-Control-Allow-Headers": "Content-Type", // allow requests with Content-Type header
        },
      })
      .then((data: any) => {
        return JSON.stringify(data);
      });
    console.log(JSON.parse(response));
    return JSON.parse(response);
  } catch (error) {
    console.error(`error: ${error}`);
    throw error;
  }
}

export async function postUser(user: UserInterface) {
  try {
    const response = await axios.post("http://localhost:8000/users/create", user, {
      headers: {
        "Access-Control-Allow-Origin": "", // allow requests from any origin
        "Access-Control-Allow-Methods": "POST", // allow only POST requests
        "Access-Control-Allow-Headers": "Content-Type", // allow requests with Content-Type header
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error adding user: ${error}`);
    throw error;
  }
}
