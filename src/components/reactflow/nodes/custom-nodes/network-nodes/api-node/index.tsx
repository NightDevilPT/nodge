import React, { useState } from "react";
import { TbTrash } from "react-icons/tb";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import BaseNode from "../../../base-node";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppNode, NodeApiMethodsEnum } from "@/components/reactflow/interface";

// Type Definitions
interface KeyValuePair {
	key: string;
	value: string;
}

interface DynamicField {
	label: string;
	type: "text" | "file" | "number";
	value: string;
}

export const ApiNode = ({ data, id }: AppNode) => {
	if (!data.apiData) return null;

	const { header, apiData } = data;

	// State Definitions
	const [url, setUrl] = useState(apiData.url);
	const [method, setMethod] = useState(apiData.method);
	const [headers, setHeaders] = useState<KeyValuePair[]>(
		apiData.headers?.length
			? apiData.headers
			: [{ key: "Content-Type", value: "application/json" }]
	);
	const [query, setQuery] = useState<KeyValuePair[]>(
		apiData.query?.length ? apiData.query : [{ key: "", value: "" }]
	);
	const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([
		{ label: "", type: "text", value: "" },
	]);

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
	const renderInputField = (field: DynamicField, index: number) => {
		const inputProps = {
			value: field.value,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
				updateStateArray(
					setDynamicFields,
					index,
					"value",
					e.target.value
				),
			placeholder: `Enter ${field.type}`,
		};

		return field.type === "file" ? (
			<Input
				type="file"
				onChange={(e) =>
					updateStateArray(
						setDynamicFields,
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
				<div className="grid gap-2">
					<Label>Headers</Label>
					{headers.map((header, index) => (
						<div
							key={index}
							className="grid grid-cols-[1fr,1fr,40px] gap-2"
						>
							<Input
								type="text"
								placeholder="Key"
								value={header.key}
								onChange={(e) =>
									updateStateArray(
										setHeaders,
										index,
										"key",
										e.target.value
									)
								}
							/>
							<Input
								type="text"
								placeholder="Value"
								value={header.value}
								onChange={(e) =>
									updateStateArray(
										setHeaders,
										index,
										"value",
										e.target.value
									)
								}
							/>
							<Button
								className="bg-red-500 text-white"
								onClick={() => removeItem(setHeaders, index)}
							>
								<TbTrash />
							</Button>
						</div>
					))}
					<Button
						variant="secondary"
						onClick={() =>
							setHeaders([...headers, { key: "", value: "" }])
						}
					>
						Add Header
					</Button>
				</div>

				{/* Query Params Section */}
				<div className="grid gap-2">
					<Label>Query Params</Label>
					{query.map((param, index) => (
						<div
							key={index}
							className="grid grid-cols-[1fr,1fr,40px] gap-2"
						>
							<Input
								type="text"
								placeholder="Key"
								value={param.key}
								onChange={(e) =>
									updateStateArray(
										setQuery,
										index,
										"key",
										e.target.value
									)
								}
							/>
							<Input
								type="text"
								placeholder="Value"
								value={param.value}
								onChange={(e) =>
									updateStateArray(
										setQuery,
										index,
										"value",
										e.target.value
									)
								}
							/>
							<Button
								className="bg-red-500 text-white"
								onClick={() => removeItem(setQuery, index)}
							>
								<TbTrash />
							</Button>
						</div>
					))}
					<Button
						variant="secondary"
						onClick={() =>
							setQuery([...query, { key: "", value: "" }])
						}
					>
						Add Query Param
					</Button>
				</div>

				{/* Dynamic Fields Section */}
				<div className="grid gap-2">
					<Label>Dynamic Fields</Label>
					{dynamicFields.map((field, index) => (
						<div
							key={index}
							className="grid grid-cols-[150px,100px,1fr,40px] gap-2"
						>
							<Input
								type="text"
								placeholder="Field Label"
								value={field.label}
								onChange={(e) =>
									updateStateArray(
										setDynamicFields,
										index,
										"label",
										e.target.value
									)
								}
							/>
							<Select
								value={field.type}
								onValueChange={(value) =>
									updateStateArray(
										setDynamicFields,
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
								onClick={() =>
									removeItem(setDynamicFields, index)
								}
							>
								<TbTrash />
							</Button>
						</div>
					))}
					<Button
						variant="secondary"
						onClick={() =>
							setDynamicFields([
								...dynamicFields,
								{ label: "", type: "text", value: "" },
							])
						}
					>
						Add Dynamic Field
					</Button>
				</div>
			</div>
		</BaseNode>
	);
};
