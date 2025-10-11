<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<footer>
    <span style="color: #bbb;">search powered by</span>
    <a href="https://unduck.link">unduck.link</a>
    <span class="seperator">•</span>
    <a href="https://github.com/gabors0/unduck-startpage">github</a>
</footer>

{@render children?.()}

<style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
    :global(body) {
        background: #131313;
        font-family: "Inter", "Arial", monospace;
        color: #eee;
        display: flex;
        justify-content: center;
        height: 100vh;
        overflow: hidden;
    }
    :global(a) {
        color: #bbb;
        text-decoration: none;
    }
    :global(a:hover) {
        color: #eee;
    }
    :global(a:active) {
        color: #ccc;
    }
    :global(.svgIcon) {
        fill: #fff;
    }
    .seperator {
        color: #bbb;
        user-select: none;
    }
    footer {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 20px;
    }
</style>
