<script lang="ts">
  import { selectedBang, useSuggestions } from "$lib/stores/options";
  import { suggestionsVisible } from "$lib/stores/suggestions";

  let query = "";
  let activeBangPrefix = "";
  let searchBtn;
  let suggestions: Array<{ phrase: string }> = [];
  let bangSuggestions: Array<{ t: string; s: string; d: string; c: string }> =
    [];

  let isFocused = true;

  $: isBangMode = /^!\S*$/.test(query);

  $: if (!$useSuggestions) {
    suggestions = [];
  }

  $: suggestionsVisible.set(
    suggestions.length > 0 || bangSuggestions.length > 0,
  );

  const search = () => {
    if (query) {
      const hasBang = /!\w+/.test(query);
      const searchQuery = hasBang ? query : `${$selectedBang} ${query}`;

      window.location.assign(
        `https://unduck.link?q=${encodeURIComponent(searchQuery)}`,
      );
    } else console.warn("The search query is empty");
  };

  //duckduckgo.com/ac/?q=%q
  const getSuggestions = async (q = query) => {
    if (q.length > 2) {
      try {
        const response = await fetch(
          `/api/suggestions?q=${encodeURIComponent(q)}`,
        );
        const data = await response.json();
        data.splice(5);
        suggestions = data;
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        suggestions = [];
      }
    } else {
      suggestions = [];
    }
  };

  const getBangSuggestions = async () => {
    const fragment = query.slice(1); // strip leading '!'
    if (query.length >= 2) {
      try {
        const response = await fetch(
          `/api/bangs?q=${encodeURIComponent(fragment)}`,
        );
        bangSuggestions = await response.json();
      } catch (error) {
        console.error("Failed to fetch bang suggestions:", error);
        bangSuggestions = [];
      }
    } else {
      bangSuggestions = [];
    }
  };
</script>

<div class="relative w-[calc(100vw-5%)] sm:w-120">
  <div
    class="searchBar flex items-center justify-between my-3 w-full h-auto outline-1 p-1 rounded-lg {isFocused
      ? 'outline-accent'
      : 'outline-text/20'}"
    class:outline-2={isFocused}
  >
    <!-- svelte-ignore a11y_autofocus -->
    <input
      class="w-1/1 h-12 text-xl rounded-md mr-3 p-2 py-4 focus:outline-none"
      on:focus={() => (isFocused = true)}
      on:blur={() => (isFocused = false)}
      autofocus
      type="text"
      placeholder="search..."
      on:keydown={(e) => {
        if (e.key === "Enter") search();
      }}
      bind:value={query}
      on:input={() => {
        const bangMode = /^!\S*$/.test(query);
        if (bangMode) {
          suggestions = [];
          getBangSuggestions();
        } else {
          bangSuggestions = [];
          if ($useSuggestions) {
            const afterBang = query.match(/^(!\S+)\s+([\s\S]+)$/);
            if (afterBang) {
              activeBangPrefix = afterBang[1];
              getSuggestions(afterBang[2]);
            } else {
              activeBangPrefix = "";
              getSuggestions(query);
            }
          }
        }
      }}
    />
    <button
      class="searchBtn flex items-center justify-center rounded-md bg-transparent border-0 p-1 h-12 w-12 cursor-pointer hover:bg-neutral-500/10 hover:[&_svg]:fill-accent active:bg-accent active:[&_svg]:fill-background"
      aria-label="Search..."
      title="Search..."
      bind:this={searchBtn}
      on:click={search}
    >
      <svg
        class="svgIcon w-9 h-9 fill-text"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
          d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"
        /></svg
      >
    </button>
  </div>
  {#if suggestions.length > 0}
    <div
      class="SearchSuggestions absolute top-full z-10 flex flex-col items-start justify-center w-full h-auto outline outline-text/20 rounded-md overflow-hidden bg-background"
    >
      {#each suggestions as suggestion}
        <span
          class="w-full px-3 cursor-pointer hover:bg-neutral-500/10"
          on:click={() => {
            query = activeBangPrefix ? `${activeBangPrefix} ${suggestion.phrase}` : suggestion.phrase;
            search();
          }}
          on:keydown={(e) => {
            if (e.key === "Enter") {
              query = activeBangPrefix ? `${activeBangPrefix} ${suggestion.phrase}` : suggestion.phrase;
              search();
            }
          }}
          role="button"
          tabindex="0"
        >
          {#if activeBangPrefix}<span class="text-text/40">{activeBangPrefix}&nbsp;</span>{/if}{suggestion.phrase}
        </span>
      {/each}
    </div>
  {/if}
  {#if bangSuggestions.length > 0}
    <div
      class="BangSuggestions absolute top-full z-10 flex flex-col items-start justify-center w-full h-auto outline outline-text/20 rounded-md overflow-hidden bg-background"
    >
      {#each bangSuggestions as bang}
        <span
          class="w-full px-3 cursor-pointer hover:bg-neutral-500/10"
          on:click={() => {
            query = "!" + bang.t + " ";
            bangSuggestions = [];
          }}
          on:keydown={(e) => {
            if (e.key === "Enter") {
              query = "!" + bang.t + " ";
              bangSuggestions = [];
            }
          }}
          role="button"
          tabindex="0"
        >
          <span class="font-mono text-accent">!{bang.t}</span>
          <span class="text-text/70">- {bang.s}</span>
        </span>
      {/each}
    </div>
  {/if}
</div>
