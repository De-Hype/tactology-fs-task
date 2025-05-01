import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from '../../src/auth/auth.resolver';
import { AuthService } from '../../src/auth/auth.service';
import { LoginInput } from '../../src/auth/dto/login.input';
import { CreateUserInput } from '../../src/users/dto/create-user.input';
import { UsersService } from '../../src/users/users.service';


describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;
  let usersService: UsersService;

  const mockAuthService = {
    login: jest.fn(),
  };

  const mockUsersService = {
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserInput: CreateUserInput = {
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123',
      };

      const expectedUser = {
        id: 1,
        username: 'newuser',
        email: 'new@example.com',
      };

      mockUsersService.createUser.mockResolvedValue(expectedUser);

      const result = await resolver.createUser(createUserInput);

      expect(usersService.createUser).toHaveBeenCalledWith(
        'newuser',
        'new@example.com',
        'password123'
      );
      expect(result).toEqual(expectedUser);
    });
  });

  describe('login', () => {
    it('should return login response with token and user', async () => {
      const loginInput: LoginInput = {
        username: 'testuser',
        password: 'password123',
      };

      const expectedResponse = {
        accessToken: 'jwt-token',
        user: {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
        },
      };

      mockAuthService.login.mockResolvedValue(expectedResponse);

      const result = await resolver.login(loginInput);

      expect(authService.login).toHaveBeenCalledWith(loginInput);
      expect(result).toEqual(expectedResponse);
    });
  });
});