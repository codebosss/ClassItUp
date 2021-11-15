import { combineReducers } from 'redux';
import auth from './auth';
import interviewAnalysis from './interviewAnalysis';
import pitchAnalysis from './pitchAnalysis';
import dashboard from './dashboard'
import videoCall from './videoCall'

export default combineReducers({
    auth,
    interviewAnalysis,
    pitchAnalysis,
    dashboard,
    videoCall
});
