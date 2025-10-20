<script lang="ts">
	import { theme, type Theme } from './stores/theme';

	const themes: Theme[] = ['light', 'dark', 'system'];

	const icons = {
		light: '☀️',
		dark: '🌙',
		system: '💻'
	};

	const labels = {
		light: 'Light',
		dark: 'Dark',
		system: 'System'
	};

	function cycleTheme() {
		const currentIndex = themes.indexOf($theme);
		const nextIndex = (currentIndex + 1) % themes.length;
		theme.set(themes[nextIndex]);
	}

	function setThemeValue(value: Theme) {
		theme.set(value);
	}
</script>

<button
	on:click={cycleTheme}
	class="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
	title="Toggle theme (currently: {labels[$theme]})"
	aria-label="Toggle theme"
>
	<span class="text-xl">{icons[$theme]}</span>
</button>

<!-- Alternative: Dropdown version -->
<!--
<div class="relative group">
	<button
		class="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
		aria-label="Theme selector"
	>
		<span class="text-xl">{icons[$theme]}</span>
	</button>
	<div
		class="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
	>
		<div class="py-1" role="menu">
			{#each themes as themeOption}
				<button
					on:click={() => setThemeValue(themeOption)}
					class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 {$theme ===
					themeOption
						? 'bg-gray-50 dark:bg-gray-700'
						: ''}"
					role="menuitem"
				>
					<span>{icons[themeOption]}</span>
					<span>{labels[themeOption]}</span>
				</button>
			{/each}
		</div>
	</div>
</div>
-->
