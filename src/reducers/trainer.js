const initialState = {
    NewQuestionmodalOpened : false,
    AllQuestionconfirmDirty: false,
    QuestionsearchText : '',
    QuestionTableLoading : false,
    QuestionTableData : [],
    StudentsTableLoading : false,
    StudentsTableData : [],
    StudentSearchText: '',
    CourseTableLoading : false,
    CourseTableData : [],
    CourseSearchText: '',
    selectedSubjects:[],
    QuestionFormData:{},
    fifthoptioAddButtonVisible:true,
    TestTableLoading:false,
    TestTableData:[],
    DataActiveTestDetails : {
        testDetailsId : null,
        testquestions :[]
    },
    CoursemodalOpened : false,
    SubjectTableLoading : false,
    SubjectTableData : [],
    SubjecteSearchText: '',
    SubjectmodalOpened : false,
    Subjectmode : 'New Topic',
}


export default (state = initialState, action )=>{
    switch(action.type){
        case 'CHANGE_QUESTION_MODAL_STATE':
            return {
                ...state,
                NewQuestionmodalOpened : action.payload1,
            }
        case 'CHANGE_QUESTION_FORM_CONFIRMDIRTY':
            return {
                ...state,
                AllQuestionconfirmDirty : action.payload
            }
        case 'CHANGE_QUESTION_SEARCH_TEXT':
            return {
                ...state,
                QuestionsearchText : action.payload
            }
        case 'CHANGE_QUESTION_TABLE_LOADING_STATUS':
            return {
                ...state,
                QuestionTableLoading : action.payload1,
                QuestionTableData : action.payload2
            }
        case 'CHANGE_COURSE_TABLE_LOADING_STATUS':
            return {
                ...state,
                CourseTableLoading : action.payload1,
                CourseTableData : action.payload2
            }
        case 'CHANGE_STUDENT_SEARCH_TEXT':
            return {
                ...state,
                StudentSearchText : action.payload
            }
        case 'CHANGE_STUDENTS_TABLE_LOADING_STATUS':
            return {
                ...state,
                StudentsTableLoading : action.payload1,
                StudentsTableData : action.payload2
            }
        case 'ADD_FIFTH_OPTION':
            return {
                ...state,
                QuestionFormData:{
                    ...state.QuestionFormData,
                    options:[
                        ...state.QuestionFormData.options,
                        {
                            image :null,
                            body : null,
                            isAnswer :false
                        }
                    ]
                },
                fifthoptioAddButtonVisible:false
            }
        case 'CHANGE_SELECTED_SUBJECT':
            return {
                ...state,
                selectedSubjects : action.payload
            }
        case 'CHANGE_QUESTION_FORM_DATA':
            return{
                ...state,
                QuestionFormData : action.payload
            }
        case 'CHANGE_TEST_DETAILS_MODAL_STATE':
            return {
                ...state,
                TestDetailsmodalOpened : action.payload1,
                DataActiveTestDetails :{
                    ...state.DataActiveTestDetails,
                    testDetailsId : action.payload2
                }
            }
        case 'CHANGE_TEST_SEARCH_TEXT':
            return {
                ...state,
                TestsearchText : action.payload
            }
        case 'CHANGE_TEST_TABLE_LOADING_STATUS':
            return {
                ...state,
                TestTableLoading : action.payload1,
                TestTableData :action.payload2
            }
        case 'CHANGE_CURRENT_ACTIVE_TEST_QUESTION':
            return{
                ...state,
                DataActiveTestDetails:{
                    ...state.DataActiveTestDetails,
                    testquestions:action.payload
                }
            }
        case 'CHANGE_COURSE_MODAL_STATE':
            return {
                ...state,
                CoursemodalOpened : action.payload1,
            }
        case 'CHANGE_SUBJECT_MODAL_STATE':
            return {
                ...state,
                SubjectmodalOpened : action.payload1,
            }
        case 'CHANGE_SUBJECT_TABLE_LOADING_STATUS':
            return {
                ...state,
                SubjectTableLoading : action.payload1,
                SubjectTableData : action.payload2
            }
        default:
            return state;
    }
}