import Storage from '../storage';
import data1 from './data-1';
import data2 from './data-2';
import data3 from './data-3';
import data4 from './data-4';
import data5 from './data-5';
import data6 from './data-6';
import data7 from './data-7';
import data8 from './data-8';


export const loadData = () => {
    const models = Storage.getAllFromStorage();

    if (models.length === 0) {
        Storage.saveToStorage(data1);
        Storage.saveToStorage(data2);
        Storage.saveToStorage(data3);
        Storage.saveToStorage(data4);
        Storage.saveToStorage(data5);
        Storage.saveToStorage(data6);
        Storage.saveToStorage(data7);
        Storage.saveToStorage(data8);

        console.log('Example data imported into local storage !');
    }

    return Storage.getAllFromStorage();
};

