<script>
    import { onMount } from "svelte";
    import figlet from "figlet";

    let clock = "";
    let currentTime = "";

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

            figlet.text(timeString, { font: "Alligator2" }, (err, result) => {
                if (!err) {
                    clock = result;
                }
            });
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
        class="text-center m-0 leading-none mb-3 select-none text-[8px] sm:text-[12px] md:text-base">{clock}</pre>
</div>
