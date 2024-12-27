export default function isAborted(error: unknown) {
	return (
		error &&
		typeof error === 'object' &&
		'name' in error &&
		(error.name === 'AbortError' ||
			(error as Error).message.includes('aborted'))
	);
}
