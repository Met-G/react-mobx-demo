import { createContext, useContext } from 'react';
import LoginStore from './login.Store';

class RootStore {
  constructor() {
    this.loginStore = new LoginStore();
  }
}

const StoreContext = createContext(new RootStore());

export default function useStore() {
  return useContext(StoreContext);
};
