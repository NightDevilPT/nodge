export function generateUuid(): string {
	const uuid = crypto.randomUUID(); // Automatically generate a unique ID
	return uuid;
}
