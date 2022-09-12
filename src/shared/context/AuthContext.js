import jwtDecode from "jwt-decode";
import { createContext, useContext } from "react";
import { store } from "../../apps/Storage";
import { KEY } from "../constants/StoreConstants";
import { useDep } from "./DependencyContext";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
   const { authService } = useDep();
   const onLogin = async (userCred) => {
      try {
         const response = await authService.doLogin(userCred);
         if (response.status === 200) {
            const decodedToken = jwtDecode(response.data.data);
            await store.storeData(KEY.TOKEN, response.data.data);
            await store.storeData(KEY.EXPIRED, `${decodedToken.exp}`);
            await store.storeData(KEY.USER_NAME, decodedToken.userName);
            await store.storeData(KEY.ACCOUNT_ID, `${decodedToken.account_id}`);
            await store.storeData(KEY.ROLE_ID, `${decodedToken.role_id}`);
            return true;
         }
      } catch (e) {
         throw e;
      }
   };

   const isTokenExist = async () => {
      try {
         const token = await store.getData(KEY.TOKEN,)
         return !!token;
      } catch (e) {
         throw e;
      }
   }

   const onLogout = async () => {
      try {
         const response = await authService.doLogout();
         if (response.status === 200) {
            await store.deleteData(KEY.TOKEN);
            await store.deleteData(KEY.EXPIRED);
            await store.deleteData(KEY.USER_NAME);
            await store.deleteData(KEY.ACCOUNT_ID);
            await store.deleteData(KEY.ROLE_ID);
            return true;
         }
      } catch (e) {
         throw e;
      }
   };
   return <AuthContext.Provider value={{ onLogin, onLogout, isTokenExist }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   return useContext(AuthContext);
};