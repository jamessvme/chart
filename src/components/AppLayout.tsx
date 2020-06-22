import React, { PureComponent } from 'react';
import Navigation from './common/Navigation/Navigation';

// avoid unnecessary rerenders of parent by using purecomponent or you can
// also use memo
class AppLayout extends PureComponent<{}, {}> {
	render() {
		return (
			<>
				<Navigation />
				<main>
					{this.props.children}
				</main>
			</>
		);
	}
}

export default AppLayout;
