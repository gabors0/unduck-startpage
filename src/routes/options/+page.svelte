<script lang="ts">
    import { selectedBang, useSuggestions } from "$lib/stores/options";
    import { theme, type Theme } from "$lib/stores/theme";
    let input = $state("");
    let isUnsuccessful = $state(false);
    let isSuccessful = $state(false);

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
</script>

<!-- <div
    class="OptionsMenu flex flex-row justify-end w-auto sm:w-128 top-2 right-2 left-2 sm:left-auto mb-2 p-3 bg-zinc-100 dark:bg-zinc-900 rounded-md"
>
    <div class="mr-auto gap-y-4">
        <div class="mr-auto space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center gap-x-4">
                <span class="py-3 font-bold">theme</span>
                <div class="flex gap-x-4">
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
                        <span class:underline={$theme === "system"}>system</span
                        >
                    </label>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center gap-x-4">
                <span class="py-3 cursor-help font-bold" title="uses duckduckgo"
                    >show search suggestions</span
                >
                <div class="flex gap-x-4">
                    <label class="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="useSuggestions"
                            value="yes"
                            onchange={() => useSuggestions.set(true)}
                            class="cursor-pointer hidden"
                        />
                        <span class:underline={$useSuggestions === true}
                            >yes</span
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
                        <span class:underline={$useSuggestions === false}
                            >no</span
                        >
                    </label>
                </div>
            </div>

            <div
                class="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2"
            >
                <span
                    title={`the website to search with by default. starts with "!". default is "!g" for Google.`}
                    class="cursor-help py-3 sm:whitespace-nowrap font-bold"
                    >default bang</span
                >
                <input
                    bind:value={input}
                    class:success={isSuccessful}
                    class:error={isUnsuccessful}
                    type="text"
                    placeholder={$selectedBang}
                    class="border-0 rounded-md p-2 transition-[outline] duration-50 sm:w-32"
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
        </div>
    </div>
</div> -->

<div class="flex flex-col gap-y-5 m-auto text-left w-[42rem] p-3">
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
        <div class="p-3 flex flex-row">
            <input
                bind:value={input}
                class:success={isSuccessful}
                class:error={isUnsuccessful}
                type="text"
                placeholder={$selectedBang}
                class="border-0 rounded-md p-2 mr-3 transition-[outline] duration-50 sm:w-32"
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
