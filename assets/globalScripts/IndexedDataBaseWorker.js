
// const openRequest = indexedDB.open('ThinkSpace', 2);


class IndexedDataBaseWorker {
  #idbName;
  #idbVersion;


  constructor(idbName, idbVersion) {
    this.idbName = idbName;
    this.idbVersion = idbVersion;

  }

  setNewObject(storeName, needToSetObject) {
    const openIdbRequest = indexedDB.open(this.idbName, this.idbVersion);

    openIdbRequest.onerror = () => {
      console.error('Can not connect to IndexedDB.');
    }
    openIdbRequest.onupgradeneeded = () => {
      console.log('Updating IndexedDB');
      openIdbRequest.result.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
    }
    openIdbRequest.onsuccess = () => {
      console.log('Successfully connected to IndexedDB');

      const writeTransaction = openIdbRequest.result.transaction(storeName, 'readwrite');

      writeTransaction.onerror = () => console.error('Con not make transaction');

      const currentObjectStore = writeTransaction.objectStore(storeName);
      const writeRequest = currentObjectStore.add(needToSetObject);
    }
  }

  getAllObjects(storeName) {
    const openIdbRequest = indexedDB.open(this.idbName, this.idbVersion);
    let objectsArray = [];

    openIdbRequest.onerror = () => {
      console.error('Can not connect to IndexedDB.');
    }
    openIdbRequest.onupgradeneeded = () => {
      console.log('Updating IndexedDB');
      openIdbRequest.result.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
    }
    openIdbRequest.onsuccess = () => {
      console.log('Successfully connected to IndexedDB');

      const writeTransaction = openIdbRequest.result.transaction(storeName, 'readonly');

      writeTransaction.onerror = () => console.error('Con not make transaction');

      const currentObjectStore = writeTransaction.objectStore(storeName);
      const readRequest = currentObjectStore.getAll();

      readRequest.onsuccess = () => {
        readRequest.result.forEach(object => {
          objectsArray.push(object);
        })
      }
    }

    return objectsArray;
  }


}

export default IndexedDataBaseWorker;
