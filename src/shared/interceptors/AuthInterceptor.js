import { store } from "../../apps/Storage";
import { KEY } from "../constants/StoreConstants";

export const authInterceptor = async (config) => {
   if (config.url !== '/auth/login') {
      const token = await store.getData(KEY.TOKEN);
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
}