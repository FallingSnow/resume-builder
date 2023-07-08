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

export function exportBackup() {
	console.debug('Downloading backup');
	downloadObjectAsJson(localStorage, 'resume');
}

export function importBackup() {
	console.debug('Opening file selector');
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.json';
	input.click();
	input.onchange = (e) => {
		const reader = new FileReader();
		const target = e.currentTarget as HTMLInputElement;
		const files = target.files;
		if ((files?.length ?? 0) < 1 || files === null) return console.error("No files uploaded");
		reader.readAsText(files[0], 'UTF-8');
		reader.onload = (e) => {
			if (!e.target) return console.error("No target on onload event");
			const contents = e.target.result as string;
			const json = JSON.parse(contents);
			const entries = Object.entries(json);
			for (let [k, v] of entries) {
				console.debug([k, v]);
				localStorage.setItem(k, v as string);
			}
		};
	};
}

function downloadObjectAsJson(obj: object, filename: string) {
	var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj));
	var downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute('href', dataStr);
	downloadAnchorNode.setAttribute('download', filename + '.json');
	document.body.appendChild(downloadAnchorNode); // required for firefox
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
}
