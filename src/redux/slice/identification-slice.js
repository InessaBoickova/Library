import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    registrationStep: 1,
    registrationData: {},
    registrationResult: '',
    registrationSuccess: false,
    forgotPassResult: '',
    forgotPassSuccess: false,
    authorizationResult: '',
    authorizationSuccess: false,
}

const identificationSlice = createSlice({
    name: 'identification',
    initialState,
    // eslint-disable-next-line no-param-reassign
    reducers: {
        // eslint-disable-next-line no-param-reassign
        setRegistrationStep: (state,action) => { state.registrationStep = action.payload},
        // eslint-disable-next-line no-param-reassign
        setRegistrationData: (state,action) => { state.registrationData = {...state.registrationData,... action.payload}},
        // eslint-disable-next-line no-param-reassign
        setRegistrationResult: (state,action) => {  state.registrationResult = action.payload },
        // eslint-disable-next-line no-param-reassign
        setRegistrationSuccess: (state,action) => {  state.registrationSuccess = action.payload},
        // eslint-disable-next-line no-param-reassign
        setForgotPassResult: (state,action) => { state.forgotPassResult = action.payload},
        // eslint-disable-next-line no-param-reassign
        setForgotPassSuccess: (state,action) => {  state.forgotPassSuccess = action.payload }, 
        // eslint-disable-next-line no-param-reassign
        setAuthorizationSuccess: (state,action) => {  state.authorizationSuccess = action.payload }, 
        // eslint-disable-next-line no-param-reassign
        setAuthorizationResult: (state,action) => {  state.authorizationResult = action.payload }, 
    }
});

const {actions,reducer: identification} = identificationSlice;
const {setRegistrationStep,setRegistrationData,setRegistrationResult,setRegistrationSuccess,setForgotPassResult,
    setForgotPassSuccess,setAuthorizationSuccess,setAuthorizationResult} = actions;

export {setAuthorizationResult,setAuthorizationSuccess,setForgotPassSuccess,
    setRegistrationStep,setRegistrationData,setRegistrationResult,setRegistrationSuccess,setForgotPassResult, identification};