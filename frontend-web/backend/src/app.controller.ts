import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  connected(): string {
    return this.appService.connected();
  }

  /**
   * Endpoint to get bus details by bus ID
   * @returns
   */
  @Get('bus/:busId/details')
  async getBusDetails(@Param('busId') busId: string) {
    return this.appService.getBusDetailsFromFirebaseById(busId);
  }

  /**
   *
   * @returns
   */
  @Get('bus/:busId/location')
  getBusLocation() {
    return this.appService.connected();
  }

  /**
   *
   * @returns
   */
  @Patch('bus/:busId/update-location')
  updateBusLocation() {
    return this.appService.connected();
  }

  /**
   * Endpoint to get route details by route ID
   */
  @Get('route/:routeId')
  async getBusOnTripByID(@Param('routeId') routeId: string) {
    return this.appService.getRouteById(routeId);
  }

  /**
   * Endpoint to get active buses on a route by route ID
   * @returns
   */
  @Get('active-buses/route/:routeId')
  getAllActiveBusesByRouteId(@Param('routeId') routeId: string) {
    return this.appService.getAllActiveBusesByRouteId(routeId);
  }

  /**
   * Endpoint to get all stops
   * @returns
   */
  @Get('stops/all')
  getAllStops() {
    return this.appService.getAllStops();
  }

  /**
   * Endpoint to get a stop by ID
   * @returns
   */
  @Get('stops/:stopId')
  getStopById(@Param('stopId') stopId: string) {
    return this.appService.getStopById(stopId);
  }

  /**
   * Endpoint to get all active buses
   * @returns
   */
  @Get('bus/active/all')
  getAllActiveBuses() {
    return this.appService.getAllActiveBuses();
  }

  /**
   * Endpoint to get active bus by ID
   * @returns
   */
  @Get('bus/active/:busId')
  getActiveBusLocationById(@Param('busId') busId: string) {
    return this.appService.getActiveBusLocationById(busId);
  }

  /**
   * Endpoint to get trip updates by ID
   * @returns
   */
  @Get('trip/:tripId')
  getTripUpdatesById(@Param('tripId') tripId: string) {
    return this.appService.getTripUpdatesById(tripId);
  }
}
