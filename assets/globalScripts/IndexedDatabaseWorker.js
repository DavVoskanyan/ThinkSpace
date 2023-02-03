// noteObjectModel = {
//   id: 12,
//   title: "title",
//   text: 'text',
//   date: new Date()
// }



class IndexedDatabaseWorker {
  #idbName;
  #idbVersion;
  #ALL_STORE_NAMES;
  #dbStoresAsMap;


  constructor(idbName, idbVersion) {
    this.idbName = idbName;
    this.idbVersion = idbVersion;

    this.#ALL_STORE_NAMES = ['notesStore'];

    this.#dbStoresAsMap = new Map();
    this.#updateStoreInfoInMap('notesStore');
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
      this.#updateStoreInfoInMap(storeName);
    }
  }

  #updateStoreInfoInMap(storeName) {
    const openIdbRequest = indexedDB.open(this.idbName, this.idbVersion);
    const objectsArray = [];

    openIdbRequest.onerror = () => {
      console.error('Can not connect to IndexedDB.');
    }
    openIdbRequest.onupgradeneeded = () => {
      console.log('Updating IndexedDB');
      openIdbRequest.result.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
    }
    openIdbRequest.onsuccess = async () => {
      console.log('Successfully connected to IndexedDB');

      const writeTransaction = openIdbRequest.result.transaction(storeName, 'readonly');

      writeTransaction.onerror = () => console.error('Con not make transaction');

      const currentObjectStore = writeTransaction.objectStore(storeName);
      const readRequest = currentObjectStore.getAll();

      readRequest.onsuccess = () => {
        readRequest.result.forEach(object => {
          objectsArray.push(object);
        })
        this.#dbStoresAsMap[storeName] = objectsArray;
      }
    }
  }
  async getAllObjectsFromStore(storeName) {
    return await this.#dbStoresAsMap[storeName];
  }




}

export default (new IndexedDatabaseWorker('ThinkSpace', 1));
