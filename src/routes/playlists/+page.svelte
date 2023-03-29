<script lang="ts">
	import { Button, Card } from '$components';
	import { element } from 'svelte/internal';
	import type { PageData } from './$types';
	export let data: PageData;
	$: playlists = data.userPlaylists;
</script>

<div class="content">
	{#if playlists.items.length > 0}
		<div class="title">
			<h1>{data.title}</h1>
            <Button element="a" >+ Add New</Button>
		</div>
        <div class="grid-items">
            {#each playlists.items as item}
                <Card {item} ></Card>
            {/each}
        </div>
	{:else}
		<div class="empty">
			<p>No Playlists Yet!</p>
		</div>
	{/if}
</div>

<style lang="scss">
    .content{
        padding-bottom: 60px;
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .empty{
            text-align: center;
            margin-top: 40px;
            p{
                font-size: functions.toRem(18);
            }
        }
        .grid-items {
            margin-bottom: 40px;
        }
    }
</style>
