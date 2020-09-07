import { combineReducers } from 'redux';

import { teams } from './teamReducer';

const rootReducer = combineReducers({
  teams
});

export default rootReducer;