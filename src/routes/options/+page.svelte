<script lang="ts">
    import { selectedBang, useSuggestions } from "$lib/stores/options";
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
        <div class="flex p-3 gap-x-4">
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
                    value="system"
                    checked={$theme === "system"}
                    onchange={() => theme.set("system")}
                    class="cursor-pointer hidden"
                />
                <span class:underline={$theme === "system"}>system</span>
            </label>
        </div>
    </section>

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
                    class="flex justify-between rounded-md *:m-2 hover:bg items-center hover:bg-zinc-200 hover:dark:bg-zinc-700"
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
                        class="cursor-pointer"
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
    <a class="text-left pr-3" href="/">back to search &gt;</a>
</div>

<style lang="postcss">
    @reference "../../app.css";
    input.success {
        @apply outline-green-700 outline-3 dark:outline-green-600;
    }
    input.error {
        @apply outline-red-700 outline-3 dark:outline-red-700;
    }
    span {
        @apply text-zinc-600 dark:text-zinc-300;
    }
</style>
