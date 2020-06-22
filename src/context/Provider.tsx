import React, { useState, useEffect, useReducer, createContext } from 'react';
import { auth as firebaseAuth} from 'services/firebase';
import { AuthInterface } from 'interfaces/interface';
// import useAuthAction from 'actions/authActions';
import { EActionType } from 'constants/constants';
import authReducer, { authDefault } from 'reducers/authReducer';

interface AppContextInterface {
	auth: AuthInterface
}

const initialContext: AppContextInterface = {
	auth: authDefault
};

export const AppContext: React.Context<AppContextInterface> = createContext(initialContext);
export const DispatchContext = createContext({});

const Provider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	const [auth, authDispatch] = useReducer(authReducer, authDefault);
		const [isLoaded, setIsLoaded] = useState(false)
	// const store = useMemo(() => [auth, authDispatch], [auth]);

	useEffect(() => {
		firebaseAuth.onAuthStateChanged((user) => {
			if (user) {
				authDispatch({
					type: EActionType.AUTH_SUCCESS,
					payload: {
						isAuth: true,
						user: firebaseAuth.currentUser,
						authStatus: ''
					}
				});
				setIsLoaded(true);	
			} else {
				authDispatch({ type: EActionType.SIGNOUT });
				setIsLoaded(true);
			}
		})
		console.log('Provider rerendered');
	}, []);

	const combineDispatch = (...dispatches: any[]) => (action: () => void) => {
		return dispatches.forEach((dispatch) => dispatch(action)); 
	}
  
	const dispatch = React.useCallback(combineDispatch(authDispatch), [authDispatch]);
	const state = React.useMemo(() => ({ auth }), [auth]);

	return (
		<DispatchContext.Provider value={dispatch}>
			<AppContext.Provider value={state}>
				{isLoaded ? children : <h1>Loading</h1>}
			</AppContext.Provider>
		</DispatchContext.Provider>
	);
};

export default Provider;
