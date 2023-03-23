import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    connected(): string;
    getBusDetails(busId: string): Promise<any>;
    getBusLocation(): string;
    updateBusLocation(): string;
    getBusOnTripByID(routeId: string): Promise<any>;
    getAllActiveBusesByRouteId(routeId: string): Promise<any>;
    getAllStops(): Promise<any>;
    getStopById(stopId: string): Promise<any>;
    getAllActiveBuses(): Promise<any>;
    getActiveBusLocationById(busId: string): Promise<any>;
    getTripUpdatesById(tripId: string): Promise<any>;
}
