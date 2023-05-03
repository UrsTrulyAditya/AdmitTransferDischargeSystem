import { makeAutoObservable } from 'mobx';

class Store {
  globalStatus='';
  roomRequest='';
  roomNo=0;


  constructor() {
    makeAutoObservable(this);
  }

  setGlobalState(status){
    this.globalStatus=status;
  }

  setRoomRequest(status){
    this.roomRequest=status;
  }

  setRoomNo(no){
    this.roomNo=no;
  }
}

const patientStore = new Store();

export default patientStore;
