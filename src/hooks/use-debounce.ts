import { useRef, useEffect } from "react";

export function useDebounce<T extends (...args: any[]) => void>(
	callback: T,
	delay: number
) {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const debouncedFunction = (...args: Parameters<T>) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			callback(...args);
		}, delay);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return debouncedFunction;
}
