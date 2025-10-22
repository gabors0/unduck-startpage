<script lang="ts">
    import { selectedBang, useSuggestions } from "$lib/stores/options";
    import { theme, type Theme } from "$lib/stores/theme";
    let isOn = $state(false);
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

<div
    class="OptionsMenu z-99 absolute flex flex-row justify-end w-auto sm:w-128 top-2 right-2 left-2 sm:left-auto mb-2 p-3 bg-zinc-100 dark:bg-zinc-900 rounded-md"
    style:outline={isOn ? "1px solid #444" : "none"}
>
    <div class="mr-auto gap-y-4">
        {#if isOn}
            <div class="mr-auto space-y-4">
                <!--theme entry-->
                <div class="flex flex-col sm:flex-row sm:items-center gap-x-4">
                    <span class="py-3">theme</span>
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
                            <span class:underline={$theme === "light"}
                                >light</span
                            >
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
                            <span class:underline={$theme === "dark"}>dark</span
                            >
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
                            <span class:underline={$theme === "system"}
                                >system</span
                            >
                        </label>
                    </div>
                </div>

                <!--suggestions entry-->
                <div class="flex flex-col sm:flex-row sm:items-center gap-x-4">
                    <span class="py-3 cursor-help" title="uses duckduckgo">show search suggestions</span>
                    <div class="flex gap-x-4">
                        <label class="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="useSuggestions"
                                value="yes"
                                onchange={() => useSuggestions.set(true)}
                                class="cursor-pointer hidden"
                            />
                            <span class:underline={$useSuggestions === true}>yes</span
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
                            <span class:underline={$useSuggestions === false}>no</span>
                        </label>
                    </div>
                </div>

                <!--default bang entry-->
                <div
                    class="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2"
                >
                    <span
                        title={`the website to search with by default. starts with "!". default is "!g" for Google.`}
                        class="cursor-help py-3 sm:whitespace-nowrap"
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
        {/if}
    </div>
    <button
        onclick={() => (isOn = !isOn)}
        class="max-w-8 max-h-8 p-1 cursor-pointer hover:bg-zinc-200 hover:dark:bg-zinc-700 rounded-sm"
    >
        {#if !isOn}
            <svg
                class="svgIcon w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                ><!--chevron--><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                    d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z"
                /></svg
            >
        {/if}
        {#if isOn}
            <svg
                class="svgIcon w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                ><!--X--><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                    d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"
                /></svg
            >{/if}
    </button>
</div>

<style lang="postcss">
    @reference "../app.css";
    input.success {
        @apply outline-green-700 outline-3 dark:outline-green-600;
    }
    input.error {
        @apply outline-red-700 outline-3 dark:outline-red-700;
    }
    span {
        @apply text-zinc-900 dark:text-zinc-100;
    }
</style>
