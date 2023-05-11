export async function testData(data:any[]) {
    const tempData:any[] = data;
    try {
      // const tempData = data;
      // tempData.map((value:any)=> {
      //   console.log("VALUE:" + value.response.entity[0].vehicle.position.latitude);
      // })
     // console.log(JSON.stringify(tempData));
      return tempData;
    }
    catch (error) {
      console.error(error);
    }
  }