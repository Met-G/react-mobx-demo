import { createContext, useContext } from 'react';
import LoginStore from './login.Store';
import UserStore from './user.Store';
import ChannelStore from './channel.Store';

class RootStore {
  constructor() {
    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
    this.channelStore = new ChannelStore()
  }
}

const StoreContext = createContext(new RootStore());

export default function useStore() {
  return useContext(StoreContext);
};
