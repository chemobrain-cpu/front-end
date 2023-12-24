import { SIGNUP_USER, LOGIN_USER, MODIFY_USER } from "../action/userAppStorage";




const initialState = {
    adminToken: "",
    //expiresIn: "",
    admin: null,
    //user session credentials
    userToken: '',
    user: null,
    notifications: [],
    color: {
        background: '',
        importantText: '',
        normalText: '',
        fadeColor: '',
        blue: '',
        fadeButtonColor: '',

    },
}



export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload.user,
                userToken: action.payload.userToken
            }

        case MODIFY_USER:
            return {
                ...state,
                user: action.payload.user,
            }


        default:
            return state
    }

}

