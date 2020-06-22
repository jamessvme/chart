import React, { useEffect, useState } from 'react';
import withContext from 'context/withContext';
import firebase from 'services/firebase';
import { AuthInterface } from 'interfaces/interface';
// import { signin as dispatchSignIn } from 'actions/authActions';

interface IProps {
	auth: AuthInterface,
	dispatch: (action: {}) => void,
	children?: React.ReactNode,
	[propName: string]: any
}

interface IState {
	email?: string,
	password?: string
}

const SignUp: React.FC<IProps> = ({ auth, dispatch }) => {
	const [field, setField] = useState<IState>({
		email: '',
		password: ''
	});
	const [error, setError] = useState<IState & { auth?: string }>({});
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		console.log(auth);
	}, [auth]); // FOR TESTING RERENDERING ONLY


	const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		const val: string = e.target.value.trim();

		if (!regex.test(val)) {
			setError({ ...error, email: 'Email is invalid' });
		} else if (val.length === 0) {
			setError({ ...error, email: 'Email is required' });
		} else  {
			setError({ ...error, email: '' });	
		}

		setField({ ...field, email: val });
	}

	const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val: string = e.target.value.trim();

		if (val.length < 8) {
			setError({ ...error, password: 'Password must be at least 8 characters long.' });
		} else if (val.length === 0) {
			setError({ ...error, password: 'Password is required' });
		} else {
			setError({ ...error, password: '' });	
		}

		setField({ ...field, password: val });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (field.email && field.password && !error.email && !error.password) {
			setError({});
			try {
				setLoading(true);
				await firebase.signup(field.email, field.password);
				setLoading(false);
			} catch(e) {
				setLoading(false);
				setError({ ...error, auth: e.message });
			}
		}
	};

		return (
			<div>
				<h1>Sign Up</h1>
				{error.auth && (
					<h3>{error.auth}</h3>
				)}
				<form onSubmit={handleSubmit}>
					<input 
							type="email"
							readOnly={isLoading}
							onChange={handleEmailInput}
							required={true}
							placeholder="Email"
							value={field.email}
					/>
					<input 
							type="password"
							readOnly={isLoading}
							onChange={handlePasswordInput}
							required={true}
							placeholder="Password"
							value={field.password}
					/>
					<button 
							type="submit"
							disabled={isLoading}	
					>
						{isLoading ? 'Signing Up' : 'Sign Up'}
					</button>
				</form>
			</div>
		);
};

const mapState = (state: any) => ({ auth: state.auth });

export default React.memo(withContext<IProps>(mapState)(SignUp));
