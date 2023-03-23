"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let AppService = class AppService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    connected() {
        return 'Connected';
    }
    async getRouteById(routeId) {
        try {
            const response = await this.httpService
                .get(`https://api.at.govt.nz/gtfs/v3/routes/${routeId}`, {
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
                },
            })
                .toPromise();
            return response.data.data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getBusDetailsFromFirebaseById(busId) {
        try {
            const snapshot = await admin.database().ref('/Bus/:busId').once('value');
            const data = snapshot.val();
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getAllActiveBusesByRouteId(routeId) {
        try {
            const response = await this.httpService
                .get('https://api.at.govt.nz/realtime/legacy/vehiclelocations', {
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
                },
            })
                .toPromise();
            const data = response.data.response.entity;
            const filteredData = data.filter((bus) => bus.vehicle.trip && bus.vehicle.trip.route_id === routeId);
            const activeBuses = filteredData.map((bus) => ({
                vehicleId: bus.id,
                latitude: bus.vehicle.position.latitude,
                longitude: bus.vehicle.position.longitude,
                timestamp: bus.vehicle.timestamp,
            }));
            console.log(activeBuses);
            return activeBuses;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
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
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getActiveBusLocationById(busId) {
        try {
            const response = await this.httpService
                .get(`https://api.at.govt.nz/realtime/legacy/vehiclelocations?vehicleid=${busId}`, {
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
                },
            })
                .toPromise();
            return response.data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
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
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getStopById(stopId) {
        try {
            const response = await this.httpService
                .get(`https://api.at.govt.nz/gtfs/v3/stops/${stopId}`, {
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
                },
            })
                .toPromise();
            return response.data.data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getTripUpdatesById(tripId) {
        try {
            const response = await this.httpService
                .get(`https://api.at.govt.nz/gtfs/v3/trips/${tripId}`, {
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
                },
            })
                .toPromise();
            return response.data.data;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({
                message: `Not found with ID ${tripId}`,
                status: common_1.HttpStatus.NOT_FOUND,
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map