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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    connected() {
        return this.appService.connected();
    }
    async getBusDetails(busId) {
        return this.appService.getBusDetailsFromFirebaseById(busId);
    }
    getBusLocation() {
        return this.appService.connected();
    }
    updateBusLocation() {
        return this.appService.connected();
    }
    async getBusOnTripByID(routeId) {
        return this.appService.getRouteById(routeId);
    }
    getAllActiveBusesByRouteId(routeId) {
        return this.appService.getAllActiveBusesByRouteId(routeId);
    }
    getAllStops() {
        return this.appService.getAllStops();
    }
    getStopById(stopId) {
        return this.appService.getStopById(stopId);
    }
    getAllActiveBuses() {
        return this.appService.getAllActiveBuses();
    }
    getActiveBusLocationById(busId) {
        return this.appService.getActiveBusLocationById(busId);
    }
    getTripUpdatesById(tripId) {
        return this.appService.getTripUpdatesById(tripId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "connected", null);
__decorate([
    (0, common_1.Get)('bus/:busId/details'),
    __param(0, (0, common_1.Param)('busId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getBusDetails", null);
__decorate([
    (0, common_1.Get)('bus/:busId/location'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getBusLocation", null);
__decorate([
    (0, common_1.Patch)('bus/:busId/update-location'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateBusLocation", null);
__decorate([
    (0, common_1.Get)('route/:routeId'),
    __param(0, (0, common_1.Param)('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getBusOnTripByID", null);
__decorate([
    (0, common_1.Get)('active-buses/route/:routeId'),
    __param(0, (0, common_1.Param)('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAllActiveBusesByRouteId", null);
__decorate([
    (0, common_1.Get)('stops/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAllStops", null);
__decorate([
    (0, common_1.Get)('stops/:stopId'),
    __param(0, (0, common_1.Param)('stopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getStopById", null);
__decorate([
    (0, common_1.Get)('bus/active/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAllActiveBuses", null);
__decorate([
    (0, common_1.Get)('bus/active/:busId'),
    __param(0, (0, common_1.Param)('busId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getActiveBusLocationById", null);
__decorate([
    (0, common_1.Get)('trip/:tripId'),
    __param(0, (0, common_1.Param)('tripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getTripUpdatesById", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map