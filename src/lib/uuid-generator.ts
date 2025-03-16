import { NodeTypesEnum } from "@/components/reactflow/interface";
import { NodgeType } from "@/components/shared/nodge-handle";

export function generateUuid(nodeId:string,handleType:NodgeType): string {
	const uuid = nodeId+":"+crypto.randomUUID(); // Automatically generate a unique ID
	return uuid;
}
