import { writable, type Writable } from 'svelte/store';
import { debounce } from './utils';

const stores: { [key: string]: Writable<any> } = {};
const IS_BROWSER = typeof window !== 'undefined';
const updateLocalStorage = (key: string, val: any) => {
	if (typeof val === 'undefined') return localStorage.removeItem(key);
	localStorage.setItem(key, JSON.stringify(val));
};

export const createBrowserStore = <T>(key: string, placeholder: T): Writable<T> => {
	if (stores[key]) return stores[key];

	let value = undefined;
	if (IS_BROWSER) {
		const localStorageValue = localStorage.getItem(key);
		value = localStorageValue !== null ? JSON.parse(localStorageValue) : undefined;
	}
	const store = writable<T>(value ?? placeholder);
	const updateDebounced = debounce(updateLocalStorage, 1000);

	store.subscribe((val) => {
		if (typeof window === 'undefined') return;
		updateDebounced(key, val);
	});

	stores[key] = store;

	return store;
};


export const freePtr = (ptr: string) => {
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (key?.startsWith(ptr)) {
			i--;
			localStorage.removeItem(key);
		}
	}
};