import React, { useState } from "react";
import { useReactFlow } from "@xyflow/react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AppNode, InputProps } from "@/components/reactflow/interface";
import { NodgeHandle, NodgeType } from "@/components/shared/nodge-handle";

enum FileTypeEnum {
	// JSON & Text Files
	JSON = "application/json",
	TXT = "text/plain",
	CSV = "text/csv",

	// Image Files
	BMP = "image/bmp",
	GIF = "image/gif",
	JPG = "image/jpg",
	JPEG = "image/jpeg",
	PDF = "application/pdf",
	PNG = "image/png",
	WEBP = "image/webp",
	TIFF = "image/tiff",

	// HTML Files
	HTML = "text/html",
	HTM = "text/htm",
}

const FileInput = ({ nodeId, input }: InputProps) => {
	const { placeholder } = input;
	const [fileType, setFileType] = useState<FileTypeEnum>(FileTypeEnum.JPEG);
	const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
	const [isMulti, setIsMulti] = useState<boolean>(false);
	const { getNode } = useReactFlow();
	const currentNode = getNode(nodeId) as AppNode | undefined;
	if (!currentNode) return null;

	return (
		<div className="w-full h-auto flex justify-start items-start flex-col gap-2 relative">
			{/* <Label>{label}</Label> */}
			{/* File Type Selector */}
			<div className="w-full grid grid-cols-2 gap-3">
				<Select
					onValueChange={(value) => {
						console.log(value, " value");
						setFileType(value as FileTypeEnum);
					}}
					defaultValue={fileType}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select file type" />
					</SelectTrigger>
					<SelectContent>
						{Object.entries(FileTypeEnum).map(([key, value]) => {
							return (
								<SelectItem key={key} value={value}>
									{key}
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>

				{/* Toggle for multiple file selection */}
				<div className="flex items-center gap-2">
					<Label>Multiple Files</Label>
					<Switch checked={isMulti} onCheckedChange={setIsMulti} />
				</div>

				<Input
					className="col-span-2"
					type={"file"}
					accept={fileType}
					defaultValue={input.value as string}
					multiple={isMulti}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						if (event.target.files?.length) {
							setSelectedDocs(Array.from(event.target.files));
						}
					}}
					placeholder={placeholder}
				/>
			</div>
			{input.isShowSource && (
				<NodgeHandle
					nodeId={nodeId}
					isConnectable
					type={NodgeType.source}
				/>
			)}
		</div>
	);
};

export default FileInput;
