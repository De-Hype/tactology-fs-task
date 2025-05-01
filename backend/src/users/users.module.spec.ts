import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersModule } from '../../src/users/users.module';
import { UsersService } from '../../src/users/users.service';
import { User } from '../../src/users/entities/user.entity';
import { UsersResolver } from '../../src/users/users.resolver';

describe('UsersModule', () => {
  let module: TestingModule;

  const mockRepository = {};

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersResolver,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should provide UsersService', () => {
    const service = module.get<UsersService>(UsersService);
    expect(service).toBeDefined();
  });

  it('should provide UsersResolver', () => {
    const resolver = module.get<UsersResolver>(UsersResolver);
    expect(resolver).toBeDefined();
  });

  it('should export UsersService', () => {
    const service = module.get<UsersService>(UsersService);
    expect(service).toBeInstanceOf(UsersService);
  });
});