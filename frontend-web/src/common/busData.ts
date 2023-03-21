import React from "react";
import { Logger } from "concurrently";
export const busDummyValue:any | busDataType = null;

// Initial datasets for bus data.
type busDataType ={
    busNumber:number,
    busStatus:boolean,
    busLocation:number[][],
    busTaggedCounts:number,
    busDestination:string,
    busRoutes: string,
    busFailedCounts:number,
    busDate:string,
    APP_ID:number,
} 
//initial data set for bus Report
type busReport = {
    totalActiveBuses:number,
    busAreaIdentifier:string,
}
//Initial data set for bus Route
type busRoute = {
    routes:string,
}
export const busData:any | busDataType = (tempData:busDataType):any => {
    console.log(tempData ?  "not null" : "null");
    const tempSets = "\nbusNumber: " 
    + tempData.busNumber 
    + "\nbusStatus "
    + tempData.busStatus
    + "\nbusLocation: " 
    + tempData.busLocation 
    + "\nbusTaggedCounts: "
    + tempData.busTaggedCounts
    + "\nbusDestination: " 
    + tempData.busDestination 
    + "\nbusRoutes: "
    + tempData.busRoutes
    + "\nbusFailedCounts: "
    + tempData.busFailedCounts
    + "\nbusDate: "
    + tempData.busDate
    + "\nAPP_ID: "
    + tempData.APP_ID;
    return tempSets;
}
