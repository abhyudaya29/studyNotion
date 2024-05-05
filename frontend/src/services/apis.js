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
// Profile ENDPOINTS
export const profileEndPoints={
    GET_USER_DETAILS_API:BASE_URL+"/profile/getAllUserDetails",
    GET_USER_ENROLLED_COURSES:BASE_URL+"/profile/getEnrolledCourses",
}
// STUDENTS PAYMENT ENDPOINTS


// COURSE ENDPOINTS
export const courseEndPoints={
    GET_ALL_COURSE_API: BASE_URL+"/courses/getAllCourses",
    COURSE_DETAILS_API: BASE_URL+"/courses/getCourseDetails" ,
    EDIT_COURSE_API: BASE_URL,
    COURSE_CATEGORIES_API: BASE_URL+"/courses/showAllCategory",
    CREATE_COURSE_API: BASE_URL+"/courses/createCourse",
    CREATE_SECTION_API: BASE_URL+"/courses/createSection",
    CREATE_SUBSECTION_API: BASE_URL+"/courses/createSubSection",
    UPDATE_SECTION_API: BASE_URL+"/courses/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL+"/courses/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL,
    DELETE_SECTION_API: BASE_URL+"/courses/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL+"/courses/deleteSubSection",
    DELETE_COURSE_API: BASE_URL,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:BASE_URL+"/courses/getAllCourses",
    LECTURE_COMPLETION_API: BASE_URL,
    CREATE_RATING_API: BASE_URL
}