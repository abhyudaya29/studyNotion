const BASE_URL=import.meta.env.VITE_APP_BASE_URL

export const categories={
    CATEGORIES_API:BASE_URL+"/course/showAllCategories",
    
}
// AUTH ENDPOINTS
export const endpoints={
    SEND_OTP_API:BASE_URL+"/auth/sendotp",
    SIGNUP_API:BASE_URL+"/auth/signup",
    LOGIN_API:BASE_URL+"/auth/login",
    RESETPASSWORD_API:BASE_URL+"/auth/reset-password"
}