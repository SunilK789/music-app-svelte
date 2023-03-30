<script lang="ts">
	import { Button, Card, Pagination } from '$components';
	import { toasts } from '$stores';
	import type { PageData } from './$types';
	export let data: PageData;
	$: playlists = data.userPlaylists;

    let isLoading = false;

    async function loadMoreItems(){
        if(!playlists.next) return;
        isLoading = true;
        const res = await fetch(playlists.next.replace('https://api.spotify.com/v1','/api/spotify'));

        if(res.ok){
            const resJSON = await res.json();
            playlists={
                    ...resJSON, items: [...playlists.items, ...resJSON.items]
            }
        }else{
            toasts.error('Could not laod data!');
        }

        isLoading=false;
    }
</script>

<div class="content">
	{#if playlists.items.length > 0}
		<div class="title">
			<h1>{data.title}</h1>
            <Button element="a" href="/playlists/new">+ Add New</Button>
		</div>
        <div class="grid-items">
            {#each playlists.items as item}
                <Card {item} ></Card>
            {/each}
        </div>
        <Pagination paginatedList={playlists} on:loadmore={loadMoreItems} {isLoading}></Pagination>
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
