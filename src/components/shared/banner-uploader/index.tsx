"use client";

import { Loader2 } from "lucide-react";
import { useCallback, useRef, useState, useEffect } from "react";
import { TbPhoto, TbUpload, TbX, TbAspectRatio } from "react-icons/tb";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type AspectRatio = "square" | "video";

interface BannerUploaderProps {
  title: string;
  value?: string;
  className?: string;
  onChange: (value: string) => void;
  isUploading: boolean;
  setIsUploading: (loading: boolean) => void;
  aspectRatio?: AspectRatio;
  onAspectRatioChange?: (ratio: AspectRatio) => void;
}

export function BannerUploader({
  title,
  value,
  className,
  onChange,
  isUploading,
  setIsUploading,
  aspectRatio = "video",
  onAspectRatioChange,
}: BannerUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [internalAspectRatio, setInternalAspectRatio] = useState<AspectRatio>(aspectRatio);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync internal state with prop changes
  useEffect(() => {
    setInternalAspectRatio(aspectRatio);
  }, [aspectRatio]);

  const handleFileChange = (file: File) => {
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => setIsUploading(true);
    reader.onload = (e) => {
      onChange(e.target?.result as string);
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert("Error reading file");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileChange(e.dataTransfer.files[0]);
      }
    },
    [onChange]
  );

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleAspectRatioChange = (ratio: AspectRatio) => {
    setInternalAspectRatio(ratio);
    if (onAspectRatioChange) {
      onAspectRatioChange(ratio);
    }
  };

  return (
    <div className={`space-y-2 w-full ${className}`}>
      <div className="flex justify-between items-center">
        <Label>{title}</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              <TbAspectRatio className="h-4 w-4" />
              <span>
                {internalAspectRatio === "square" ? "Square" : "Wide"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleAspectRatioChange("video")}
            >
              Wide (16:9)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAspectRatioChange("square")}
            >
              Square (1:1)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        className={cn(
          "relative rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors",
          isDragging
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/30 hover:border-muted-foreground/50",
          value && "border-transparent",
          internalAspectRatio === "square" ? "aspect-square" : "aspect-video"
        )}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={handleClick}
      >
        {isUploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : value ? (
          <>
            <img
              src={value}
              alt="Uploaded banner"
              className={cn(
                "absolute inset-0 w-full h-full object-cover rounded-lg",
                internalAspectRatio === "square"
                  ? "object-center"
                  : "object-center"
              )}
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
              <TbUpload className="h-6 w-6 text-white" />
            </div>
          </>
        ) : (
          <>
            <TbPhoto className="h-8 w-8 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium">
                Drag & drop an image or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF. Max size 2MB
              </p>
            </div>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFileChange(e.target.files[0]);
            }
          }}
        />
      </div>
      {value && (
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onChange("");
          }}
        >
          <TbX className="mr-1" /> Remove banner
        </Button>
      )}
    </div>
  );
}