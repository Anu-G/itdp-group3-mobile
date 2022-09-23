import { authService } from "./AuthService"
import { PostImageService, PostService } from "./PostService"
import ProductService, { ProductImageService } from "./ProductService"
import { ProfileService } from "./ProfileService"
import SettingAccountService from "./SettingAccountService"


export const serviceFactory = (apiClient) => {
    return {
        authService: authService(apiClient),
        profileService: ProfileService(apiClient),
        postService: PostService(apiClient),
        postImageService: PostImageService(apiClient),
        productService: ProductService(apiClient),
        productImageService: ProductImageService(apiClient),
        settingAccountService: SettingAccountService(apiClient),
    }
}