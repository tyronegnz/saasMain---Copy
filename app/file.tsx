"use client";

import { EdgeStoreProvider } from "./lib/edgestore";
import { SingleImageDropzone } from "./components/single-image-dropzone";
import { useEdgeStore } from "./lib/edgestore";
import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <EdgeStoreProvider>
      <UploadFile />
      <UploadPage />
    </EdgeStoreProvider>
  );
}

function UploadFile() {
    const [file, setFile] = useState<File>();
    const [progress, setProgress] = useState(0);
    const [urls, setUrls] = useState<{
      url: string;
      thumbnailUrl: string | null;
    }>();
    const { edgestore } = useEdgeStore();
  
    return (
      <div className="flex flex-col gap-y-5">
        <CardHeader>
          <CardTitle>Upload an Image</CardTitle>
          <CardDescription>Here you can upload an Image</CardDescription>
        </CardHeader>
        <div className="flex flex-col items-center m-6 gap-2 ">
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 1, // 1MB
            }}
            onChange={(file) => {
              setFile(file);
            }}
          />
          <div className="h-[6px] w-44 border rounded overflow-hidden bg-primary">
            <div
              className="h-full bg-white transition-all duration-150"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
          <button
            className="bg-white text-black rounded px-2 hover:opacity-80"
            onClick={async () => {
              if (file) {
                const res = await edgestore.myPublicImages.upload({
                  file,
                  input: { type: "post" },
                  onProgressChange: (progress) => {
                    setProgress(progress);
                  },
                });
                setUrls({
                  url: res.url,
                  thumbnailUrl: res.thumbnailUrl,
                });
              }
            }}
          >
            Upload
          </button>
          {urls?.url && (
            <Link href={urls.url} target="_blank">
              URL
            </Link>
          )}
          {urls?.thumbnailUrl && (
            <Link href={urls.thumbnailUrl} target="_blank">
              THUMBNAIL
            </Link>
          )}
        </div>
      </div>
  
          
    );
  }


  function UploadPage() {
    const [file, setFile] = useState<File>();
    const [progress, setProgress] = useState(0);
    const [urls, setUrls] = useState<{
      url: string;
      thumbnailUrl: string | null;
    }>();
    const { edgestore } = useEdgeStore();
  
    return (
      <div className="flex flex-col gap-y-5">
        <CardHeader>
          <CardTitle>Upload a File</CardTitle>
          <CardDescription>Here you can upload a file</CardDescription>
        </CardHeader>
        <div className="flex flex-col items-center m-6 gap-2 ">
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 1, // 1MB
            }}
            onChange={(file) => {
              setFile(file);
            }}
          />
          <div className="h-[6px] w-44 border rounded overflow-hidden bg-primary">
            <div
              className="h-full bg-white transition-all duration-150"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
          <button
            className="bg-white text-black rounded px-2 hover:opacity-80"
            onClick={async () => {
              if (file) {
                const res = await edgestore.myPublicImages.upload({
                  file,
                  input: { type: "post" },
                  onProgressChange: (progress) => {
                    setProgress(progress);
                  },
                });
                setUrls({
                  url: res.url,
                  thumbnailUrl: res.thumbnailUrl,
                });
              }
            }}
          >
            Upload
          </button>
          {urls?.url && (
            <Link href={urls.url} target="_blank">
              URL
            </Link>
          )}
          {urls?.thumbnailUrl && (
            <Link href={urls.thumbnailUrl} target="_blank">
              THUMBNAIL
            </Link>
          )}
        </div>
      </div>
  
          
    );
  }