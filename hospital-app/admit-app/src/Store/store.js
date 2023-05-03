import { makeAutoObservable } from 'mobx';

class Store {
  account = null;
  contactUsModal = false;
  allRooms = [];
  constructor() {
    makeAutoObservable(this);
    const storedAccount = localStorage.getItem('account');
    if (storedAccount) {
      this.account = JSON.parse(storedAccount);
    }
  }

  setAccount(accountDetails) {
    this.account = accountDetails;
    localStorage.setItem('account', JSON.stringify(accountDetails));
  }

  setContactusModal() {
    this.contactUsModal = true;
  }

  setAllRooms(rooms){
    this.allRooms=rooms;
  }
}

const appStore = new Store();

export default appStore;
