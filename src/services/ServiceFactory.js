import { authService } from "./AuthService"
import { CategoryService } from "./CategoryService"
import { ProfileService, ProfileImageService } from './ProfileService'

export const serviceFactory = (apiClient) => {
    return {
        authService: authService(apiClient),
        profileService: ProfileService(apiClient),
        profileImageService: ProfileImageService(apiClient),
        categoryService: CategoryService(apiClient),
    }
}