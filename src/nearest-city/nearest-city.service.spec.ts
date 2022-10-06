import { Test, TestingModule } from '@nestjs/testing';
import { NearestCityService } from './nearest-city.service';

describe('NearestCityService', () => {
  let service: NearestCityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NearestCityService],
    }).compile();

    service = module.get<NearestCityService>(NearestCityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
