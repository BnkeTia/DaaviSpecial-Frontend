import { combineReducers } from "redux";
import myUserReducer from "../features/redux-users/myUserSlice";

const rootReducer = combineReducers({
    
    myuser: myUserReducer,

});

export default rootReducer;
