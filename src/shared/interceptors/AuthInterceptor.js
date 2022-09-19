import { storage } from "../../apps/Storage";
import { KEY } from "../constants/StoreConstants";

export const authInterceptor = async (config) => {
   if (config.url !== '/auth/login') {
      const token = await storage.getData(KEY.TOKEN);
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
}