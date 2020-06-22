import React from 'react';
import firebase from 'services/firebase';
import withAuth from 'context/withAuth';
import { AuthInterface } from 'interfaces/interface';

interface IProps {
	auth: AuthInterface
}

const Navigation: React.FC<IProps> = ({ auth }) => {
	return auth.isAuth ? (
		<nav>
			<h5>ChatTayo</h5>
			<button onClick={firebase.signout}>Sign Out</button>
		</nav>
	) : null;
};

export default withAuth(Navigation);
