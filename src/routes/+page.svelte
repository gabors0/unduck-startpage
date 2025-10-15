<script lang="ts">
    import Searchbar from "../lib/Searchbar.svelte";
    import Settings from "../lib/OptionsMenu.svelte";
</script>

<div class="flex flex-col justify-center items-center">
    <Settings />
    <pre class="hidden sm:block font-bold font-mono select-none text-xs">
                             _/                      _/
  _/    _/  _/_/_/      _/_/_/  _/    _/    _/_/_/  _/  _/
 _/    _/  _/    _/  _/    _/  _/    _/  _/        _/_/
_/    _/  _/    _/  _/    _/  _/    _/  _/        _/  _/
 _/_/_/  _/    _/    _/_/_/    _/_/_/    _/_/_/  _/    _/
</pre>
    <h1 class="sm:hidden text-4xl">unduck</h1>
    <Searchbar />
</div>
