import { makeAutoObservable } from 'mobx';
import { http } from '@/utils';

export default class UserStore {
  userInfo = {}

  constructor() {
    makeAutoObservable(this)
  }

  async getUserInfo() {
    const res = await http.get('/user/profile');
    this.userInfo = res.data;
  }
}
