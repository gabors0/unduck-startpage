<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import { onMount } from "svelte";

    let { children } = $props();

    onMount(() => {
        function setAppHeight() {
            document.documentElement.style.setProperty(
                "--app-height",
                `${window.innerHeight}px`,
            );
        }

        setAppHeight();
        window.addEventListener("resize", setAppHeight);

        return () => window.removeEventListener("resize", setAppHeight);
    });
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        rel="stylesheet"
    />
    <link rel="icon" href={favicon} />
    <title>search</title>
</svelte:head>

{@render children?.()}

<style lang="postcss">
    @reference "../app.css";
    :global(body) {
        @apply flex justify-center overflow-hidden h-screen text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900;
        height: var(--app-height, 100vh);
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
    :global(.svgIcon:not(a .svgIcon):hover) {
        /*except a shortcut that has no icon :)*/
        @apply fill-accent;
    }
    :global(input[type="text"], select) {
        @apply bg-zinc-200 dark:bg-zinc-900 outline outline-zinc-700 text-zinc-900 dark:text-zinc-100;
    }
    :global(input:focus, select:focus) {
        @apply outline-accent outline-2;
    }
    :global(button:hover, label > span:hover) {
        @apply text-accent;
    }
</style>
