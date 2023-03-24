<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Navigation } from '$components';
	import { ChevronDown, User } from 'lucide-svelte';

	let user = $page.data.user;
	console.log(user);
</script>

<div class="content">
	<div class="left">
		{#if browser}
			<Navigation desktop={false} />
		{/if}
	</div>
	<div class="right">
		<div id="profile-button">
			<buttton class="profile-button">
				{#if user?.images && user.images.length > 0}
					<img src={user.images[0].url} alt="" />
				{:else}
					<User class="profile-user" />
				{/if}
				{user?.display_name} <span class="visually-hidden">Profile menu</span>
				<ChevronDown class="profile-arrow" />
			</buttton>
		</div>
	</div>
</div>

<style lang="scss">
	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.profile-button {
		background: none;
		border: 1px solid var(--border);
		padding: 5px;
		border-radius: 25px;
		display: flex;
		align-items: center;
		color: var(--text-color);
		cursor: pointer;
		:global(.profile-user) {
			width: 28px;
			height: 28px;
			border-radius: 100%;
			margin-right: 10px;
			padding-left: 5px;
		}
		:global(.profile-arrow) {
			margin-left: 5px;
		}
		&:hover {
			background-color: var(--accent-color);
		}
	}
</style>
