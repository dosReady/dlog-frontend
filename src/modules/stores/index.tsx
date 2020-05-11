import AppStore from 'modules/stores/AppStore';


class RootStore {
    public appStore:AppStore;

    constructor() {
        this.appStore = new AppStore(this);
    }
}

export default RootStore;