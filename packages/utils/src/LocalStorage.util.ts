// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Value = object | any[];
type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [property: string]: JSONValue }
  | JSONValue[];

const LocalStorageUtil = {
  // set a value in local storage
  set(key: string, value: Value) {
    if (Array.isArray(value)) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  // get a value from local storage
  get(key: string): Value | JSONValue | null {
    const value = localStorage.getItem(key);

    if (value === null) {
      return null;
    }

    console.log(value);

    try {
      return JSON.parse(value) as Value;
    } catch {
      return JSON.parse(value) as JSONValue;
    }
  },

  // update a value in local storage
  update(key: string, updatedValues: Value) {
    if (Array.isArray(updatedValues)) {
      // if the updated values are an array, replace the current value with the updated array
      this.set(key, updatedValues);
    } else {
      // if the updated values are an object, merge them into the current value
      const currentValue = this.get(key);

      if (currentValue === null) {
        return;
      }

      if (Array.isArray(currentValue)) {
        throw new Error("Cannot update array value with object values");
      } else {
        const updatedValue = { ...currentValue, ...updatedValues };

        this.set(key, updatedValue);
      }
    }
  },

  // delete a value from local storage
  remove(key: string) {
    localStorage.removeItem(key);
  },
};

export default LocalStorageUtil;
