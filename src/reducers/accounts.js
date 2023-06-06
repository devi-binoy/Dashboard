import { GET_ACCOUNTS } from '../actions/types'

const initialState = [];

function accountsReducer(accounts = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ACCOUNTS:
            return payload;
        
        default:
            return accounts
    }
}  

export default accountsReducer;