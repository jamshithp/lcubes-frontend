import apis from '../services/Apis';
import Alert from '../components/common/alert';
import { SecureGet , Get} from '../services/axiosCall';


export const ChangeInstituationTableData = ()=> dispatch =>{
    dispatch({
        type : 'CHANGE_INSTITUATION_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    Get({
        url:  `${apis.GET_ALL_INSTITUATION}`
    }).then((response)=>{
        if(response.data.message === "Success"){
            dispatch({
                type : 'CHANGE_INSTITUATION_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
            dispatch({
                type : 'CHANGE_INSTITUATION_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Error!','Server Error');
        dispatch({
            type : 'CHANGE_INSTITUATION_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}

export const ChangeTrainerModalState = (d1,d2,d3)=> dispatch =>{
    if(d3==='Save Changes'){
        SecureGet({
            url : `${apis.GET_SINGLE_TRAINER_DETAILS}/${d2}`
        }).then((response)=>{
            if(response.data.success){
                dispatch({
                    type : 'CHANGE_TRAINER_MODAL_STATE',
                    payload1 : true,
                    payload2 : d2,
                    payload3 : 'Save Changes',
                    payload4: {
                        ...response.data.data[0],
                        contact :response.data.data[0].contact.slice(3),
                        prefix:response.data.data[0].contact.slice(0,3),
                    }
                })
            }
            else{
                return Alert('warning','Warning!',response.data.message);
            }
        }).catch((error)=>{
            return Alert('error','Error!','Server Error');
        })
    }
    else{
        dispatch({
            type : 'CHANGE_TRAINER_MODAL_STATE',
            payload1 : d1,
            payload2 : d2,
            payload3 : d3,
            payload4: {
                name : null,
                emailid:null,
                contact :null,
                prefix:null,
                password:null,
                confirmpassword : null
            }
        })
    }
}


export const ChangeTrainerConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_TRAINER_FORM_CONFIRMDIRTY',
       payload : d
    })
}


export const ChangeTrainerSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_TRAINER_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeTrainerTableData = ()=> dispatch =>{
    dispatch({
        type : 'CHANGE_TRAINER_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    SecureGet({
        url:  `${apis.GET_ALL_TRAINER}`
    }).then((response)=>{
        if(response.data.success){
            dispatch({
                type : 'CHANGE_TRAINER_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
            dispatch({
                type : 'CHANGE_TRAINER_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Error!','Server Error');
        dispatch({
            type : 'CHANGE_TRAINER_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}

export const ChangeAdminCourseModalState = (d1,d2,d3,d4)=> dispatch =>{
    if(d3==='Save Changes'){
        dispatch({
            type : 'CHANGE_ADMIN_COURSE_MODAL_STATE',
            payload1 : true,
            payload2 : d2,
            payload3 : 'Save Changes',
            payload4: d4
        })
    }
    else{
        dispatch({
            type : 'CHANGE_ADMIN_COURSE_MODAL_STATE',
            payload1 : d1,
            payload2 : d2,
            payload3 : d3,
            payload4: {
                topic : null
            }
        })
    }
}


export const ChangeSubjectConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_SUBJECT_FORM_CONFIRMDIRTY',
       payload : d
    })
}


export const ChangeSubjectSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_SUBJECT_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeAdminCourseTableData = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_ADMIN_COURSE_TABLE_LOADING_STATUS',
       payload1 : true,
       payload2 :[]
    });
    const url = `http://54.160.111.123:9091${apis.GET_ALL_MAIN_COURSE}`;
    SecureGet({
        url:  url
    }).then((response)=>{
        if(response.data.message = "Success"){
            dispatch({
                type : 'CHANGE_ADMIN_COURSE_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
            dispatch({
                type : 'CHANGE_ADMIN_COURSE_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Error!','Server Error');
        dispatch({
            type : 'CHANGE_ADMIN_COURSE_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })

}
