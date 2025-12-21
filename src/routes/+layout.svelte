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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link rel="icon" href={favicon} />
    <title>search</title>
</svelte:head>

<main>
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
