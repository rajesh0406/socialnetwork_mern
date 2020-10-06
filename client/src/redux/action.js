import {USER_DETAILS} from './actionType';
import axios from 'axios';
export const action=(details)=>({
type:USER_DETAILS,
payload:details
});

export const signup=(details)=>
{
        axios.post('http://localhost:8000/signup', details)
            .then(function (res) {
              return res;
            }).catch(function(error){
              return error
           })
};