import { AuthInterface } from 'interfaces/interface';
import { EActionType } from 'constants/constants';

type TAuthAction = 
	| { type: EActionType.AUTH_SUCCESS, payload: AuthInterface }
	| { type: EActionType.AUTH_FAILED, payload: string }
	| { type: EActionType.SIGNOUT } 

const authDefault: AuthInterface = {
	isAuth: false,
	user: {},
	authStatus: ''
};

const authReducer = (state = authDefault, action: TAuthAction): AuthInterface => {
	switch(action.type) {
		case EActionType.AUTH_SUCCESS:
			return action.payload;
		case EActionType.AUTH_FAILED:
			return {
				...state,
				authStatus: action.payload
			}
		case EActionType.SIGNOUT:
			return authDefault
		default: 
			throw new Error(`Unexpected action type`);
	}
};

export { authDefault, authReducer as default }