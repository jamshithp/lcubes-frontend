const initialState = {
  error:'',
  regStatus:'',
  userData:{},
  userRegistration:'',
  courseDetails:[]
}

export default (state = initialState, action )=>{
    switch(action.type){
        case 'USER_REG':
            return{
                ...state,
                regStatus:'SUCCESS',
                userRegistration:action.data
            }
        case 'USER_REG_FAIL':
            return{
                ...state,
                regStatus:'FAIL',
                error:action.data
            }
        default:
            return state;
    }
}
