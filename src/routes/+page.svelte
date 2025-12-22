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
          <Logo
            class="inline-block h-[1em] w-[1em] align-middle flex-shrink-0"
          />
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

<footer
  class="absolute bottom-0 left-0 p-5 *:text-text/70 [&_a]:hover:text-accent"
>
  <span>search powered by</span>
  <a href="https://unduck.link">unduck.link</a>
  <span class="seperator select-none">•</span>
  <a href="https://gs0.me">gabors0</a>
  <span class="seperator select-none">•</span>
  <a href="https://github.com/gabors0/unduck-startpage">github</a>
</footer>
