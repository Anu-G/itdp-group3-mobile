import { authService } from "./AuthService"
import { PostImageService, PostService } from "./PostService"
import { ProfileService } from "./ProfileService"


export const serviceFactory = (apiClient) => {
    return {
        authService: authService(apiClient),
        profileService: ProfileService(apiClient),
        postService: PostService(apiClient),
        postImageService: PostImageService(apiClient),
    }
}