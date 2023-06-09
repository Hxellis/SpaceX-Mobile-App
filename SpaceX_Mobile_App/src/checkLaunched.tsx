import AsyncStorage from "@react-native-async-storage/async-storage";

//stored into local data
export const storeData = async(key:any, value:any) => {
    try {
        await AsyncStorage.setItem(key, value);
    }
    catch(error) {
        console.log("Can't store data: " + error);
    }
}

//gets local data
export const getItemFor = async (key:any) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if(value !== null) {
            return value;
        }
    }
    catch(error) {
        console.log("Can't get data: " + error)
    }
}