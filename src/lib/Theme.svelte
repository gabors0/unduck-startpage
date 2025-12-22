<script>
  export let themeName;
  export let themeTitle;
</script>

<div
  data-theme={themeName}
  class="bg-background flex flex-row items-center text-text font-mono p-2 font-bold"
>
  {themeTitle}
  <svg
    class="w-4 h-4 ml-2 fill-accent"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"><circle r="12" cx="12" cy="12" /></svg
  >
</div>
