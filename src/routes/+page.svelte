<script lang="ts">
    import Searchbar from "../lib/Searchbar.svelte";
    import Shortcut from "../lib/Shortcut.svelte";
    import Clock from "../lib/Clock.svelte";
    import Logo from "../lib/Logo.svelte";
    import { shortcuts } from "$lib/stores/shortcuts";
    import { titleMode } from "$lib/stores/options";
    import { titleText } from "$lib/stores/options";

    $: titleParts = $titleText.split("$L");
</script>

<header class="absolute bottom-0 right-0 p-5 *:text-muted">
    <a href="/options" class="hover:*:fill-accent hover:*:rotate-35">
        <svg class="w-6 h-6 fill-text transition-transform duration-75" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/></svg>
    </a>
</header>

<div class="flex flex-col justify-center items-center">
    {#if $titleMode === "clock"}
        <Clock />
    {:else if $titleMode === "title"}
        <pre
            class="font-bold font-[monospace] select-none text-[8px] mb-3 sm:text-xs">
                             _/                      _/
  _/    _/  _/_/_/      _/_/_/  _/    _/    _/_/_/  _/  _/
 _/    _/  _/    _/  _/    _/  _/    _/  _/        _/_/
_/    _/  _/    _/  _/    _/  _/    _/  _/        _/  _/
 _/_/_/  _/    _/    _/_/_/    _/_/_/    _/_/_/  _/    _/
</pre>
    {:else if $titleMode === "text"}
        <h1 class="text-5xl flex items-center gap-2">
            {#each titleParts as part, i}
                {part}
                {#if i < titleParts.length - 1}
                    <Logo class="inline-block h-[1em] w-[1em] align-middle flex-shrink-0" />
                {/if}
            {/each}
        </h1>
    {:else}{/if}
    <Searchbar />
    <div class="flex justify-center max-w-[48rem] gap-4 flex-row flex-wrap">
        {#each $shortcuts as shortcut}
            <Shortcut
                title={shortcut.title}
                url={shortcut.url}
                icon={shortcut.icon}
            />
        {/each}
    </div>
</div>

<footer class="absolute bottom-0 left-0 p-5 *:text-muted [&_a]:hover:text-accent">
    <span>search powered by</span>
    <a href="https://unduck.link">unduck.link</a>
    <span class="seperator select-none">•</span>
    <a href="https://gs0.me">gabors0</a>
    <span class="seperator select-none">•</span>
    <a href="https://github.com/gabors0/unduck-startpage">github</a>
</footer>