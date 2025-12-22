<script>
  import Theme from "$lib/Theme.svelte";
  import { theme } from "$lib/stores/theme";
</script>

<div class="flex flex-col">
  <i class="text-center opacity-50">more themes coming soon</i>
  <div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 p-3">
    <section>
      <!-- default -->
      <h1 class="text-2xl text-center mb-2">default</h1>
      <input
        type="radio"
        id="theme-light"
        name="theme"
        value="light"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label
        for="theme-light"
        class="cursor-pointer {$theme === 'light'
          ? 'outline-accent outline-4'
          : ''}"
      >
        <Theme themeName="light" themeTitle="Light" />
      </label>

      <input
        type="radio"
        id="theme-dark"
        name="theme"
        value="dark"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label
        for="theme-dark"
        class="cursor-pointer {$theme === 'dark'
          ? 'outline-accent outline-4'
          : ''}"
      >
        <Theme themeName="dark" themeTitle="Dark" />
      </label>

      <input
        type="radio"
        id="theme-amoled"
        name="theme"
        value="amoled"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label
        for="theme-amoled"
        class="cursor-pointer {$theme === 'amoled'
          ? 'outline-accent outline-4'
          : ''}"
      >
        <Theme themeName="amoled" themeTitle="Amoled" />
      </label>
    </section>

    <section>
      <!-- light -->
      <h1 class="text-2xl text-center mb-2">light</h1>
      <input
        type="radio"
        id="theme-ayu-light"
        name="theme"
        value="ayu-light"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label
        for="theme-ayu-light"
        class="cursor-pointer {$theme === 'ayu-light'
          ? 'outline-accent outline-4'
          : ''}"
      >
        <Theme themeName="ayu-light" themeTitle="Ayu Light" />
      </label>
    </section>

    <section>
      <!-- dark -->
      <h1 class="text-2xl text-center mb-2">dark</h1>
      <input
        type="radio"
        id="theme-nord"
        name="theme"
        value="nord"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label
        for="theme-nord"
        class="cursor-pointer {$theme === 'nord'
          ? 'outline-accent outline-4'
          : ''}"
      >
        <Theme themeName="nord" themeTitle="Nord" />
      </label>

      <input
        type="radio"
        id="theme-gruvbox"
        name="theme"
        value="gruvbox"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label
        for="theme-gruvbox"
        class="cursor-pointer {$theme === 'gruvbox'
          ? 'outline-accent outline-4'
          : ''}"
      >
        <Theme themeName="gruvbox" themeTitle="Gruvbox" />
      </label>

      <input
        type="radio"
        id="theme-one-dark"
        name="theme"
        value="one-dark"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label
        for="theme-one-dark"
        class="cursor-pointer {$theme === 'one-dark'
          ? 'outline-accent outline-4'
          : ''}"
      >
        <Theme themeName="one-dark" themeTitle="One Dark" />
      </label>

      <input
        type="radio"
        id="theme-catppuccin"
        name="theme"
        value="catppuccin"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label
        for="theme-catppuccin"
        class="cursor-pointer {$theme === 'catppuccin'
          ? 'outline-accent outline-4'
          : ''}"
      >
        <Theme themeName="catppuccin" themeTitle="Catppuccin" />
      </label>

      <input
        type="radio"
        id="theme-terminal"
        name="theme"
        value="terminal"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label
        for="theme-terminal"
        class="cursor-pointer {$theme === 'terminal'
          ? 'outline-accent outline-4'
          : ''}"
      >
        <Theme themeName="terminal" themeTitle="Terminal" />
      </label>

      <input
        type="radio"
        id="theme-ayu-dark"
        name="theme"
        value="ayu-dark"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label
        for="theme-ayu-dark"
        class="cursor-pointer {$theme === 'ayu-dark'
          ? 'outline-accent outline-4'
          : ''}"
      >
        <Theme themeName="ayu-dark" themeTitle="Ayu Dark" />
      </label>

      <input
        type="radio"
        id="theme-ayu-mirage"
        name="theme"
        value="ayu-mirage"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label
        for="theme-ayu-mirage"
        class="cursor-pointer {$theme === 'ayu-mirage'
          ? 'outline-accent outline-4'
          : ''}"
      >
        <Theme themeName="ayu-mirage" themeTitle="Ayu Mirage" />
      </label>
    </section>
  </div>
</div>
