/* really no idea what to call this file... */

export function last(arr: any[]) {
	return Array.isArray(arr) ? arr[arr.length - 1] : arr;
}
