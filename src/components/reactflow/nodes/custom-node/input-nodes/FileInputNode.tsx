import React, { useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select"; // Select component imports
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { updateNodeInputValue } from "@/lib/update-node-value";
import { NodeInputProps } from "@/components/reactflow/interface";

const FileInputNode = ({
	input,
	nodeId,
}: {
	input: NodeInputProps;
	nodeId: string;
}) => {
	const { label, helperText, required, value, id } = input;
	const { getNode, updateNode } = useReactFlow(); // Functions to interact with ReactFlow
	const [fileType, setFileType] = useState<string>("image"); // State for the selected file type
	const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
		""
	); // State to store the file content
	const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false); // State for multi-select switch

	// Function to handle file type selection from the dropdown
	const handleFileTypeChange = (type: string) => {
		setFileType(type); // Update the selected file type
	};

	// Function to handle file input changes
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const files: FileList | null = event.target.files; // Access the uploaded file(s)

		if (files) {
			const fileArray = Array.from(files); // Convert FileList to an array
			const processedFiles: Array<{
				file: File;
				content: string | ArrayBuffer | null;
			}> = []; // Array to store processed files

			fileArray.forEach((file) => {
				const reader = new FileReader();

				// Callback when the file is successfully read
				reader.onload = (e) => {
					const fileContent = e.target?.result || ""; // Save the file content
					processedFiles.push({ file, content: fileContent }); // Add file and content to the processed files array

					// If all files are processed, update the node input value
					if (processedFiles.length === fileArray.length) {
						updateNodeInputValue(
							nodeId,
							id || "",
							{ files: processedFiles, fileType }, // Update with all files, type, and their content
							getNode,
							updateNode
						);
					}
				};

				// Determine how to read the file based on the selected type
				if (fileType === "text") {
					reader.readAsText(file); // Read as plain text
				} else if (fileType === "image") {
					reader.readAsDataURL(file); // Read as a Data URL for images
				} else if (fileType === "pdf") {
					reader.readAsArrayBuffer(file); // Read as ArrayBuffer for PDFs
				}
			});
		}
	};

	return (
		<>
			<div className={`w-full grid grid-cols-1 gap-1 relative`}>
				{/* Node connection handle */}
				<Handle
					type="target"
					id={id}
					position={Position.Left}
					className={cn(
						`!w-3 !h-3 absolute !-left-3.5 !bg-yellow-500`
					)}
				/>
				{/* Label for the input */}
				<Label className={`text-sm`}>
					{label}{" "}
					{required && <span className={`text-red-500`}>*</span>}
				</Label>
				{/* File upload input */}
				<Input
					type="file"
					className={`bg-accent h-full`}
					accept={
						fileType === "image"
							? "image/*"
							: fileType === "pdf"
							? "application/pdf"
							: fileType === "text"
							? "text/plain"
							: "*"
					}
					onChange={handleInputChange}
					multiple={isMultiSelect} // Allow multiple file selection if enabled
				/>
				{/* Helper text display */}
				{helperText && (
					<Label className={`text-xs pl-1 text-white/20`}>
						{helperText}
					</Label>
				)}
				<div
					className={`grid mt-1 grid-cols-[_1fr,120px] w-full gap-2 place-items-center place-content-center`}
				>
					{/* Dropdown for selecting the file type */}
					<Select
						value={fileType}
						onValueChange={handleFileTypeChange}
					>
						<SelectTrigger className={cn(`!text-xs`)}>
							<SelectValue
								className={cn(`!text-xs`)}
								placeholder="Select file type"
							/>
						</SelectTrigger>
						<SelectContent className={cn(`!text-xs`)}>
							<SelectItem
								className={cn(`!text-xs`)}
								value="image"
							>
								Image
							</SelectItem>
							<SelectItem className={cn(`!text-xs`)} value="pdf">
								PDF
							</SelectItem>
							<SelectItem className={cn(`!text-xs`)} value="text">
								Text File
							</SelectItem>
						</SelectContent>
					</Select>
					{/* Multi-select Switch */}
					<div className="flex items-center space-x-2">
						<Label className="text-xs">Multi-file</Label>
						<Switch
							checked={isMultiSelect}
							onCheckedChange={setIsMultiSelect}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default FileInputNode;
