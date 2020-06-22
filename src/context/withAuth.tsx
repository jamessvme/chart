import React, { useContext } from 'react';
import { AppContext } from './Provider';
import { Diff } from 'utility-types';
import { AuthInterface } from 'interfaces/interface';

interface InjectedProps {
	auth: AuthInterface
}

const withAuth = <P extends InjectedProps>(Component: React.ComponentType<P>) => {
	type HocProps = Diff<P, InjectedProps>

	return (props: HocProps) => {
		const { auth } = useContext(AppContext);

		return <Component {...props as P} auth={auth as AuthInterface} />
	};	
}

export default withAuth; 
