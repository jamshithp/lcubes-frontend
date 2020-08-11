const envoirnment = process.env.NODE_ENV;

const apis={
    BASE_LOCAL_URL:envoirnment==='development'?'http://localhost:3000':'http://107.20.94.92:8090/',
    BASE : envoirnment==='development'?'http://107.20.94.92:8090/':'http://107.20.94.92:8090/',
    LOGIN : "/loginService/login",
    GET_ALL_INSTITUATION :'/InstitutionService/getAllInstitutions',
    UPATE_INSTITUTION_STATUS:'/InstitutionService/updateStatusOfInstitution',
    ADD_MAIN_COURSE:'/category/addMainCourse',
    GET_ALL_MAIN_COURSE:'/category/mainCourses',
    UPDATE_MAIN_COURSE:'/category/updateMainCourse',
    ADD_COURSE:'/InstitutionService/AddCourse',
    ADD_COURSE_DETAILS:'/InstitutionService/AddCourseDetailsList',
    GET_ALL_COURSE:'/InstitutionService/getAllCourse',
    INSTITUTE_REG_URL:'/InstitutionService/registerInstitution',
    USER_REG_URL:'/userService/registerUser',
    GET_COURSE_BY_INSTITUTION :'/InstitutionService/getCourseDetailsByInstitution/',
    GET_ALL_STUDENTS_BY_INSTITUATION: '/userService/getAllStudentByInstitution/',
    UPATE_STUDENT_STATUS:'userService/updateUserStatus',
    GET_ALL_CATEGORY:'/category/allCategories',
    ADD_CATEGORY: '/category/addCategory',
    UPDATE_CATEGORY:'/category/updateCategory',
    GET_ALL_QUESTIONS:'/questions/allQuestions',
    CREATE_SUBJECT : '/api/v1/subject/create',
    DELETE_QUESTION:'/api/v1/questions/delete',
    FETCH_SINGLE_QUESTION:'/api/v1/questions/details',
    CREATE_QUESTIONS :'/api/v1/questions/create',
    FILE_UPLOAD:'/api/v1/upload',
    CREATE_TEST : '/api/v1/test/create',
    GET_ALL_TESTS:'/api/v1/test/details/all',
    GET_SINGLE_TEST:'/api/v1/test/trainer/details',
    REGISTER_TRAINEE_FOR_TEST:'/api/v1/trainee/enter',
    RESEND_TRAINER_REGISTRATION_LINK: '/api/v1/trainee/resend/testlink',
    GET_SINGLE_TEST_DETAILS_BASIC:'/api/v1/test/basic/details',
    STOP_REGISTRATION :'/api/v1/trainer/registration/stop',
    START_TEST_BY_TRAINER:'/api/v1/test/begin',
    GET_TEST_CANDIDATES :'/api/v1/test/candidates',
    GET_TEST_QUESTIONS :'/api/v1/test/questions',
    FETCH_TRAINEE_DETAILS:'/api/v1/trainee/details',
    FETCH_TRAINEE_TEST_DETAILS:'/api/v1/trainee/flags',
    PROCEED_TO_TEST:'/api/v1/trainee/answersheet',
    FETCH_TRAINEE_TEST_QUESTION:'/api/v1/trainee/paper/questions',
    FETCH_TRAINEE_TEST_ANSWERSHEET:'/api/v1/trainee/chosen/options',
    UPDATE_ANSWERS:'/api/v1/trainee/update/answer',
    END_TEST : '/api/v1/trainee/end/test',
    FETCH_OWN_RESULT:'/api/v1/final/results',
    FETCH_SINGLE_QUESTION_BY_TRAINEE:'/api/v1/trainee/get/question',
    END_TEST_BY_TRAINER:'/api/v1/test/end',
    FEEDBACK_STATUS_CHECK:'/api/v1/trainee/feedback/status',
    GIVE_FEEDBACK:'/api/v1/trainee/feedback',
    GET_STATS:'/api/v1/test/candidates/details',
    GET_EXCEL:'/api/v1/trainer/result/download',
    MAX_MARKS_FETCH:'/api/v1/test/max/marks',
    GET_FEEDBACKS:'/api/v1/trainer/get/feedbacks',
    CHECK_TEST_NAME:'/api/v1/test/new/name/check'
}

export default apis;
