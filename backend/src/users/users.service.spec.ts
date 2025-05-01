import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../src/users/users.service';
import { User } from '../../src/users/entities/user.entity';


jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedPassword',
  };

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a user if found', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findById(1);
      
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findById(999)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('findByUsername', () => {
    it('should return a user if found', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findByUsername('testuser');
      
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { username: 'testuser' } });
      expect(result).toEqual(mockUser);
    });

    it('should return null if user is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findByUsername('nonexistent');
      
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { username: 'nonexistent' } });
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const hashedPassword = 'hashedPassword123';
      const newUser = {
        username: 'newuser',
        email: 'new@example.com',
        password: hashedPassword,
      };
      
      const savedUser = {
        id: 2,
        ...newUser,
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      
      mockRepository.create.mockReturnValue(newUser);
      mockRepository.save.mockResolvedValue(savedUser);

      const result = await service.createUser('newuser', 'new@example.com', 'password123');
      
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockRepository.create).toHaveBeenCalledWith({
        username: 'newuser',
        email: 'new@example.com',
        password: hashedPassword,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(newUser);
      expect(result).toEqual(savedUser);
    });
  });
});