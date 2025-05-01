import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from '../../src/users/users.resolver';
import { UsersService } from '../../src/users/users.service';

import { JwtAuthGuard } from '../../src/common/guards/jwt-auth.guard';

import { User } from '../../src/users/entities/user.entity';



describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService: UsersService;

  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedPassword',
  };

  const mockUsersService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    usersService = module.get<UsersService>(UsersService);
    
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('me', () => {
    it('should return the current authenticated user', async () => {
      const currentUser = { ...mockUser };
      
      const result = await resolver.me(currentUser as User);
      
      expect(result).toEqual(currentUser);
    });
  });

  describe('findById', () => {
    it('should return a user by ID', async () => {
      mockUsersService.findById.mockResolvedValue(mockUser);
      
      const result = await resolver.findById(1);
      
      expect(usersService.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });

    it('should propagate errors from usersService', async () => {
      const error = new Error('User not found');
      mockUsersService.findById.mockRejectedValue(error);
      
      await expect(resolver.findById(999)).rejects.toThrow('User not found');
      expect(usersService.findById).toHaveBeenCalledWith(999);
    });
  });

  it('should have the JwtAuthGuard on the me method', () => {
    const guards = Reflect.getMetadata('__guards__', resolver.me);
    expect(guards).toBeDefined();
    expect(guards[0]).toBe(JwtAuthGuard);
  });
  
  it('should have the JwtAuthGuard on the findById method', () => {
    const guards = Reflect.getMetadata('__guards__', resolver.findById);
    expect(guards).toBeDefined();
    expect(guards[0]).toBe(JwtAuthGuard);
  });
});