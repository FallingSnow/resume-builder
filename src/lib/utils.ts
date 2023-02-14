export function debounce(func: Function, timeout = 300) {
	let timer: NodeJS.Timeout | undefined;
	return (...args: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, timeout);
	};
}

export function throttle(func: Function, delay = 300) {
	let timer: NodeJS.Timeout | undefined;
	return (...args: any) => {
		if (timer) return;
		timer = setTimeout(() => {
			timer = undefined;
			func(...args);
		}, delay);
	};
}
