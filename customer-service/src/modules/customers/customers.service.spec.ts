import { Test, TestingModule } from '@nestjs/testing';
import { Customer, CustomersService } from './customers.service';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [CustomersService],
    }).compile();

    service = moduleRef.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.each`
    name       | returnVal
    ${'julia'} | ${{ userId: 1, username: 'julia', password: 'changeme' }}
  `(
    'should call findOne for $name and return $returnVal',
    async ({ name, returnVal }: { name: string; returnVal: Customer }) => {
      expect(await service.findOne(name)).toEqual(returnVal);
    },
  );
});
