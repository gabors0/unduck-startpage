<script>
  export let themeName;
  export let themeTitle;
  export let active;
</script>


	<div
	  data-theme={themeName}
	  class="bg-background flex flex-row justify-center items-center text-text font-mono p-2 transition-all
	  {active ? "ring-accent ring-4 ring-inset" : ""}"
	>
	  {themeTitle}
	  <svg
	    class="w-4 h-4 ml-2 fill-accent"
	    xmlns="http://www.w3.org/2000/svg"
	    viewBox="0 0 24 24"
	    fill="currentColor"
	  >
	    <circle r="12" cx="12" cy="12" />
	  </svg>
	</div>