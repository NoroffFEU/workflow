/** 
* @param {string} key Name of the key to be retrieved
* @returns {any} JSON state value from storage
* @example
* const basketState = storage.load('basket');
**/
const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
}

/** 
* @param {string} key Name of the key to be retrieved
* @param {string} state State to be saved
* @example
* storage.save('basket', ["banana", "apple"]);
**/
export const save = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch {
    console.warn(`Unable to save state to localStorage for key: ${key}`);
  }
}

/** 
* @param {string} key Name of the key to be retrieved
* @example
* storage.remove('basket');
**/
export const remove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    console.warn(`Unable to remove state from localStorage for key: ${key}`);
  }
}

export default {
  load,
  save,
  remove
}