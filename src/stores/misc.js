import { writable } from "svelte/store";

export const selectedCard = writable(undefined);
export const currentSection = writable(0);
