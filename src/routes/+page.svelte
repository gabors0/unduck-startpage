<script lang="ts">
    import Searchbar from "../lib/Searchbar.svelte";
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
</div>

<footer class="absolute bottom-0 left-0 p-5">
    <span>search powered by</span>
    <a href="https://unduck.link">unduck.link</a>
    <span class="seperator select-none">•</span>
    <a href="https://github.com/gabors0/unduck-startpage">github</a>
    <span class="seperator select-none">•</span>
    <a href="/options">options</a>
</footer>

<style>
    @reference "../app.css";
    span {
        @apply text-zinc-400 dark:text-zinc-500;
    }
    .seperator {
        @apply text-zinc-400 dark:text-zinc-500;
    }
</style>
