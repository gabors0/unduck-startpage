<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>search</title>
</svelte:head>

<footer class="absolute bottom-0 left-0 p-5">
    <span>search powered by</span>
    <a href="https://unduck.link">unduck.link</a>
    <span class="seperator select-none">•</span>
    <a href="https://github.com/gabors0/unduck-startpage">github</a>
</footer>

{@render children?.()}

<style lang="postcss">
    @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
    @reference "../app.css";
    :global(body) {
        @apply flex justify-center overflow-hidden h-screen text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900;
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
    }
    :global(::selection) {
        @apply bg-accent text-zinc-100 dark:text-zinc-900;
    }
    :global(a) {
        @apply text-zinc-500 dark:text-zinc-500;
        text-decoration: none;
    }
    :global(a:hover) {
        @apply text-zinc-600 dark:text-zinc-400;
    }
    :global(a:active) {
        @apply text-accent;
    }
    :global(.svgIcon) {
        @apply fill-zinc-900 dark:fill-zinc-100;
    }
    :global(input) {
        @apply bg-zinc-200 dark:bg-zinc-900 outline outline-zinc-700 text-zinc-900 dark:text-zinc-100;
    }
    :global(input:focus) {
        @apply outline-accent outline;
    }
    :global(button:hover) {
        @apply bg-zinc-200 dark:bg-zinc-900;
    }
    span {
        @apply text-zinc-400 dark:text-zinc-500;
    }
    .seperator {
        @apply text-zinc-400 dark:text-zinc-500;
    }
</style>
