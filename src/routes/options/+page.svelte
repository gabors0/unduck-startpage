<script lang="ts">
    import { selectedBang, useSuggestions } from "$lib/stores/options";
    import { theme, type Theme } from "$lib/stores/theme";
    import { shortcuts } from "$lib/stores/shortcuts";

    let input = $state("");
    let isUnsuccessful = $state(false);
    let isSuccessful = $state(false);

    //bangs
    function setDefaultBang(value: string) {
        if (
            !input.startsWith("!") ||
            input.length === 1 ||
            input.includes(" ")
        ) {
            console.error("default bang is invalid");
            input = "";
            isUnsuccessful = true;
            setTimeout(() => {
                isUnsuccessful = false;
            }, 1000);
            return;
        }
        selectedBang.set(value);
        input = "";
        isSuccessful = true;
        setTimeout(() => {
            isSuccessful = false;
        }, 1000);
        console.log("Default bang set to:", value);
    }

    //shortcuts
    let newTitle = $state("");
    let newUrl = $state("");
    let newIcon = $state("");

    function addShortcut() {
        if (!newTitle || !newUrl || !newIcon) {
            isUnsuccessful = true;
            setTimeout(() => {
                isUnsuccessful = false;
            }, 1000);
        } else {
            shortcuts.update((list) => [
                ...list,
                { url: newUrl, title: newTitle, icon: newIcon },
            ]);
            newTitle = "";
            newUrl = "";
            newIcon = "";
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
                class:success={isSuccessful}
                class:error={isUnsuccessful}
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

    <section>
        <h1 class="text-2xl">shortcuts</h1>
        <div class="p-3 flex flex-wrap flex-row items-center">
            <input
                bind:value={newTitle}
                class:success={isSuccessful}
                class:error={isUnsuccessful}
                placeholder="title"
                type="text"
                class="w-32 border-0 rounded-md p-2 mr-3"
            />
            <input
                bind:value={newUrl}
                class:success={isSuccessful}
                class:error={isUnsuccessful}
                placeholder="url"
                type="text"
                class="w-32 border-0 rounded-md p-2 mr-3"
            />
            <input
                bind:value={newIcon}
                class:success={isSuccessful}
                class:error={isUnsuccessful}
                placeholder="icon url"
                type="text"
                class="w-32 border-0 rounded-md p-2 mr-3"
            />
            <button class="p-2 cursor-pointer" onclick={addShortcut}>
                add new
            </button>
        </div>

        <div class="w-lg flex flex-wrap">
            {#each $shortcuts as shortcut, i}
                <div
                    class="flex justify-between rounded-md hover:bg items-center hover:bg-zinc-200 hover:dark:bg-zinc-700"
                >
                    <p class="p-2">{shortcut.title}</p>
                    <button
                        class="p-2 cursor-pointer"
                        onclick={() => removeShortcut(i)}>Remove</button
                    >
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
