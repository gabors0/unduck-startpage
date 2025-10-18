<script lang="ts">
    import Searchbar from "../lib/Searchbar.svelte";
    import OptionsMenu from "../lib/OptionsMenu.svelte";
</script>

<div class="flex flex-col justify-center items-center">
    <OptionsMenu />
    <pre class="font-bold font-[monospace] select-none text-[8px] sm:text-xs">
                             _/                      _/
  _/    _/  _/_/_/      _/_/_/  _/    _/    _/_/_/  _/  _/
 _/    _/  _/    _/  _/    _/  _/    _/  _/        _/_/
_/    _/  _/    _/  _/    _/  _/    _/  _/        _/  _/
 _/_/_/  _/    _/    _/_/_/    _/_/_/    _/_/_/  _/    _/
</pre>
    <Searchbar />
</div>
