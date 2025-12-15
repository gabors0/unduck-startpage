<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import { onMount } from "svelte";

    import { dev } from "$app/environment";
    import { injectAnalytics } from "@vercel/analytics/sveltekit";
    import "$lib/stores/theme";

    injectAnalytics({ mode: dev ? "development" : "production" });

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
        @apply flex justify-center overflow-hidden h-screen;
        @apply text-text;
        @apply bg-background;
        @apply border-muted;

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
    
    :global(*):focus {
      outline: none;
    }
  
    :global(*):focus-visible {
        @apply outline-accent outline-1;
    }
    
    :global(::selection, ::-moz-selection) {
        @apply bg-accent text-background;
    }

    :global(input:focus, select:focus) {
        @apply outline-accent outline-2;
    }
    :global(button:hover, label > span:hover) {
        @apply text-accent;
    }
</style>
