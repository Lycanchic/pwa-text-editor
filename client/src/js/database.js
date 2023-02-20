import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const database = await openDB('jate', 1);
    const tx = database.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log('Data successfully saved');
  } catch (error) {
    console.error('Error while putting data to the database', error);
  }
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const database = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1);
    const result = await request; 
    if (result) {
      console.log('Data successfully retrieved', result.value);
      return result.value;
    } else {
      console.log('Data not found');
      return null;
    }
  } catch (error) {
    console.error('Error while getting data from the database', error);
    return null;
  }
};

initdb();