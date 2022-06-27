const BASE_URL = 'http://localhost:3001';

export type user = {
	userId: string;
	name: string;
	lastName?: string;
	password?: string;
	email: string;
};

export const getUser = async (
	id: string,
	displayName: string,
	mail: string
) => {
	try {
		const result = await fetch(`${BASE_URL}/user/${id}`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				firstName: displayName,
				lastName: '',
				mail: mail,
			}),
		});
		const json = await result.json();
		console.log(json);
		return json;
	} catch (error) {
		console.log(error);
	}
};

export const login = async (user: user) => {
	try {
		const result = await fetch(`${BASE_URL}/login`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(user),
		});
		return await result.json();
	} catch (error) {
		console.log(error);
	}
};
