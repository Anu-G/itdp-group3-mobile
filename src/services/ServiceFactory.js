import { authService } from "./AuthService"
import { CategoryService } from "./CategoryService"
import { ProfileService, ProfileImageService } from './ProfileService'

export const serviceFactory = (apiClient) => {
    return {
        authService: authService(apiClient),
        profileService: ProfileService(apiClient),
        profileImage: ProfileImageService(apiClient),
        categoryService: CategoryService(apiClient),
    }
}