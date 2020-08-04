const initialState = {
    instituationTableLoadingStatus:false,
    instituationTableData:[],
    TrainermodalOpened : false,
    TrainerconfirmDirty: false,
    Trainermode : 'Register',
    trainerId : null,
    TrainersearchText : '',
    trainerTableLoadingStatus:false,
    trainerEditFormLoadingStatus:false,
    trainerTableData:[],
    trainerdetails:{},
    courseTableData : [] ,
    courseModalOpened : false,
    courseConfirmDirty: false,
    coursemode : 'New Topic',
    SubjectId : null,
    courseSearchText : '',
    courseTableLoading : false,
    courseDetails :{}
}

export default (state = initialState, action )=>{
    switch(action.type){
        case 'CHANGE_INSTITUATION_TABLE_LOADING_STATUS':
                return {
                    ...state,
                    instituationTableLoadingStatus : action.payload1,
                    instituationTableData : action.payload2,

                }
        case 'CHANGE_TRAINER_MODAL_STATE':
            return {
                ...state,
                TrainermodalOpened : action.payload1,
                trainerId : action.payload2,
                Trainermode : action.payload3,
                trainerdetails : action.payload4

            }
        case 'CHANGE_TRAINER_FORM_CONFIRMDIRTY':
            return {
                ...state,
                TrainerconfirmDirty : action.payload
            }
        case 'CHANGE_TRAINER_SEARCH_TEXT':
                return {
                    ...state,
                    TrainersearchText : action.payload
                }
        case 'CHANGE_TRAINER_TABLE_LOADING_STATUS':
                return {
                    ...state,
                    trainerTableLoadingStatus : action.payload1,
                    trainerTableData : action.payload2,

                }
        case 'CHANGE_ADMIN_COURSE_MODAL_STATE':
            return {
                ...state,
                courseModalOpened : action.payload1,
                SubjectId : action.payload2,
                coursemode : action.payload3,
                courseDetails : action.payload4
            }
        case 'CHANGE_SUBJECT_FORM_CONFIRMDIRTY':
            return {
                ...state,
                SubjectconfirmDirty : action.payload
            }
        case 'CHANGE_COURSE_SEARCH_TEXT':
                return {
                    ...state,
                    courseSearchText : action.payload
                }
        case 'CHANGE_ADMIN_COURSE_TABLE_LOADING_STATUS':
                return {
                    ...state,
                    courseTableLoading : action.payload1,
                    courseTableData :action.payload2
                }
        default:
            return state;
    }
}