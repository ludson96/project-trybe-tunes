import { User } from '../types';

const USER_KEY = 'user';
const TIMEOUT = 200;
const SUCCESS_STATUS = 'OK';

const readUser = (): User => {
  if (typeof window === 'undefined') return { name: '' };
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : { name: '' };
};

const saveUser = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

const clearUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
  }
};

const simulateRequest = <T>(response: T) => (callback: (data: T) => void) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getUser = (): Promise<User> =>
  new Promise((resolve) => {
    const user = readUser();
    simulateRequest(user)(resolve);
  });

export const createUser = (user: Partial<User>): Promise<string> =>
  new Promise((resolve) => {
    const defaultUser: User = {
      name: '',
      email: '',
      image: '',
      description: '',
    };
    saveUser({ ...defaultUser, ...user });
    simulateRequest(SUCCESS_STATUS)(resolve);
  });

export const updateUser = (updatedUser: User): Promise<string> =>
  new Promise((resolve) => {
    saveUser({ ...updatedUser });
    simulateRequest(SUCCESS_STATUS)(resolve);
  });

export const logoutUser = (): Promise<string> =>
  new Promise((resolve) => {
    clearUser();
    simulateRequest(SUCCESS_STATUS)(resolve);
  });
