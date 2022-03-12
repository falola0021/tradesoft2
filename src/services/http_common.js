import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getAccessTokenFromStorage = () =>
  new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      
      resolve(value);
    } catch (error) {
      console.warn(error);
    }
  });

export const setHeaders = async (headers = null) => {
  let headerType = await AsyncStorage.getItem('headerType')
  let headerData
  
  return getAccessTokenFromStorage().then((token) => {
         headerData = {
        "Content-type": "application/json",
        Accept: 'application/json',
        ...(token && { Authorization: `Bearer ${token.toString()}` }),
      }
    
  
    if (headers) {
      headerData = { ...headerData, ...headers }
    }
 
    return headerData
  })
}


 const createAxios  = async () => {
let header =await setHeaders()

return axios.create({
   baseURL: "https://portal.trade-soft.co.uk/api/v3",
   //'https://dev.trade-soft.co.uk/api/v3',
 
   headers: header
})
}

 export default createAxios
