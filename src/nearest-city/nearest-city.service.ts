/*eslint-disable*/

import { HttpService } from '@nestjs/axios';
import { Catch, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { response } from 'express';
import { Model } from 'mongoose';
import { catchError, map, Observable } from 'rxjs';
import { NearestCityDto } from './dto';
import { City, CityDocument } from './schemas';

@Injectable()
export class NearestCityService {

    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
        @InjectModel(City.name) private cityModel: Model<CityDocument>
    ) {

    }

    /**
     * Get the air quality from a specific zone provided by location's coordinates
     * @param nearestCityDto 
     * @returns 
     */
    getAirQualityFromZoneByLocation = (coordinatesDto: NearestCityDto): Observable<any> => {
        let baseUrl = this.configService.get('IQAIR_API_URL')
        let apiKey = this.configService.get('API_KEY')


        return this.httpService
            .get(`${baseUrl}/nearest_city?lat=${parseInt(coordinatesDto.latitude)}&lon=${parseInt(coordinatesDto.longitude)}&key=${apiKey}`)
            .pipe(
                map(response => this.formatResponse(response.data.data.current.pollution)),
                catchError(e => { throw new HttpException(e.response.data, e.response.status); })
            )


    }

    /**
     * format the pollution data in the asked format
     * @param pollution 
     * @returns 
     */
    formatResponse = (pollution): Object => {
        return {
            "Result": {
                "Pollution": pollution
            }
        }
    }

    /**
     * Save in the database Paris pollution's data from IQAIR API 
     * @param pollutionData 
     */
    saveParisPollutionData = (pollutionData: Object) => {
        this.cityModel
        .create({
            pollutionData: pollutionData
        })
        .catch(e => { throw new HttpException(e.response.data, e.response.status); })
    }


    
    getDateTimeWhenParisIsTheMostPolluted = async () => {
        const data = await this.cityModel.find()
        let maxAqicn = data[0].pollutionData.Result.Pollution.aqicn
        let dateTimeMax = data[0].createdAt
        data.forEach(p => {
            let currentAqicn = p.pollutionData.Result.Pollution.aqicn
            if(currentAqicn > maxAqicn ){
                maxAqicn = currentAqicn
                dateTimeMax = p.createdAt
            }
            
        })

        return dateTimeMax
       
    }
}
