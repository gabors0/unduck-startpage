<script lang="ts">
    import { onMount } from "svelte";
    let isOn = $state(false);
    let defaultBang = $state("!g");
    let input = $state("");
    let isUnsuccessful = $state(false);
    let isSuccessful = $state(false);
    

    onMount(() => {
        const stored = localStorage.getItem("defaultBang");
        if (stored && stored.startsWith("!")) {
            defaultBang = stored;
        }
    });

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
        defaultBang = value;
        isSuccessful = true;
        setTimeout(() => {
            isSuccessful = false;
        }, 1000);
        localStorage.setItem("defaultBang", value);
        console.log("Default bang set to:", defaultBang);
    }
</script>

<div
    class="OptionsMenu absolute flex flex-row space-x-4 top-0 right-0 m-2 p-3 rounded-md"
    style:background-color={isOn ? "#222" : "transparent"}
>
    {#if isOn}
        <div class="space-x-2">
            <span
                title={`the website to search with by default. starts with "!". default is "!g" for Google.`}
                class="cursor-help py-3">default bang</span
            >
            <input
                bind:value={input}
                class:success={isSuccessful}
                class:error={isUnsuccessful}
                type="text"
                placeholder={defaultBang}
                class="border-0 rounded-md p-2"
            />
            <button
                onclick={() => setDefaultBang(input)}
                class="p-2 rounded-md hover:bg-neutral-600">Save</button
            >
            <button
                onclick={() => {
                    defaultBang = "!g";
                    input = "";
                    localStorage.setItem("defaultBang", "!g");
                }}
                class="p-2 rounded-md hover:bg-neutral-600">Reset</button
            >
        </div>
    {/if}
    <button
        onclick={() => (isOn = !isOn)}
        class="max-w-8 max-h-8 p-1 rounded-sm"
    >
        {#if !isOn}
            <svg
                class="svgIcon w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                ><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                    d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z"
                /></svg
            >
        {/if}
        {#if isOn}
            <svg
                class="svgIcon w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                ><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                    d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"
                /></svg
            >{/if}
    </button>
</div>

<style>
    button:hover {
        background-color: #555;
    }
    input {
        background-color: #191919;
        border: 1px solid #333;
        color: #eee;
    }
    input:focus {
        outline: 2px solid #059a88;
    }
    input.success {
        background-color: #002300;
        outline: 2px solid #006500;
    }
    input.error {
        background-color: #230000;
        outline: 2px solid #850000;
    }
</style>
