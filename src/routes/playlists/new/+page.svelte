<script lang="ts">
	import { Button } from '$components';
import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>
<h1>Add a New Playlist</h1>
<form method="POST">
	<input hidden name="userID" value={data.user?.id} />
	<div class="field" class:has-error={form?.nameError}>
		<lable for="playlist-name">Name *</lable>
		<input
			type="text"
			id="playlist-name"
			name="name"
			placeholder="Playlist Name"
			value={form?.name || ''}
		/>
		{#if form?.nameError}
			<p class="error">{form?.nameError}</p>
		{/if}
	</div>
	<div class="field">
		<lable for="playlist-description">Description</lable>
		<input
			type="text"
			id="playlist-description"
			name="description"
			placeholder="description"
			value={form?.description || ''}
		/>
	</div>
	{#if form?.apiError}
		<p class="error">{form?.apiError}</p>
	{/if}

    <div class="submit-button">
        <Button element="button" type="submit" >Create Playlist</Button>
    </div>

</form>
