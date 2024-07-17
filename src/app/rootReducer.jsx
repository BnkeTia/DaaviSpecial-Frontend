import { combineReducers } from "redux";
import myUserReducer from "../features/redux-users/myUserSlice";
import myDaaviReducer from "../features/daavi/myDaaviSlice";

const rootReducer = combineReducers({
    
    myuser: myUserReducer,
    mydaavi: myDaaviReducer,

});

export default rootReducer;
