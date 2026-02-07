<script>
  import Theme from "$lib/Theme.svelte";
  import { theme } from "$lib/stores/theme";
</script>

<div class="flex flex-col md:h-screen py-16 md:p-0 items-center justify-center">
  <i class="text-center opacity-50">more themes coming soon</i>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
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
      <label for="theme-light" class="cursor-pointer">
        <Theme
          themeName="light"
          themeTitle="Light"
          active={$theme === "light"}
        />
      </label>

      <input
        type="radio"
        id="theme-dark"
        name="theme"
        value="dark"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label for="theme-dark" class="cursor-pointer">
        <Theme themeName="dark" themeTitle="Dark" active={$theme === "dark"} />
      </label>

      <input
        type="radio"
        id="theme-amoled"
        name="theme"
        value="amoled"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label for="theme-amoled" class="cursor-pointer">
        <Theme
          themeName="amoled"
          themeTitle="Amoled"
          active={$theme === "amoled"}
        />
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
      <label for="theme-ayu-light" class="cursor-pointer">
        <Theme
          themeName="ayu-light"
          themeTitle="Ayu Light"
          active={$theme === "ayu-light"}
        />
      </label>

      <input
        type="radio"
        id="theme-catppuccin-light"
        name="theme"
        value="catppuccin-light"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label for="theme-catppuccin-light" class="cursor-pointer">
        <Theme
          themeName="catppuccin-light"
          themeTitle="Catppuccin Latte"
          active={$theme === "catppuccin-light"}
        />
      </label>

      <input
        type="radio"
        id="theme-solarized-light"
        name="theme"
        value="solarized-light"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label for="theme-solarized-light" class="cursor-pointer">
        <Theme
          themeName="solarized-light"
          themeTitle="Solarized Light"
          active={$theme === "solarized-light"}
        />
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
      <label for="theme-nord" class="cursor-pointer">
        <Theme themeName="nord" themeTitle="Nord" active={$theme === "nord"} />
      </label>

      <input
        type="radio"
        id="theme-gruvbox"
        name="theme"
        value="gruvbox"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label for="theme-gruvbox" class="cursor-pointer">
        <Theme
          themeName="gruvbox"
          themeTitle="Gruvbox"
          active={$theme === "gruvbox"}
        />
      </label>

      <input
        type="radio"
        id="theme-one-dark"
        name="theme"
        value="one-dark"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label for="theme-one-dark" class="cursor-pointer">
        <Theme
          themeName="one-dark"
          themeTitle="One Dark"
          active={$theme === "one-dark"}
        />
      </label>

      <input
        type="radio"
        id="theme-catppuccin"
        name="theme"
        value="catppuccin"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label for="theme-catppuccin" class="cursor-pointer">
        <Theme
          themeName="catppuccin"
          themeTitle="Catppuccin"
          active={$theme === "catppuccin"}
        />
      </label>

      <input
        type="radio"
        id="theme-terminal"
        name="theme"
        value="terminal"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label for="theme-terminal" class="cursor-pointer">
        <Theme
          themeName="terminal"
          themeTitle="Terminal"
          active={$theme === "terminal"}
        />
      </label>

      <input
        type="radio"
        id="theme-ayu-dark"
        name="theme"
        value="ayu-dark"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label for="theme-ayu-dark" class="cursor-pointer">
        <Theme
          themeName="ayu-dark"
          themeTitle="Ayu Dark"
          active={$theme === "ayu-dark"}
        />
      </label>

      <input
        type="radio"
        id="theme-ayu-mirage"
        name="theme"
        value="ayu-mirage"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label for="theme-ayu-mirage" class="cursor-pointer">
        <Theme
          themeName="ayu-mirage"
          themeTitle="Ayu Mirage"
          active={$theme === "ayu-mirage"}
        />
      </label>

      <input
        type="radio"
        id="theme-solarized"
        name="theme"
        value="solarized"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label for="theme-solarized" class="cursor-pointer">
        <Theme
          themeName="solarized"
          themeTitle="Solarized"
          active={$theme === "solarized"}
        />
      </label>

      <input
        type="radio"
        id="theme-steam"
        name="theme"
        value="steam"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label for="theme-steam" class="cursor-pointer">
        <Theme
          themeName="steam"
          themeTitle="Steam"
          active={$theme === "steam"}
        />
      </label>

      <input
        type="radio"
        id="theme-steam-old"
        name="theme"
        value="steam-old"
        class="sr-only peer"
        bind:group={$theme}
      />
      <label for="theme-steam-old" class="cursor-pointer">
        <Theme
          themeName="steam-old"
          themeTitle="Steam 2003"
          active={$theme === "steam-old"}
        />
      </label>
    </section>
  </div>
</div>
