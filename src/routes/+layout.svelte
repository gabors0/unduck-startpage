<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<footer class="absolute top-0 left-0 p-5">
    <span>search powered by</span>
    <a href="https://unduck.link">unduck.link</a>
    <span class="seperator select-none">•</span>
    <a href="https://github.com/gabors0/unduck-startpage">github</a>
</footer>

{@render children?.()}

<style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
    :global(body) {
        background: #131313;
        font-family:
            "Inter",
            system-ui,
            -apple-system,
            "Segoe UI",
            Roboto,
            Helvetica,
            Arial,
            sans-serif,
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Noto Color Emoji";
        color: #eee;
        display: flex;
        justify-content: center;
        height: 100vh;
        overflow: hidden;
    }
    :global(::selection) {
        background: #059a88;
        color: #191919;
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
    :global(*:focus) {
        background-color: #333;
        outline: 2px solid #059a88;
    }
    :global(button:active, input:active) {
        background-color: #454545;
        outline: 2px solid #059a88;
    }
    :global(.svgIcon) {
        fill: #eee;
    }
    input {
        background-color: #191919;
        border: 1px solid #333;
        color: #eee;
    }
    span {
        color: #bbb;
    }
    .seperator {
        color: #bbb;
    }
</style>
