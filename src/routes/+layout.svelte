<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import { onMount } from "svelte";

    import { dev } from "$app/environment";
    import { injectAnalytics } from "@vercel/analytics/sveltekit";
    import "$lib/stores/theme";

    injectAnalytics({ mode: dev ? "development" : "production" });

    let { children } = $props();
</script>

<svelte:head>
    <!-- avoid flash -->
    <script>
        if (typeof window !== 'undefined') {
            const theme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', theme);
        }
    </script>

    <!-- meta tags -->
    <title>gabors0</title>
    <meta name="title" content="unduck-startpage" />
    <meta name="description" content="a startpage for unduck" />
    <meta name="author" content="gabors0" />
    <meta name="keywords" content="unduck, search, startpage, bangs, searchpage, homepage" />
    <meta name="theme-color" content="" />

    <!-- open graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://start.gs0.me/" />
    <meta property="og:title" content="unduck-startpage" />
    <meta property="og:description" content="a startpage for unduck" />
    <meta property="og:image" content="https://start.gs0.me/card.webp" />
    <meta property="og:site_name" content="unduck-startpage">

    <!-- xitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://start.gs0.me/" />
    <meta property="twitter:title" content="unduck-startpage" />
    <meta property="twitter:description" content="a startpage for unduck" />
    <meta property="twitter:image" content="https://start.gs0.me/card.webp" />

    <link rel="icon" href={favicon} />
    <title>search</title>
</svelte:head>

<main class="flex items-center">
    {@render children?.()}
</main>

<style lang="postcss">
    @reference "../app.css";
    :global(body) {
        @apply flex justify-center h-screen;
        @apply text-text;
        @apply bg-background;
        @apply border-muted;
        @apply transition-colors duration-300 ease-in-out;

        min-height: 100svh, 100vh;
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

    :global(*):focus {
      outline: none;
    }

    :global(*):focus-visible {
        @apply outline-accent outline-1;
    }

    :global(::selection, ::-moz-selection) {
        @apply bg-accent text-background;
    }

    :global(button:hover, label > span:hover) {
        @apply text-accent;
    }
</style>
