const BASE_URL = 'https://96f2-45-130-134-153.eu.ngrok.io';

export interface User {
	id: string;
	firstName: string;
	lastName?: string;
	password?: string;
	albums?: any[];
	email: string;
}

export interface LoggingUser {
	email: string;
	password: string;
}

export const getUser = async (displayName: string, email: string) => {
	try {
		const result = await fetch(`${BASE_URL}/user/`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				firstName: displayName,
				lastName: '',
				email: email,
			}),
		});
		const json = await result.json();
		return json;
	} catch (error) {
		console.log(error);
	}
};

export const login = async (user: LoggingUser) => {
	try {
		const result = await fetch(`${BASE_URL}/login`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(user),
		});
		const res = await result.json();
		return res as User;
	} catch (error) {
		console.log(error);
	}
};

export const register = async (newuser: User) => {
	try {
		const result = await fetch(`${BASE_URL}/register`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(newuser),
		});
		const res = await result.json();
		return res as User;
	} catch (error) {
		console.error(error);
	}
};
