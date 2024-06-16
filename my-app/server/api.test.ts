import MockAdapter from 'axios-mock-adapter';
import { createSession, getUserVehicles, deleteUserVehicle, getUserInfo, api } from './api';

describe('API functions', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.reset();
  });

  test('createSession should return data on success', async () => {
    const cpf = '123456789';
    const senha = 'password';
    const mockResponse = { token: 'abc123' };

    mock.onPost('/user/login').reply(200, mockResponse);

    const response = await createSession(cpf, senha);
    expect(response).toEqual(mockResponse);
  });

  test('createSession should throw error on failure', async () => {
    const cpf = '123456789';
    const senha = 'password';

    mock.onPost('/user/login').reply(500);

    await expect(createSession(cpf, senha)).rejects.toThrow();
  });

  test('getUserVehicles should return data on success', async () => {
    const userId = 1;
    const mockResponse = [{ id: 1, name: 'Car1' }];

    mock.onGet(`/vehicle/getUserVehicles/${userId}`).reply(200, mockResponse);

    const response = await getUserVehicles(userId);
    expect(response).toEqual(mockResponse);
  });

  test('getUserVehicles should throw error on failure', async () => {
    const userId = 1;

    mock.onGet(`/vehicle/getUserVehicles/${userId}`).reply(500);

    await expect(getUserVehicles(userId)).rejects.toThrow();
  });

  test('deleteUserVehicle should not throw error on success', async () => {
    const carId = 1;

    mock.onDelete(`/vehicle/delete/${carId}`).reply(200);

    await expect(deleteUserVehicle(carId)).resolves.not.toThrow();
  });

  test('deleteUserVehicle should throw error on failure', async () => {
    const carId = 1;

    mock.onDelete(`/vehicle/delete/${carId}`).reply(500);

    await expect(deleteUserVehicle(carId)).rejects.toThrow();
  });

  test('getUserInfo should return data on success', async () => {
    const userId = 1;
    const mockResponse = { id: 1, name: 'User1' };

    mock.onGet(`/user/getId/${userId}`).reply(200, mockResponse);

    const response = await getUserInfo(userId);
    expect(response).toEqual(mockResponse);
  });

  test('getUserInfo should throw error on failure', async () => {
    const userId = 1;

    mock.onGet(`/user/getId/${userId}`).reply(500);

    await expect(getUserInfo(userId)).rejects.toThrow();
  });
});
