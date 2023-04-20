import { valueToPercent } from "@mui/base";
import axios, { AxiosResponse } from "axios";
import { busDataType } from "../interface/busDataType";
import { testData } from "./test";



export async function getActiveBusID(busId:string){
  try{
    const response = await axios.get(`http://localhost:8000/bus/active/${busId}`, {
      headers: {
        "Access-Control-Allow-Origin": "*", // allow requests from any origin
        "Access-Control-Allow-Methods": "GET", // allow only GET requests
        "Access-Control-Allow-Headers": "Content-Type", // allow requests with Content-Type header
      },
    }).then((data) =>{return data.data});
    console.log("bus:active");
    return response;

  }catch(error){
    console.error(`error: ${error}`)
    throw error;
  }
}



export async function getAllActiveBuses(){
  try{
    const response = await axios.get("http://localhost:8000/bus/active/all", {
      headers: {
        "Access-Control-Allow-Origin": "*", // allow requests from any origin
        "Access-Control-Allow-Methods": "GET", // allow only GET requests
        "Access-Control-Allow-Headers": "Content-Type", // allow requests with Content-Type header
      },
    }).then((data) =>{return data});
    console.log("bus-all:active");
    return response;

  }catch(error){
    console.error(`error: ${error}`)
    throw error;
  }
}