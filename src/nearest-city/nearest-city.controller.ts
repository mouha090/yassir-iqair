/*eslint-disable*/

import { Controller, Get, Param, Query } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { get } from 'http';
import { map } from 'rxjs';
import { NearestCityDto } from './dto';
import { NearestCityService } from './nearest-city.service';

@Controller('nearest-city')
export class NearestCityController {

    constructor(private nearestCityService: NearestCityService) { }

    /**
     * @api {get} /air-quality/:latitude/:longitude Request Air Quality from a specific zone
     * @apiName GetAirQuality
     * @apiGroup NearestCity
     *
     * @apiParam {Number} latitude area's latitude.
     * @apiParam {Number} longitude area's longitude.

     *
     * @apiSuccess {Object} pollutionData Pollution data in a custom format.
    */
    @Get('/air-quality')
    getAirQualityFromZoneByLocation(@Query() coordinatesDto: NearestCityDto) {
        return this.nearestCityService.getAirQualityFromZoneByLocation(coordinatesDto)
    }



    /**
     * @api {get} /highly-polluted Request DateTime when the pollution in Paris is the highest
     * @apiName GetDateTime
     * @apiGroup NearestCity
     *
    
     *
     * @apiSuccess {Date} dateTime the dateTime when the pollution  in Paris is the highest
    */
    @Get('/highly-polluted')
    getDateTimeWhenParisIsTheMostPolluted() {
        return this.nearestCityService.getDateTimeWhenParisIsTheMostPolluted()
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async getParisAirQuality() {

        let parisCoordinate: NearestCityDto = {
            latitude: '48.856613',
            longitude: '2.352222'
        }

        this.nearestCityService.getAirQualityFromZoneByLocation(parisCoordinate)
            .subscribe(data => {
                this.nearestCityService.saveParisPollutionData(data)
            })


    }



}
