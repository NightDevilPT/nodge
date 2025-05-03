import React from "react";

export interface NodgeGridCardProps<T> {
	data: T[];
	className?:string;
	renderCard: (item: T) => React.ReactNode;
}

const NodgeGridCardLayout = <T,>({ data, renderCard, className }: NodgeGridCardProps<T>) => {
	return (
		<div className={`${className}`}>
			{data.map((item, index) => (
				<React.Fragment key={index}>{renderCard(item)}</React.Fragment>
			))}
		</div>
	);
};

export default NodgeGridCardLayout;
