<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import { onMount } from "svelte";

    import { dev } from "$app/environment";
    import { injectAnalytics } from "@vercel/analytics/sveltekit";
    import { page } from "$app/state";
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
    <meta property="og:image" content="https://start.gs0.me/assets/card.webp" />
    <meta property="og:site_name" content="unduck-startpage">

    <!-- xitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://start.gs0.me/" />
    <meta property="twitter:title" content="unduck-startpage" />
    <meta property="twitter:description" content="a startpage for unduck" />
    <meta property="twitter:image" content="https://start.gs0.me/assets/card.webp" />

    <link rel="icon" href={favicon} />
    <title>search</title>
</svelte:head>

<main class="flex items-center">
    <header class="absolute flex flex-row gap-x-2 top-0 right-0 p-5">
        <a
          href="/"
          aria-label="navigate to main page"
          class="{page.url.pathname === '/' ? '*:fill-accent' : 'hover:*:fill-accent'}"
        >
            <svg class="w-6 h-6 fill-text transition-transform duration-75" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/></svg>        </a>
      <a
        href="/themes"
        aria-label="navigate to theme selector"
        class="{page.url.pathname === '/themes' ? '*:fill-accent' : 'hover:*:fill-accent'}"
      >
          <svg class="w-6 h-6 fill-text transition-transform duration-75" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M290.4 70C288.9 66.4 285.4 64 281.5 64L262.5 64C258.6 64 255 66.4 253.6 70L232.9 121.7C229.7 129.7 218.3 129.7 215.1 121.7L194.4 70C192.9 66.4 189.4 64 185.5 64L176 64C149.5 64 128 85.5 128 112L128 320L512 320L512 112C512 85.5 490.5 64 464 64L358.5 64C354.6 64 351 66.4 349.6 70L328.9 121.7C325.7 129.7 314.3 129.7 311.1 121.7L290.4 70zM128 368L128 384C128 419.3 156.7 448 192 448L256 448L256 512C256 547.3 284.7 576 320 576C355.3 576 384 547.3 384 512L384 448L448 448C483.3 448 512 419.3 512 384L512 368L128 368zM320 528C311.2 528 304 520.8 304 512C304 503.2 311.2 496 320 496C328.8 496 336 503.2 336 512C336 520.8 328.8 528 320 528z"/></svg>
      </a>
      <a
        href="/options"
        aria-label="navigate to options page"
        class="{page.url.pathname === '/options' ? '*:fill-accent' : 'hover:*:fill-accent hover:*:rotate-45'}"
      >
        <svg
          class="w-6 h-6 fill-text transition-transform duration-75"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
            d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"
          /></svg
        >
      </a>
    </header>
    {@render children?.()}
</main>

<style lang="postcss">
    @reference "../app.css";
    :global(body) {
        @apply flex justify-center h-screen;
        @apply text-text;
        @apply bg-background;
        @apply border-neutral-500/70;
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
