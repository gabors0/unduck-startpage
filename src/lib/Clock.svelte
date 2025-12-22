<script lang="ts">
  import { onMount } from "svelte";
  import figlet from "figlet";
  import { clockFont } from "$lib/stores/options";
  import { showDate } from "$lib/stores/options";

  let clock = "";
  let currentTime = "";
  let isBasic = false;

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  function getSuffix(day) {
    if (day >= 11 && day <= 13) return "th";
    const lastDigit = day % 10;
    if (lastDigit === 1) return "st";
    if (lastDigit === 2) return "nd";
    if (lastDigit === 3) return "rd";
    return "th";
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthName = monthNames[month];

  let dateString = `${day}${getSuffix(day)} ${monthName}, ${year}`;

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
      } else if ($clockFont == "off") {
        clock = "";
        isBasic = false;
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

<div class="flex flex-col justify-center">
  {#if $clockFont !== "off"}
    <pre
      class="text-center m-0 leading-none mb-3 select-none text-base {isBasic
        ? 'sm:text-8xl max-sm:text-6xl'
        : 'sm:text-[12px] max-sm:text-[8px]'}">{clock}</pre>
  {/if}
  {#if $showDate}
    <span class="text-center w-full text-text/70 mb-3">{dateString}</span>
  {/if}
</div>
