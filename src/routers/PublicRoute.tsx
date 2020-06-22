import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthInterface } from 'interfaces/interface';
import withAuth from 'context/withAuth';

interface IProps {
	auth: AuthInterface,
	path: string,
	[propName: string]: any
}

const PublicRoute: React.FC<IProps> = ({ auth, component: Component, path, ...rest }: IProps) => (
	<Route 
		{...rest}
		component={(props: any) => {
			const { from } = props.location.state || { from: { pathname: '/room' } }; 

			return auth.isAuth ? (
				<Redirect to={from} />
			) : (
				<Component {...props} />
			)	
		}}
	/>	
);

export default withAuth(PublicRoute);
