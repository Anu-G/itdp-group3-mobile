import jwtDecode from "jwt-decode";
import { createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import { storage } from "../../apps/Storage";
import { login, logout } from "../../features/Login/Slice/AuthSlice";
import { removeProfile } from "../../features/Profile/Slice/ProfileSlice";
import { KEY } from "../constants/StoreConstants";
import { useDep } from "./DependencyContext";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
   const { authService } = useDep();
   const dispatch = useDispatch();

   const onLogin = async (userCred) => {
      try {
         const response = await authService.doLogin(userCred);
         if (response.status === 200) {
            const decodedToken = jwtDecode(response.data.data);
            await storage.storeData(KEY.TOKEN, response.data.data);
            await storage.storeData(KEY.EXPIRED, `${decodedToken.exp}`);

            dispatch(login({
               userName: decodedToken.userName,
               accountId: decodedToken.account_id,
               roleId: decodedToken.role
            }));
            return true;
         }
      } catch (e) {
         throw e;
      }
   };

   const isTokenExist = async () => {
      try {
         const token = await storage.getData(KEY.TOKEN,)
         if (await storage.getData(KEY.EXPIRED) * 1000 <= Date.now()) {
            return false;
         } else {
            return !!token;
         }
      } catch (e) {
         throw e;
      }
   }

   const onLogout = async () => {
      try {
         const response = await authService.doLogout();
         if (response.status === 200) {
            await storage.deleteData(KEY.TOKEN);
            await storage.deleteData(KEY.EXPIRED);

            dispatch(logout());
            dispatch(removeProfile());
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