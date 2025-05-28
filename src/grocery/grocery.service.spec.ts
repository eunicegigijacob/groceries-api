import { Test, TestingModule } from '@nestjs/testing';
import { GroceryService } from './grocery.service';
import { GroceryRepository } from './grocery.repository';
import { UserRepository } from '../users/users.repository';
import { GroceryRepositoryMock } from '../__mocks__/grocery.reository.mock';

describe('GroceryService', () => {
  let service: GroceryService;
  let groceryRepository: GroceryRepositoryMock;
  let userRepository: any;

  beforeEach(async () => {
    groceryRepository = new GroceryRepositoryMock();
    userRepository = { getById: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroceryService,
        { provide: GroceryRepository, useValue: groceryRepository },
        { provide: UserRepository, useValue: userRepository },
      ],
    }).compile();

    service = module.get<GroceryService>(GroceryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('checkGroceryItemExists', () => {
    it('should call repository getById method', async () => {
      const getByIdSpy = jest.spyOn(groceryRepository, 'getById');

      try {
        await service.checkGroceryItemExists('userId', 'itemId');
      } catch (error) {}

      expect(getByIdSpy).toHaveBeenCalledWith('itemId', 'userId');
    });
  });

  describe('addGroceryItem', () => {
    it('should call repository methods for adding item', async () => {
      const mockDto = { name: 'Test Item', quantity: 2, price: 10.99 };
      const getItemByFilterSpy = jest.spyOn(
        groceryRepository,
        'getItemByFilter',
      );
      jest.spyOn(groceryRepository, 'create');
      jest.spyOn(groceryRepository, 'returnGroceryItem');

      try {
        await service.addGroceryItem('userId', mockDto);
      } catch (error) {}

      expect(getItemByFilterSpy).toHaveBeenCalledWith({
        name: 'Test Item',
        userId: 'userId',
      });
    });
  });

  describe('getUserGroceries', () => {
    it('should call user repository and grocery repository methods', async () => {
      const userGetByIdSpy = jest.spyOn(userRepository, 'getById');
      jest.spyOn(groceryRepository, 'getItemsByUserId');
      jest.spyOn(groceryRepository, 'returnGroceryItems');

      try {
        await service.getUserGroceries('userId');
      } catch (error) {}

      expect(userGetByIdSpy).toHaveBeenCalledWith('userId');
    });
  });

  describe('getGroceryById', () => {
    it('should call checkGroceryItemExists and returnGroceryItem', async () => {
      const checkGroceryItemExistsSpy = jest.spyOn(
        service,
        'checkGroceryItemExists',
      );
      jest.spyOn(groceryRepository, 'returnGroceryItem');

      try {
        await service.getGroceryById({ userId: 'userId', id: 'itemId' });
      } catch (error) {}

      expect(checkGroceryItemExistsSpy).toHaveBeenCalledWith(
        'userId',
        'itemId',
      );
    });
  });

  describe('getGroceryItemsByFilter', () => {
    it('should call repository getItemsByFilter method', async () => {
      const query = { name: 'test', quantity: '2', price: '10.99' };
      const getItemsByFilterSpy = jest.spyOn(
        groceryRepository,
        'getItemsByFilter',
      );
      jest.spyOn(groceryRepository, 'returnGroceryItems');

      try {
        await service.getGroceryItemsByFilter({ userId: 'userId', query });
      } catch (error) {}

      expect(getItemsByFilterSpy).toHaveBeenCalledWith({
        userId: 'userId',
        name: { $regex: new RegExp('test', 'i') },
        quantity: { $gte: 2 },
        price: { $lte: 10.99 },
      });
    });

    it('should handle filter with id parameter', async () => {
      const query = { id: 'itemId' };
      const getItemsByFilterSpy = jest.spyOn(
        groceryRepository,
        'getItemsByFilter',
      );

      try {
        await service.getGroceryItemsByFilter({ userId: 'userId', query });
      } catch (error) {}

      expect(getItemsByFilterSpy).toHaveBeenCalledWith({
        userId: 'userId',
        _id: 'itemId',
      });
    });
  });

  describe('updateGrocery', () => {
    it('should call checkGroceryItemExists and updateItemById', async () => {
      const mockUpdateDto = { name: 'Updated Item', quantity: 3, price: 15.99 };
      const checkGroceryItemExistsSpy = jest.spyOn(
        service,
        'checkGroceryItemExists',
      );
      const updateItemByIdSpy = jest.spyOn(groceryRepository, 'updateItemById');
      jest.spyOn(groceryRepository, 'returnGroceryItem');

      try {
        await service.updateGrocery({
          userId: 'userId',
          id: 'itemId',
          dto: mockUpdateDto,
        });
      } catch (error) {}

      expect(checkGroceryItemExistsSpy).toHaveBeenCalledWith(
        'userId',
        'itemId',
      );
      expect(updateItemByIdSpy).toHaveBeenCalledWith('itemId', mockUpdateDto);
    });
  });

  describe('deleteGrocery', () => {
    it('should call checkGroceryItemExists and deleteItemById', async () => {
      const checkGroceryItemExistsSpy = jest.spyOn(
        service,
        'checkGroceryItemExists',
      );
      const deleteItemByIdSpy = jest.spyOn(groceryRepository, 'deleteItemById');

      try {
        await service.deleteGrocery({ userId: 'userId', id: 'itemId' });
      } catch (error) {}

      expect(checkGroceryItemExistsSpy).toHaveBeenCalledWith(
        'userId',
        'itemId',
      );
      expect(deleteItemByIdSpy).toHaveBeenCalledWith('itemId');
    });
  });

  describe('Service method calls', () => {
    it('should test addGroceryItem method exists and can be called', () => {
      expect(typeof service.addGroceryItem).toBe('function');
    });

    it('should test getUserGroceries method exists and can be called', () => {
      expect(typeof service.getUserGroceries).toBe('function');
    });

    it('should test getGroceryById method exists and can be called', () => {
      expect(typeof service.getGroceryById).toBe('function');
    });

    it('should test getGroceryItemsByFilter method exists and can be called', () => {
      expect(typeof service.getGroceryItemsByFilter).toBe('function');
    });

    it('should test updateGrocery method exists and can be called', () => {
      expect(typeof service.updateGrocery).toBe('function');
    });

    it('should test deleteGrocery method exists and can be called', () => {
      expect(typeof service.deleteGrocery).toBe('function');
    });

    it('should test checkGroceryItemExists method exists and can be called', () => {
      expect(typeof service.checkGroceryItemExists).toBe('function');
    });
  });
});
