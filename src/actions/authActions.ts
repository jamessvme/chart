import firebase from 'services/firebase';

// export default (dispatch) => ({
// 	signin: async (email, password) => {
// 		try {
// 			await firebase.signin(email, password);

// 			return Promise.resolve();
// 		} catch(e) {
// 			dispatch({
// 				type: 'AUTH_FAILED',
// 				payload: e.message
// 			});

// 			return Promise.reject(e.message);
// 		}
// 	}
// })

type Dispatch = (obj: {}) => void;

export const signin = async (dispatch: Dispatch, credential: { email: string, password: string }) => {
	try {
			await firebase.signin(credential.email, credential.password);

			return Promise.resolve();
		} catch(e) {
			dispatch({
				type: 'AUTH_FAILED',
				payload: e.message
			});

			return Promise.reject(e.message);
		}
}