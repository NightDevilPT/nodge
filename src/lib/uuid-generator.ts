export function generateUuid(nodeId:string): string {
	const uuid = nodeId+":"+crypto.randomUUID(); // Automatically generate a unique ID
	return uuid;
}
