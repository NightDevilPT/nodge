import NodgeCards from "@/components/shared/node-card";
import { DummCardData, NodeCardProps } from "@/interface/card.interface";

export default function Home() {
	return (
		<main
			className={`w-full h-full overflow-auto flex justify-start items-start flex-col gap-2 p-3`}
		>
			<div className={`w-full h-auto grid grid-cols-4 gap-3`}>
				{DummCardData?.map((card: NodeCardProps, index: number) => {
					return (
						<NodgeCards {...card} key={card.title + "-" + index} />
					);
				})}
			</div>
		</main>
	);
}
