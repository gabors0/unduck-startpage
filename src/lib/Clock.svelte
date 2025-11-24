<script lang="ts">
    import { onMount } from "svelte";
    import figlet from "figlet";
    import { clockFont } from "$lib/stores/options";

    let clock = "";
    let currentTime = "";
    let isBasic = false;

    async function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    
        if (timeString !== currentTime) {
            currentTime = timeString;
            if ($clockFont == "none") {
                clock = timeString;
                isBasic = true;
                
            } else {
                figlet.text(timeString, { font: $clockFont }, (err, result) => {
                    if (!err) {
                        clock = result;
                        isBasic = false;
                    }
                });
            }
        }
    }

    onMount(() => {
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    });
</script>

<div>
    <pre
        class="text-center m-0 leading-none mb-3 select-none text-base {!isBasic ? "text-[8px] sm:text-[12px]" : "sm:text-7xl text-3xl" }">{clock}</pre>  
</div>
