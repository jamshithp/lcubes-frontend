import apis from '../services/Apis';
import Alert from '../components/common/alert';
import { SecurePost ,Get } from '../services/axiosCall';
import axios from 'axios';


export const ChangeStudentsTableData = (id)=> dispatch =>{
    dispatch({
        type : 'CHANGE_STUDENTS_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    Get({
        url:  `${apis.GET_ALL_STUDENTS_BY_INSTITUATION}/${id}`
    }).then((response)=>{
        console.log("ChangeStudentsTableData",response)
        if(response.data.message === "Success"){
            dispatch({
                type : 'CHANGE_STUDENTS_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
            dispatch({
                type : 'CHANGE_STUDENTS_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Error!','Server Error');
        dispatch({
            type : 'CHANGE_STUDENTS_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}

export const getAllCourseData = (id)=> dispatch =>{

    Get({
        url:  `${apis.GET_ALL_COURSE}`
    }).then((response)=>{
        console.log("getAllCourseData",response)
        if(response.data.message === "Success"){
            dispatch({
                type : 'GET_ALL_COURSE_DATA',
                payload1 : response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
            dispatch({
                type : 'CHANGE_COURSE_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Error!','Server Error');
        dispatch({
            type : 'CHANGE_COURSE_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}

export const ChangeCourseTableData = (id)=> dispatch =>{
    dispatch({
        type : 'CHANGE_COURSE_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    Get({
        url:  `${apis.GET_COURSE_BY_INSTITUTION}/${id}`
    }).then((response)=>{
        console.log("ChangeCourseTableData",response)
        if(response.data.message === "Success"){
            dispatch({
                type : 'CHANGE_COURSE_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
            dispatch({
                type : 'CHANGE_COURSE_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Error!','Server Error');
        dispatch({
            type : 'CHANGE_COURSE_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}

export const ChangeStudentSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_STUDENT_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeCourseSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_STUDENT_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeQuestionModalState = (d1)=> dispatch =>{
        dispatch({
            type : 'CHANGE_QUESTION_MODAL_STATE',
            payload1 : d1,
        })
    }

export const ChangeCourseModalState = (d1)=> dispatch =>{
    dispatch({
        type : 'CHANGE_COURSE_MODAL_STATE',
        payload1 : d1,
    })
}

export const ChangeSubjectModalState = (d1,d2,d3,d4)=> dispatch =>{
    if(d3==='Save Changes'){
        dispatch({
            type : 'CHANGE_SUBJECT_MODAL_STATE',
            payload1 : true,
            payload2 : d2,
            payload3 : 'Save Changes',
            payload4: d4
        })
    }
    else{
        dispatch({
            type : 'CHANGE_SUBJECT_MODAL_STATE',
            payload1 : d1,
            payload2 : d2,
            payload3 : d3,
            payload4: {
                topic : null
            }
        })
    }
}

export const ChangeSubjectTableData = (id)=> dispatch =>{
    dispatch({
        type : 'CHANGE_SUBJECT_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    const url = `http://54.160.111.123:9091${apis.GET_ALL_CATEGORY}`;
    axios.request({ method: 'get', url })
    .then((response)=>{
        console.log("ChangeStudentsTableData",response)
        if(response.data.message === "Success"){
            dispatch({
                type : 'CHANGE_SUBJECT_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
            dispatch({
                type : 'CHANGE_SUBJECT_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Error!','Server Error');
        dispatch({
            type : 'CHANGE_SUBJECT_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}
    

export const ChangeQuestionConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_QUESTION_FORM_CONFIRMDIRTY',
       payload : d
    })
}


export const ChangeQuestionSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_QUESTION_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeQuestionTableData = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_QUESTION_TABLE_LOADING_STATUS',
       payload1 : true,
       payload2:[]
    });
    const url = `http://54.160.111.123:9091${apis.GET_ALL_QUESTIONS}`;
    axios.request({ method: 'get', url })
    .then((response)=>{
        console.log(response);
        if(response.data.success){
            dispatch({
                type : 'CHANGE_QUESTION_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
            dispatch({
                type : 'CHANGE_QUESTION_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
    }).catch((error)=>{
        Alert('error','Error!','Server Error');
        dispatch({
            type : 'CHANGE_QUESTION_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })

}

export const ChangeSelectedSubjects = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_SELECTED_SUBJECT',
       payload : d
    })
}

export const ChangeQuestionFormData = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_QUESTION_FORM_DATA',
       payload : d
    })
}

export const AddFifthOptionInQuestion = ()=> dispatch =>{
    dispatch({
       type : 'ADD_FIFTH_OPTION'
    })
}





export const ChangeTestDetailsModalState = (d1,d2)=> dispatch =>{
    dispatch({
       type : 'CHANGE_TEST_DETAILS_MODAL_STATE',
       payload1 : d1,
       payload2 : d2
    })
}

export const ChangeTestSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_TEST_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeTestTableData = ()=> dispatch =>{
    dispatch({
        type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2:[]
    });
    SecurePost({
        url : `${apis.GET_ALL_TESTS}`,
    }).then((response)=>{
        console.log(response.data);
        if(response.data.success){
            dispatch({
                type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
            dispatch({
                type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
    }
    }).catch((error)=>{
        console.log(error);
        Alert('error','Error!','Server Error');
        dispatch({
            type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}

export const updateQuestiosnActiveTest = (d)=>{
    return{
        type:'CHANGE_CURRENT_ACTIVE_TEST_QUESTION',
        payload:d
    }
}