import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, depends, route }) => {
	depends(`app:${route.id}`);
	const playListRes = await fetchRefresh(fetch, `/api/spotify/playlists/${params.id}`);

	if (!playListRes.ok) throw error(playListRes.status, 'Failed to load playlist!');

	const playListResJSON: SpotifyApi.SinglePlaylistResponse = await playListRes.json();

	let color = null;
	if (playListResJSON.images.length > 0) {
		const colorRes = await fetch(
			`/api/average-color?${new URLSearchParams({ image: playListResJSON.images[0].url }).toString()}`
		);

		if (colorRes.ok) {
			color = (await colorRes.json()).color;
		}
	}

    console.log('playListResJSON', playListResJSON);
	return {
		playlist: playListResJSON,
		title: playListResJSON.name,
		color
	};
};
