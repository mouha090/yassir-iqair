import { Test, TestingModule } from '@nestjs/testing';
import { NearestCityController } from './nearest-city.controller';

describe('NearestCityController', () => {
  let controller: NearestCityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NearestCityController],
    }).compile();

    controller = module.get<NearestCityController>(NearestCityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
