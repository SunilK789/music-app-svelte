import { SPOTIFY_BASE_URL } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	const accessToken = cookies.get('access_token');
	const refreshToken = cookies.get('refresh_token');

	if (!accessToken) {
		return {
			user: null
		};
	}

	const profileRes = await fetch(`${SPOTIFY_BASE_URL}/me`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	//console.log(profileRes);

	if (profileRes.ok) {
		const profile: SpotifyApi.CurrentUsersProfileResponse = await profileRes.json();
		console.log("user form layout server: ", profile)

		return {
			user: profile
		};
	} else if (profileRes.status === 401 && refreshToken) {
		//refresh the token
		fetch('/api/auth/refresh');
	} else {
		return {
			user: null
		};
	}
		

};
