import React from 'react';

const FindRoom: React.FC = () => {
	return (
		<div>
			<h1>Create or Find a Room</h1>
			<input type="text" placeholder="Enter room ID"/>
			<button>Submit</button>
		</div>
	);
};

export default FindRoom;