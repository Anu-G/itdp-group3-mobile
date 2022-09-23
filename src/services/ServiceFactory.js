import { authService } from "./AuthService"
import { FaqService } from "./FaqService"
import { PostImageService, PostService } from "./PostService"
import ProductService, { ProductImageService } from "./ProductService"
import { CategoryService } from "./CategoryService"
import { ProfileService, ProfileImageService } from './ProfileService'
import TimelineService from "./TimelineService"

export const serviceFactory = (apiClient) => {
    return {
        authService: authService(apiClient),
        profileService: ProfileService(apiClient),
        postService: PostService(apiClient),
        postImageService: PostImageService(apiClient),
        productService: ProductService(apiClient),
        productImageService: ProductImageService(apiClient),
        faqService: FaqService(apiClient),
        timelineService: TimelineService(apiClient),
        profileImageService: ProfileImageService(apiClient),
        categoryService: CategoryService(apiClient),
    }
}