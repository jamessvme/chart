import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import withAuth from 'context/withAuth';
import { AuthInterface } from 'interfaces/interface';
 
interface IProps {
	auth: AuthInterface,
	path: string,
	[propName: string]: any
}

const ProtectedRoute: React.FC<IProps> = ({ auth, component: Component, path, ...rest }) => (
	<Route 
		{...rest}
		
		component={(props: any) => {
			return auth.isAuth ? (
				<Component {...props} />
			) : (
				<Redirect to="/signin" />
			)	
		}}
	/>	
);

export default withAuth(ProtectedRoute);
