import { SPOTIFY_BASE_URL } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, cookies, params, url }) => {
	const accessToken = cookies.get('access_token');

	const res = await festch(`${SPOTIFY_BASE_URL}/${params.path}${url.search}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	const resJSON = await res.json();
	if (resJSON.error) {
		throw error(resJSON.error.status, resJSON.error.message);
	}

    //console.log(resJSON)
	return json(resJSON);
};
