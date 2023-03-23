<script>
	import { invalidateAll } from '$app/navigation';
	import {LogoutButton} from '$components';
	import 'modern-normalize/modern-normalize.css';
	//import '../styles/main.scss';
	import '../app.css'
	
	
	export let data;

	$: user = data.user;
</script>

<div class="container">
{#if user}
	<p>Hello {user?.display_name}</p>
	<LogoutButton></LogoutButton>
{/if}
</div>
<slot />
