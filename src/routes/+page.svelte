<script lang="ts">
    import Searchbar from "../lib/Searchbar.svelte";
    import Shortcut from "../lib/Shortcut.svelte";
    import Clock from "../lib/Clock.svelte";
    import { shortcuts } from "$lib/stores/shortcuts";
    import { titleMode } from "$lib/stores/options";
    import { titleText } from "$lib/stores/options";
</script>

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
        <h1 class="text-5xl">{$titleText}</h1>
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

<footer class="absolute bottom-0 left-0 p-5 *:text-muted">
    <span>search powered by</span>
    <a href="https://unduck.link">unduck.link</a>
    <span class="seperator select-none">•</span>
    <a href="https://github.com/gabors0/unduck-startpage">github</a>
    <span class="seperator select-none">•</span>
    <a href="/options">options</a>
</footer>

<style lang="postcss">
    @reference "../app.css";
    a:hover {
        @apply text-accent;
    }
</style>