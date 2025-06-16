import { writable } from "svelte/store";

export let collapsedSidebar = writable<boolean>(true);
