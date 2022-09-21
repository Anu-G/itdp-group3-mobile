import { authService } from "./AuthService"
import { PostImageService, PostService } from "./PostService"
import ProductService, { ProductImageService } from "./ProductService"
import { ProfileService } from "./ProfileService"
import TimelineService from "./TimelineService"


export const serviceFactory = (apiClient) => {
    return {
        authService: authService(apiClient),
        profileService: ProfileService(apiClient),
        postService: PostService(apiClient),
        postImageService: PostImageService(apiClient),
        productService: ProductService(apiClient),
        productImageService: ProductImageService(apiClient),
        timelineService: TimelineService(apiClient),
    }
}