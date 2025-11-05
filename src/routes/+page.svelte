<script lang="ts">
    import Searchbar from "../lib/Searchbar.svelte";
    import Shortcut from "../lib/Shortcut.svelte";
</script>

<div class="flex flex-col justify-center items-center">
    <pre class="font-bold font-[monospace] select-none text-[8px] sm:text-xs">
                             _/                      _/
  _/    _/  _/_/_/      _/_/_/  _/    _/    _/_/_/  _/  _/
 _/    _/  _/    _/  _/    _/  _/    _/  _/        _/_/
_/    _/  _/    _/  _/    _/  _/    _/  _/        _/  _/
 _/_/_/  _/    _/    _/_/_/    _/_/_/    _/_/_/  _/    _/
</pre>
    <Searchbar />
    <div class="flex max-w-[27rem] gap-4 flex-row flex-wrap">
        <Shortcut
            icon="https://media.discordapp.net/attachments/1304948416979140661/1434994989057835209/image.png?ex=690c54fa&is=690b037a&hm=d3ed943719f99122e7f3dee5955e03a7a7afecbc218b7bd55a6b1e965aff8b07&=&format=webp&quality=lossless"
            title="test"
            url="https://gs0.me"
        />
        <Shortcut
            icon="https://media.BADdiscordapp.net/attachments/1304948416979140661/1434994989057835209/image.png?ex=690c54fa&is=690b037a&hm=d3ed943719f99122e7f3dee5955e03a7a7afecbc218b7bd55a6b1e965aff8b07&=&format=webp&quality=lossless"
            title="test"
            url="https://gs0.me"
        />
        <Shortcut icon="" title="test" url="https://gs0.me" />
        <Shortcut icon="" title="test" url="https://gs0.me" />
        <Shortcut icon="" title="test" url="https://gs0.me" />
        <Shortcut icon="" title="test" url="https://gs0.me" />
        <Shortcut icon="" title="test" url="https://gs0.me" />
        <Shortcut icon="" title="test" url="https://gs0.me" />
    </div>
</div>

<footer class="absolute bottom-0 left-0 p-5">
    <span>search powered by</span>
    <a href="https://unduck.link">unduck.link</a>
    <span class="seperator select-none">•</span>
    <a href="https://github.com/gabors0/unduck-startpage">github</a>
    <span class="seperator select-none">•</span>
    <a href="/options">options</a>
</footer>

<style>
    @reference "../app.css";
    span {
        @apply text-zinc-400 dark:text-zinc-500;
    }
    .seperator {
        @apply text-zinc-400 dark:text-zinc-500;
    }
</style>
