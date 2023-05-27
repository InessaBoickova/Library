/*eslint-disable*/
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { useIdentificationServices } from '../../services/identification';

const initialState = {
    loadingIdentification: false,
    registrationStep: 1,
    registrationData: {},
    registrationResult: '',
    registrationSuccess: false,
    forgotPassResult: '',
    forgotPassSuccess: false,
    authorizationResult: '',
    authorizationSuccess: false,
}

const identificationRequest = useIdentificationServices();

const authorizationUser = createAsyncThunk (
    'identification/authorizationUser',
    (data) =>  identificationRequest('/api/auth/local', data)  
);

const registrationUser = createAsyncThunk (
    'identification/registrationUser',
    (data) =>  identificationRequest('/api/auth/local/register', data)  
);

const forgotPasswordUser = createAsyncThunk (
    'identification/forgotPasswordUser',
    (data) =>  identificationRequest('/api/auth/forgot-password', data)  
);

const updatePasswordUser = createAsyncThunk (
    'identification/updatePasswordUser',
    (data) =>  identificationRequest('/api/auth/reset-password', data)  
);

const identificationSlice = createSlice({
    name: 'identification',
    initialState,
    reducers: {
        setRegistrationStep: (state,action) => { state.registrationStep = action.payload},    
        setRegistrationData: (state,action) => { state.registrationData = {...state.registrationData,... action.payload}},     
        setRegistrationResult: (state,action) => {  state.registrationResult = action.payload },     
        setRegistrationSuccess: (state,action) => {  state.registrationSuccess = action.payload},    
        setForgotPassResult: (state,action) => { state.forgotPassResult = action.payload},      
        setAuthorizationResult: (state,action) => {  state.authorizationResult = action.payload },    
    },

    extraReducers: (builder) => {
        builder    
            .addCase(authorizationUser.pending , state => { state.loadingIdentification = !state.loadingIdentification})   
            .addCase(authorizationUser.fulfilled , (state, action) => { 
                localStorage.setItem('token', action.payload.data.jwt);
                state.authorizationResult = 'fulfilled'
                localStorage.setItem('user', JSON.stringify(action.payload.data.user)); 
                state.loadingIdentification = !state.loadingIdentification;
            })
            .addCase(authorizationUser.rejected , (state, action) => {
                
                (action.error.message.match(/\d+/)[0] === 400)      
                ?  state.authorizationResult = 'error400'     
                :  state.authorizationResult = 'error'

                state.loadingIdentification = !state.loadingIdentification;
            })
        
            .addCase(registrationUser.pending, state => { state.loadingIdentification = !state.loadingIdentification})   
            .addCase(registrationUser.fulfilled, state => { 
                state.registrationResult = 'success';
                state.loadingIdentification = !state.loadingIdentification;
            }) 
            .addCase(registrationUser.rejected, (state, action) => {       

                (action.error.message.match(/\d+/)[0] === 400)             
                ?  state.registrationResult = 'error400'           
                :  state.registrationResult = 'error'

                state.loadingIdentification = !state.loadingIdentification;
            })        
            .addCase(forgotPasswordUser.pending, state =>{state.loadingIdentification = !state.loadingIdentification})
            .addCase(forgotPasswordUser.fulfilled, (state)=> {
                state.forgotPassSuccess =  true ;
                state.forgotPassResult = 'successSendEmail';
                state.loadingIdentification = !state.loadingIdentification;
            })
            .addCase(forgotPasswordUser.rejected, (state,action) => {
                state.forgotPassResult = 'errorSendEmail';
                state.loadingIdentification = !state.loadingIdentification;
            })
            .addCase(updatePasswordUser.pending, state => {state.loadingIdentification = !state.loadingIdentification})
            .addCase(updatePasswordUser.fulfilled, state => {
                state.loadingIdentification = !state.loadingIdentification;
                state.forgotPassResult = 'successSaveNewData';
            })
            .addCase (updatePasswordUser.rejected, (state)=> {
                state.loadingIdentification = !state.loadingIdentification;
                state.forgotPassResult = 'errorSaveData';
        } )
    }
});

const {actions,reducer: identification} = identificationSlice;
const {setRegistrationStep,setRegistrationData,setRegistrationSuccess,
    setRegistrationResult,setAuthorizationResult,setForgotPassResult} = actions;

export { setRegistrationStep,setRegistrationData, authorizationUser,setRegistrationSuccess,setAuthorizationResult,
    registrationUser,forgotPasswordUser,updatePasswordUser,setRegistrationResult,identification,setForgotPassResult};