import * as Actions from "../actions";
import getNetwork from "../utils/networkId";
import { defaultState } from "../store/defaultState";

function appReducer(state=null, action) {
    
    switch (action.type) {
    
        // TODO-7
        //  스토어 상태를 업데이트한다.
        
        
        
        case Actions.APPLICATION_REFRESH :
            return {
                ...state,
                ...defaultState
            }
        
        default:
            return state;
    }
};

export default appReducer;
