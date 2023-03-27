<script lang="ts">
	import ItemPage from '$components/ItemPage.svelte';
	import { getCopyrightSymbol } from '$helpers';
	import type { PageData } from './$types';

	export let data: PageData;
	$: console.log(data);
	$: album = data.album;
</script>

<ItemPage
	title={album.name}
	type={album.album_type}
	color={null}
	image={album.images.length > 0 ? album.images[0].url : undefined}
>
<p class="meta" slot="meta">
	<span class="artists">
		{album.artists.map(artist => artist.name).join(', ')}
	</span>
	<span class="date">
		{new Date(album.release_date).getFullYear()}
	</span>
	<span class="tracks-count">
		{`${album.total_tracks} Track${album.total_tracks > 1 ? 's':''}`}
	</span>

</p>
	<div class="tracks">
		<ul>
			{#each album.tracks.items as track}
				<li>
					{track.name}
				</li>
			{/each}
		</ul>

		<div class="credits">
			<p class="date">
				{new Date(album.release_date).toLocaleDateString('en', {
					dateStyle: 'medium'
				})}
			</p>
			{#each album.copyrights as copyright}
				<p class="copyright">{getCopyrightSymbol(copyright.type)} {copyright.text}</p>
			{/each}
		</div>
	</div>
</ItemPage>

<!-- <h1>{album.type}</h1>
<h5>{album.name}</h5> -->
<style lang="scss">
	.credits {
		margin-top: 40px;
		p {
			color: var(--light-gray);
			margin: 0;
			font-size: functions.toRem(11);

			&.date {
				font-size: functions.toRem(13);
			}
		}
	}
</style>
