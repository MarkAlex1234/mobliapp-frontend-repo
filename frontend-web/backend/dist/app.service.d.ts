import { HttpService } from '@nestjs/axios';
export declare class AppService {
    private httpService;
    constructor(httpService: HttpService);
    connected(): string;
    getRouteById(routeId: string): Promise<any>;
    getBusDetailsFromFirebaseById(busId: string): Promise<any>;
    getAllActiveBusesByRouteId(routeId: string): Promise<any>;
    getAllActiveBuses(): Promise<any>;
    getActiveBusLocationById(busId: string): Promise<any>;
    getAllStops(): Promise<any>;
    getStopById(stopId: string): Promise<any>;
    getTripUpdatesById(tripId: string): Promise<any>;
}
