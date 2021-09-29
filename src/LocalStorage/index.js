import AsyncStorage from "@react-native-async-storage/async-storage";
class LocalStorage {
  getValueFromLocalStorage = (KEY, callback) => {
    AsyncStorage.getItem(KEY)
      .then((key) => {
        return JSON.parse(key);
      })
      .then((data) => {
        callback(data);
      });
  };
  setValueFromLocalStorage = async (KEY, data) => {
    let VALUE = await JSON.stringify(data);
    console.log("value-------------", VALUE);
    // console.log(VALUE);
    await AsyncStorage.setItem(KEY, VALUE);
  };
  deleteValueFromLocalStorage = async (KEY) => {
    await AsyncStorage.removeItem(KEY);
  };
}
const asyStorage = new LocalStorage();
export default asyStorage;
