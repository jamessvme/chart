import React, { useContext } from 'react';
import { AppContext, DispatchContext } from './Provider';

type TMapState = (state: any) => {} | undefined;

const withContext = <P extends {}>(mapState: TMapState) => (Component: React.ComponentType<P>) => {
	return (props: P) => {
		const state = useContext(AppContext);
		const dispatch = useContext(DispatchContext);
		const mappedState = mapState ? mapState(state) : {};

		return <Component {...props as P} {...mappedState as P} dispatch={dispatch}/>
	};
};

export default withContext; 
