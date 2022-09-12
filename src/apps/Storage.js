import * as SecureStore from 'expo-secure-store';
import { KEY } from '../shared/constants/StoreConstants';

export const Storage = () => {
   const storeData = async (key, value) => {
      try {
         await SecureStore.setItemAsync(key, value)
      } catch (e) {
         throw e
      }
   }

   const getData = async (key) => {
      try {
         const value = await SecureStore.getItemAsync(key);
         if (value !== null) {
            return value;
         }
      } catch (e) {
         throw e
      }
   }

   const deleteData = async (key) => {
      try {
         await SecureStore.deleteItemAsync(key)
      } catch (e) {
         throw e
      }
   }

   return {
      storeData, getData, deleteData
   }
}

export const store = Storage();