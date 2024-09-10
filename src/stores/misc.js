import { writable } from "svelte/store";
import _ from "lodash";

export const currentSection = writable(0);
export const loadedSections = writable(_.range(6).map((d) => false));
