<script lang="ts">
    import {
        selectedBang,
        useSuggestions,
        titleMode,
        clockFont,
        titleText,
        showDate
    } from "$lib/stores/options";
    import { theme, type Theme } from "$lib/stores/theme";
    import { shortcuts } from "$lib/stores/shortcuts";

    let input = $state("");
    let isUnsuccessfulBang = $state(false);
    let isSuccessfulBang = $state(false);
    

    //bangs
    function setDefaultBang(value: string) {
        if (
            !input.startsWith("!") ||
            input.length === 1 ||
            input.includes(" ")
        ) {
            console.error("default bang is invalid");
            input = "";
            isUnsuccessfulBang = true;
            setTimeout(() => {
                isUnsuccessfulBang = false;
            }, 1000);
            return;
        }
        selectedBang.set(value);
        input = "";
        isSuccessfulBang = true;
        setTimeout(() => {
            isSuccessfulBang = false;
        }, 1000);
        console.log("Default bang set to:", value);
    }

    //shortcuts
    let newTitle = $state("");
    let newUrl = $state("");
    let newIcon = $state("");
    let isUnsuccessfulShortcut = $state(false);
    let isSuccessfulShortcut = $state(false);

    let count = $derived($shortcuts.length);
    function addShortcut() {
        if (count < 14) {
            if (newTitle && newUrl) {
                if (!newUrl.startsWith("http")) {
                    newUrl = "http://" + newUrl;
                }
                shortcuts.update((list) => [
                    ...list,
                    {
                        url: newUrl.trim(),
                        title: newTitle,
                        icon: newIcon.trim(),
                    },
                ]);
                newTitle = "";
                newUrl = "";
                newIcon = "";
            } else {
                isUnsuccessfulShortcut = true;
                setTimeout(() => {
                    isUnsuccessfulShortcut = false;
                }, 1000);
            }
        }
    }
    function removeShortcut(index: number) {
        //@ts-ignore
        shortcuts.update((list) => list.filter((_, i) => i !== index));
    }
</script>

<div
    class="flex flex-col flex-wrap gap-y-5 m-auto text-left w-[95%] sm:w-[42rem] p-3"
>
    <section>
        <h1 class="text-2xl">theme</h1>
        <div class="flex p-3 gap-x-4 flex-wrap">
            <label class="flex items-center cursor-pointer">
                <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={$theme === "light"}
                    onchange={() => theme.set("light")}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$theme === "light"}>light</span>
            </label>
            <label class="flex items-center cursor-pointer">
                <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={$theme === "dark"}
                    onchange={() => theme.set("dark")}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$theme === "dark"}>dark</span>
            </label>

            <label class="flex items-center cursor-pointer">
                <input
                    type="radio"
                    name="theme"
                    value="amoled"
                    checked={$theme === "amoled"}
                    onchange={() => theme.set("amoled")}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$theme === "amoled"}>amoled</span>
            </label>
            <label class="flex items-center cursor-pointer">
                <input
                    type="radio"
                    name="theme"
                    value="nord"
                    checked={$theme === "nord"}
                    onchange={() => theme.set("nord")}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$theme === "nord"}>nord</span>
            </label>
            <label class="flex items-center cursor-pointer">
                <input
                    type="radio"
                    name="theme"
                    value="catppuccin"
                    checked={$theme === "catppuccin"}
                    onchange={() => theme.set("catppuccin")}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$theme === "catppuccin"}>catppuccin</span
                >
            </label>
            <label class="flex items-center cursor-pointer">
                <input
                    type="radio"
                    name="theme"
                    value="one-dark"
                    checked={$theme === "one-dark"}
                    onchange={() => theme.set("one-dark")}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$theme === "one-dark"}>one-dark</span>
            </label>
            <label class="flex items-center cursor-pointer">
                <input
                    type="radio"
                    name="theme"
                    value="gruvbox"
                    checked={$theme === "gruvbox"}
                    onchange={() => theme.set("gruvbox")}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$theme === "gruvbox"}>gruvbox</span>
            </label>
            <label class="flex items-center cursor-pointer">
                <input
                    type="radio"
                    name="theme"
                    value="terminal"
                    checked={$theme === "terminal"}
                    onchange={() => theme.set("terminal")}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$theme === "terminal"}>terminal</span>
            </label>
        </div>
    </section>

    <section>
        <h1 class="text-2xl">title mode</h1>
        <div class="flex p-3 gap-x-4">
            <label class="flex items-center cursor-pointer">
                <input
                    type="radio"
                    name="titleMode"
                    value="clock"
                    onchange={() => titleMode.set("clock")}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$titleMode === "clock"}>clock</span>
            </label>
            <label class="flex items-center cursor-pointer">
                <input
                    type="radio"
                    name="titleMode"
                    value="title"
                    onchange={() => titleMode.set("title")}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$titleMode === "title"}>ascii title</span
                >
            </label>
            <label class="flex items-center cursor-pointer">
                <input
                    type="radio"
                    name="titleMode"
                    value="text"
                    onchange={() => titleMode.set("text")}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$titleMode === "text"}>normal title</span
                >
            </label>
            <label class="flex items-center cursor-pointer">
                <input
                    type="radio"
                    name="titleMode"
                    value="none"
                    onchange={() => titleMode.set("none")}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$titleMode === "none"}>none</span>
            </label>
        </div>
    </section>

    {#if $titleMode === "clock"}
        <section>
            <h1 class="text-2xl">clock font</h1>
            <div class="flex p-3 gap-x-4">
                <select
                    bind:value={$clockFont}
                    name="asciiFont"
                    id="asciiFont"
                    class="cursor-pointer p-3 rounded-md"
                >
                    <option value="Alligator2">Alligator2</option>
                    <option value="Banner3">Banner3 (easier to read)</option>
                    <option value="Slant">Slant</option>
                    <option value="none">basic (no figlet)</option>
                    <option value="off">none (just date)</option>
                </select>
            </div>
        </section>
        <section>
            <h1 class="text-2xl">show date</h1>
            <div class="flex p-3 gap-x-4">
                <label class="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        name="showDate"
                        value="on"
                        onchange={() => showDate.set(true)}
                        class="cursor-pointer hidden"
                    />
                    <span class:underline={$showDate === true}>on</span>
                </label>
                <label class="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        name="showDate"
                        value="off"
                        onchange={() => showDate.set(false)}
                        class="cursor-pointer hidden"
                    />
                    <span class:underline={$showDate === false}>off</span>
                </label>
            </div>
        </section>
    {/if}

    {#if $titleMode === "text"}
        <section>
            <div class="flex gap-x-4 items-center flex-row">
                <h1 class="text-2xl">title text</h1>
                <i class="opacity-50">max. 48 characters</i>
            </div>
            <div class="flex p-3 gap-x-4">
                <input
                    bind:value={$titleText}
                    onchange={() => titleText.set($titleText)}
                    type="text"
                    maxlength="48"
                    placeholder="unduck"
                    class="w-32 border-0 rounded-md p-2"
                />
            </div>
        </section>
    {/if}

    <section>
        <h1 class="text-2xl">search suggestions</h1>
        <div class="flex p-3 gap-x-4">
            <label class="flex items-center cursor-pointer">
                <input
                    type="radio"
                    name="useSuggestions"
                    value="yes"
                    onchange={() => useSuggestions.set(true)}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$useSuggestions === true}
                    >duckduckgo</span
                >
            </label>
            <label class="flex items-center cursor-pointer">
                <input
                    type="radio"
                    name="useSuggestions"
                    value="no"
                    onchange={() => useSuggestions.set(false)}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$useSuggestions === false}>off</span>
            </label>
        </div>
    </section>

    <section>
        <h1 class="text-2xl">default bang</h1>
        <div class="p-3 flex flex-wrap flex-row">
            <input
                name="defaultBangInput"
                bind:value={input}
                class:success={isSuccessfulBang}
                class:error={isUnsuccessfulBang}
                type="text"
                placeholder={$selectedBang}
                class="w-32 border-0 rounded-md p-2 mr-3 transition-[outline] duration-50"
                title={`the website to search with by default. starts with "!". default is "!g" for Google.`}
            />
            <div class="flex gap-x-2">
                <button
                    onclick={() => setDefaultBang(input)}
                    class="p-2 cursor-pointer">Save</button
                >
                <button
                    onclick={() => {
                        selectedBang.set("!g");
                        input = "";
                    }}
                    class="p-2 cursor-pointer">Reset</button
                >
            </div>
        </div>
    </section>

    <section class="w-full">
        <div class="flex gap-x-4 items-center flex-row">
            <h1 class="text-2xl">shortcuts</h1>
            <i class="opacity-50">max. 14</i>
        </div>
        <div class="p-3 gap-4 flex flex-wrap flex-row items-center">
            <input
                bind:value={newTitle}
                class:error={isUnsuccessfulShortcut}
                placeholder="title"
                type="text"
                class="w-32 border-0 rounded-md p-2"
            />
            <input
                bind:value={newUrl}
                class:error={isUnsuccessfulShortcut}
                placeholder="url"
                type="text"
                class="w-32 border-0 rounded-md p-2"
            />
            <input
                bind:value={newIcon}
                placeholder="icon url"
                type="text"
                class="w-32 border-0 rounded-md p-2"
            />
            {#if count < 14}
                <button class="p-2 cursor-pointer" onclick={addShortcut}>
                    add new
                </button>
            {:else}max amount reached!{/if}
        </div>

        <div class="px-3 gap-4 w-lg flex flex-wrap">
            {#each $shortcuts as shortcut, i}
                <div
                    class="flex justify-between rounded-md *:m-2 hover:bg items-center"
                >
                    {#if shortcut.icon}
                        <img
                            src={shortcut.icon}
                            alt=""
                            class="w-8 h-8 object-cover"
                        />
                    {/if}
                    <p title={shortcut.url}>{shortcut.title}</p>
                    <button
                        class="cursor-pointer *:hover:fill-accent *:fill-text"
                        onclick={() => removeShortcut(i)}
                    >
                        <svg
                            class="svgIcon w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                            ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                                d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"
                            /></svg
                        >
                    </button>
                </div>
            {/each}
        </div>
    </section>
    <a class="text-left pr-3 text-muted hover:text-accent" href="/"
        >back to search &gt;</a
    >
</div>

<style lang="postcss">
    @reference "../../app.css";
    input {
        @apply outline-muted/50 outline-1;
    }
    input:focus, select:focus {
        @apply outline-accent outline-2;
    }
    input.success {
        @apply outline-green-700 outline-3 dark:outline-green-600;
    }
    input.error {
        @apply outline-red-700 outline-3 dark:outline-red-700;
    }
    select {
        @apply text-text bg-background outline-muted/50 outline-1;
    }
    select option {
        color: var(--color-text);
        background-color: var(--color-background);
    }
</style>
