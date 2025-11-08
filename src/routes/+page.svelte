<script lang="ts">
    import Searchbar from "../lib/Searchbar.svelte";
    import Shortcut from "../lib/Shortcut.svelte";
    import { shortcuts } from "$lib/stores/shortcuts";
</script>

<div class="flex flex-col justify-center items-center">
    <pre class="font-bold font-[monospace] select-none text-[8px] sm:text-xs">
                             _/                      _/
  _/    _/  _/_/_/      _/_/_/  _/    _/    _/_/_/  _/  _/
 _/    _/  _/    _/  _/    _/  _/    _/  _/        _/_/
_/    _/  _/    _/  _/    _/  _/    _/  _/        _/  _/
 _/_/_/  _/    _/    _/_/_/    _/_/_/    _/_/_/  _/    _/
</pre>
    <Searchbar />
    <div class="flex justify-center max-w-[48rem] gap-4 flex-row flex-wrap">
        {#each $shortcuts as shortcut}
            <Shortcut
                title={shortcut.title}
                url={shortcut.url}
                icon={shortcut.icon}
            />
        {/each}
        <!-- <Shortcut title="sigma" url="sigma" icon="sigma" />
        <Shortcut title="sigma" url="sigma" icon="sigma" />
        <Shortcut title="sigma" url="sigma" icon="sigma" />
        <Shortcut title="sigma" url="sigma" icon="sigma" />
        <Shortcut title="sigma" url="sigma" icon="sigma" />
        <Shortcut title="sigma" url="sigma" icon="sigma" />
        <Shortcut title="sigma" url="sigma" icon="sigma" />
        <Shortcut title="sigma" url="sigma" icon="sigma" />
        <Shortcut title="sigma" url="sigma" icon="sigma" />
        <Shortcut title="sigma" url="sigma" icon="sigma" />
        <Shortcut title="sigma" url="sigma" icon="sigma" />
        <Shortcut title="sigma" url="sigma" icon="sigma" />
        <Shortcut title="sigma" url="sigma" icon="sigma" />
        <Shortcut title="sigma" url="sigma" icon="sigma" /> -->
    </div>
</div>

<footer class="absolute bottom-0 left-0 p-5">
    <span>search powered by</span>
    <a href="https://unduck.link">unduck.link</a>
    <span class="seperator select-none">•</span>
    <a href="https://github.com/gabors0/unduck-startpage">github</a>
    <span class="seperator select-none">•</span>
    <a href="/options">options</a>
</footer>

<style lang="postcss">
    @reference "../app.css";
    span {
        @apply text-zinc-400 dark:text-zinc-500;
    }
    .seperator {
        @apply text-zinc-400 dark:text-zinc-500;
    }
</style>
