/*eslint-disable*/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NearestCityController } from './nearest-city.controller';
import { NearestCityService } from './nearest-city.service';
import { City, CitySchema } from './schemas';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([
    {
      name: City.name, schema: CitySchema
    }
  ])],
  controllers: [NearestCityController],
  providers: [NearestCityService]
})
export class NearestCityModule { }
