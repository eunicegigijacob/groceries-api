export class GroceryRepositoryMock {
  async getById() {
    return jest.fn();
  }

  async getItemByFilter() {
    return jest.fn();
  }

  async create() {
    return jest.fn();
  }

  async getItemsByUserId() {
    return jest.fn();
  }

  async getItemsByFilter() {
    return jest.fn();
  }
  async updateItemById() {
    return jest.fn();
  }
  async deleteItemById() {
    return jest.fn();
  }

  async returnGroceryItem() {
    return jest.fn();
  }
  async returnGroceryItems() {
    return jest.fn();
  }
}
