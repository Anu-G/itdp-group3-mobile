import { authService } from "./AuthService"


export const serviceFactory = (apiClient) => {
    return {
        authService: authService(apiClient)
    }
}