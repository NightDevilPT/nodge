import React, { useCallback, useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ApiBody,
	ApiQueryHeader,
	AppNode,
	NodeApiMethodsEnum,
} from "@/components/reactflow/interface";
import BaseNode from "../../../base-node";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateNodeData } from "@/hooks/update-node-data";

interface KeyValueFieldProps {
	items: ApiQueryHeader[];
	setItems: React.Dispatch<React.SetStateAction<ApiQueryHeader[]>>;
	title: string;
}

const KeyValueField: React.FC<KeyValueFieldProps> = ({
	items,
	setItems,
	title,
}) => {
	const updateItem = useCallback(
		(index: number, key: keyof ApiQueryHeader, value: string) => {
			setItems((prev) =>
				prev.map((item, i) =>
					i === index ? { ...item, [key]: value } : item
				)
			);
		},
		[setItems]
	);

	const removeItem = (index: number) => {
		setItems((prev) => prev.filter((_, i) => i !== index));
	};

	return (
		<div className="grid gap-2">
			<Label>{title}</Label>
			{items.map((item, index) => (
				<div
					key={index}
					className="grid grid-cols-[1fr,1fr,40px] gap-2"
				>
					<Input
						type="text"
						placeholder="Key"
						value={item.key}
						onChange={(e) =>
							updateItem(index, "key", e.target.value)
						}
					/>
					<Input
						type="text"
						placeholder="Value"
						value={item.value}
						onChange={(e) =>
							updateItem(index, "value", e.target.value)
						}
					/>
					<Button
						className="bg-red-500 text-white"
						onClick={() => removeItem(index)}
					>
						<TbTrash />
					</Button>
				</div>
			))}
			<Button
				variant="secondary"
				onClick={() => setItems([...items, { key: "", value: "" }])}
			>
				Add {title}
			</Button>
		</div>
	);
};

export const ApiNode = ({ data, id }: AppNode) => {
	const { header, apiData } = data;
	const [url, setUrl] = useState<string>("");
	const [method, setMethod] = useState<NodeApiMethodsEnum>(
		NodeApiMethodsEnum.GET
	);
	const [headers, setHeaders] = useState<ApiQueryHeader[]>([
		{ key: "Content-Type", value: "application/json" },
	]);
	const [query, setQuery] = useState<ApiQueryHeader[]>([
		{ key: "", value: "" },
	]);
	const [body, setBody] = useState<ApiBody[]>([
		{ key: "", type: "text", value: "" },
	]);

	const updateNodeData = useUpdateNodeData();

	// Generic Update Handlers
	const updateStateArray = <T,>(
		setter: React.Dispatch<React.SetStateAction<T[]>>,
		index: number,
		key: keyof T,
		value: any
	) => {
		setter((prev) =>
			prev.map((item, i) =>
				i === index ? { ...item, [key]: value } : item
			)
		);
	};

	const removeItem = <T,>(
		setter: React.Dispatch<React.SetStateAction<T[]>>,
		index: number
	) => {
		setter((prev) => prev.filter((_, i) => i !== index));
	};

	// UI Render Functions
	const renderInputField = (field: ApiBody, index: number) => {
		const inputProps = {
			value: field.value,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
				updateStateArray(setBody, index, "value", e.target.value),
			placeholder: `Enter ${field.type}`,
		};

		return field.type === "file" ? (
			<Input
				type="file"
				onChange={(e) =>
					updateStateArray(
						setBody,
						index,
						"value",
						e.target.files?.[0] || ""
					)
				}
			/>
		) : (
			<Input {...inputProps} type={field.type} />
		);
	};

	// Ensure `useEffect` is at the top level
	useEffect(() => {
		updateNodeData(id, { apiData: { url, method, headers, query, body } });
	}, [id, url, method, headers, query, body, updateNodeData]);

	// Now handle conditional UI
	if (!apiData) {
		return (
			<BaseNode
				header={header}
				nodeId={id}
				className="min-w-[500px] max-w-[700px]"
			>
				<div>No API Data Available</div>
			</BaseNode>
		);
	}

	return (
		<BaseNode
			header={header}
			nodeId={id}
			className="min-w-[500px] max-w-[700px]"
		>
			<div className="grid gap-3">
				{/* API URL Input */}
				<div className="grid gap-2">
					<Label>URL</Label>
					<Input
						type="text"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>
				</div>

				{/* API Method Selection */}
				<div className="grid gap-2">
					<Label>Method</Label>
					<Select
						value={method}
						onValueChange={(value) =>
							setMethod(value as NodeApiMethodsEnum)
						}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select a method" />
						</SelectTrigger>
						<SelectContent>
							{Object.values(NodeApiMethodsEnum).map((method) => (
								<SelectItem key={method} value={method}>
									{method}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Headers Section */}
				<KeyValueField
					items={headers}
					setItems={setHeaders}
					title="Headers"
				/>

				{/* Query Params Section */}
				<KeyValueField
					items={query}
					setItems={setQuery}
					title="Query Params"
				/>

				{/* Body Section */}
				<div className="grid gap-2">
					<Label>Body</Label>
					{body.map((field, index) => (
						<div
							key={index}
							className="grid grid-cols-[150px,100px,1fr,40px] gap-2"
						>
							<Input
								type="text"
								placeholder="Key"
								value={field.key}
								onChange={(e) =>
									updateStateArray(
										setBody,
										index,
										"key",
										e.target.value
									)
								}
							/>
							<Select
								value={field.type}
								onValueChange={(value) =>
									updateStateArray(
										setBody,
										index,
										"type",
										value
									)
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="text">Text</SelectItem>
									<SelectItem value="number">
										Number
									</SelectItem>
									<SelectItem value="file">File</SelectItem>
								</SelectContent>
							</Select>
							{renderInputField(field, index)}
							<Button
								className="bg-red-500 text-white"
								onClick={() => removeItem(setBody, index)}
							>
								<TbTrash />
							</Button>
						</div>
					))}
					<Button
						variant="secondary"
						onClick={() =>
							setBody([
								...body,
								{ key: "", type: "text", value: "" },
							])
						}
					>
						Add Body Field
					</Button>
				</div>
			</div>
		</BaseNode>
	);
};
