import React from "react";

export interface NodgeGridCardProps<T> {
	data: T[];
	renderCard: (item: T) => React.ReactNode;
}

const NodgeGridCard = <T,>({ data, renderCard }: NodgeGridCardProps<T>) => {
	return (
		<div className="grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-4">
			{data.map((item, index) => (
				<React.Fragment key={index}>{renderCard(item)}</React.Fragment>
			))}
		</div>
	);
};

export default NodgeGridCard;
