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
  
export const identification = (state = initialState, action) => {
   
    switch (action.type){
        case 'SET_REGISTRATION_STEP': 
            return {
                ...state,
                registrationStep: action.value
            };
        case 'SET_REGISTRATION_DATA': 
            return {
                ...state,
                registrationData: {
                    ...state.registrationData,
                    ...action.value,
                }
            };
        case 'SET_REGISTRATION_RESULT': 
            return {
                ...state,
                registrationResult: action.value,
            };
        case 'SET_REGISTRATION_SUCCESS':
            return {
                ...state,
                registrationSuccess: action.value
            }
        case 'SET_FORGOT_PASS_RESULT': 
            return {
                ...state,
                forgotPassResult: action.value,
            };
        case 'SET_FORGOT_PASS_SUCCESS':
            return {
                ...state,
                forgotPassSuccess: action.value
            }
        case 'SET_AUTHORIZATION_RESULT': 
            return {
                ...state,
                authorizationResult: action.value,
            };
        case 'SET_AUTHORIZATION_SUCCESS':
            return {
                ...state,
                authorizationSuccess: action.value
            }
        default : 
            return state;
    }
}