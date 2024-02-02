export function getAuthToken() {
	return localStorage.getItem('token');
}

export function setAuthToken(token: string) {
	localStorage.setItem('token', token);
}
