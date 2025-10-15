<script lang="ts">
    let query = "";
    let searchBtn;

    const search = () => {
        if (query) {
            window.location.assign(
                `https://unduck.link?q=${encodeURIComponent(query)}`,
            );
        } else console.warn("The search query is empty");
    };
</script>

<div
    class="searchBar flex items-center justify-between my-5 w-[calc(100vw-5%)] h-auto sm:mx-0 sm:w-120 sm:w-max-120"
>
    <!-- svelte-ignore a11y_autofocus -->
    <input
        class="w-1/1 h-12 border-0 text-xl rounded-md mr-3 p-2 py-4"
        autofocus
        type="text"
        placeholder="search..."
        on:keydown={(e) => {
            if (e.key === "Enter") search();
        }}
        bind:value={query}
    />
    <button
        class="searchBtn flex items-center justify-center rounded-md bg-transparent border-0 p-1 h-12 w-12 cursor-pointer"
        aria-label="Search..."
        title="Search..."
        bind:this={searchBtn}
        on:click={search}
    >
        <svg
            class="svgIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            ><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 193 351.5 128 272 128C193 128 128 193 128 272C128 351.5 193 416 272 416z"
            /></svg
        >
    </button>
</div>

<style>
    input {
        background-color: #191919;
        border: 1px solid #333;
        color: #eee;
    }
    .searchBtn:hover {
        background-color: #555555;
    }
    svg {
        fill: #eee;
    }
</style>
