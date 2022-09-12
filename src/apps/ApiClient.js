import axios from "axios";
import Constants from 'expo-constants';
import { authInterceptor } from "../shared/interceptors/AuthInterceptor";

export const clientInstance = axios.create({
   baseURL: Constants.manifest?.extra?.baseURL
});
clientInstance.interceptors.request.use(authInterceptor);