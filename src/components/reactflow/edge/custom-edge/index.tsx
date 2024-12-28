import React from "react";
import {
	BaseEdge,
	EdgeLabelRenderer,
	getSmoothStepPath, // Use smooth step path utility
	useReactFlow,
	type EdgeProps,
} from "@xyflow/react";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";

export default function DeletableEdge(props: EdgeProps) {
	const { setEdges,getEdge } = useReactFlow();
	const [edgePath, labelX, labelY] = getSmoothStepPath(props);

	return (
		<>
			<BaseEdge
				path={edgePath}
				markerEnd={props.markerEnd}
				style={props.style}
			/>
			<EdgeLabelRenderer>
				<div
					style={{
						position: "absolute",
						pointerEvents: "all",
						transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
					}}
				>
					<Button
						variant={"outline"}
						onClick={(e) => {
							console.log(getEdge(props.id),'EDGE DATA')
							setEdges((edges) =>
								edges.filter((edge) => edge.id !== props.id)
							);
						}}
						size={"icon"}
					>
						<IoClose className={`w-full h-full`} />
					</Button>
				</div>
			</EdgeLabelRenderer>
		</>
	);
}
