import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { VEHICLE_TYPE } from './common/constants/common';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  connected(): string {
    return 'Connected';
  }

  /**
   *
   * @param routeId
   * @returns
   */
  async getRouteById(routeId: string) {
    try {
      const response = await this.httpService
        .get(`https://api.at.govt.nz/gtfs/v3/routes/${routeId}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
          },
        })
        .toPromise();

      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   *
   * @param busId
   * @returns
   */
  async getBusDetailsFromFirebaseById(busId: string) {
    try {
      const snapshot = await admin.database().ref('/Bus/:busId').once('value');
      const data = snapshot.val();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   *
   * @param busId
   * @returns
   */
  async getAllActiveBusesByRouteId(routeId: string) {
    try {
      const response = await this.httpService
        .get('https://api.at.govt.nz/realtime/legacy/vehiclelocations', {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
          },
        })
        .toPromise();

      const data = response.data.response.entity;

      // Filter out vehicles not on the specified route
      const filteredData = data.filter(
        (bus) => bus.vehicle.trip && bus.vehicle.trip.route_id === routeId,
      );

      // Map the remaining vehicles to a simplified format
      const activeBuses = filteredData.map((bus) => ({
        vehicleId: bus.id,
        latitude: bus.vehicle.position.latitude,
        longitude: bus.vehicle.position.longitude,
        timestamp: bus.vehicle.timestamp,
      }));

      console.log(activeBuses); // FOR DEBUGGING
      return activeBuses;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   *
   * @param busId
   * @returns
   */
  async getAllActiveBuses() {
    try {
      const response = await this.httpService
        .get('https://api.at.govt.nz/realtime/legacy/vehiclelocations', {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
          },
        })
        .toPromise();
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   *
   * @param busId
   * @returns
   */
  async getActiveBusLocationById(busId: string) {
    try {
      const response = await this.httpService
        .get(
          `https://api.at.govt.nz/realtime/legacy/vehiclelocations?vehicleid=${busId}`,
          {
            headers: {
              'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
            },
          },
        )
        .toPromise();
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   *
   * @param busId
   * @returns
   */
  async getAllStops() {
    try {
      const response = await this.httpService
        .get('https://api.at.govt.nz/gtfs/v3/stops', {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
          },
        })
        .toPromise();
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   *
   * @param busId
   * @returns
   */
  async getStopById(stopId: string) {
    try {
      const response = await this.httpService
        .get(`https://api.at.govt.nz/gtfs/v3/stops/${stopId}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
          },
        })
        .toPromise();
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   *
   * @param busId
   * @returns
   */
  async getTripUpdatesById(tripId: string) {
    try {
      const response = await this.httpService
        .get(`https://api.at.govt.nz/gtfs/v3/trips/${tripId}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
          },
        })
        .toPromise();
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          message: `Not found with ID ${tripId}`,
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
