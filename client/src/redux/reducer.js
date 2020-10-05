import {USER_DETAILS} from './actionType';
const initialState={
  
   user:[]
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case USER_DETAILS:return{
            ...state,
            user:action.payload
        }
        default:return state
    }
}
export default reducer;