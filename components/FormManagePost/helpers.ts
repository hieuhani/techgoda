import { browserFileTable } from "~/lib/browser-file-table";
import type { ImageBlockAttrs, PostBody } from "./types";
import { uploadMyFile } from "~/lib/publiz";
import { generateHTML } from "@tiptap/html";
import { extensions } from "../editor/extensions";
import type { JSONContent } from "@tiptap/vue-3";

export const getBlobContentImages = (images: ImageBlockAttrs["attrs"][]) => {
  return images.filter(
    (item) =>
      item.src.startsWith("blob:") && browserFileTable[item.src] !== undefined
  );
};

export const getInitialPostBody = (body: PostBody) => {
  return {
    title: body.title,
    tagIds: body.tagIds,
    content: "",
    status: "DRAFT" as const,
  };
};

export const buildFormFiles = (
  postId: string,
  images: ImageBlockAttrs["attrs"][]
) => {
  return images.reduce<Record<string, FormData>>((prev, current) => {
    const formData = new FormData();
    formData.append("file", browserFileTable[current.src]);
    formData.append("modelName", "post");
    formData.append("modelId", String(postId));

    formData.append(
      "metadata",
      JSON.stringify({
        blurHash: current.blurHash,
        size: current.fileSize,
      })
    );

    return {
      ...prev,
      [current.src]: formData,
    };
  }, {});
};

export const uploadFormFiles = async (formFiles: Record<string, FormData>) => {
  const uploadedFiles: Record<string, string> = {};

  for (const key in formFiles) {
    try {
      const { data: dataFile } = await uploadMyFile(formFiles[key]);
      if (!dataFile.fileUrl) {
        throw new Error("File upload failed");
      }
      uploadedFiles[key] = dataFile.fileUrl;
      URL.revokeObjectURL(key);
      delete browserFileTable[key];
    } catch (error) {
      console.error(error);
    }
  }
  return uploadedFiles;
};

export const replaceBlobContentImages = (
  body: PostBody,
  uploadedFiles: Record<string, string>
) => {
  return {
    ...body.content,
    content: body.content.content.map((item) => {
      if (item.type === "imageBlock") {
        const imageBlock = item as ImageBlockAttrs;
        if (uploadedFiles[imageBlock.attrs.src]) {
          return {
            ...imageBlock,
            attrs: {
              ...imageBlock.attrs,
              src: uploadedFiles[imageBlock.attrs.src],
            },
          };
        }
      }
      return item;
    }),
  };
};

export const replaceFeatureImage = (
  body: PostBody,
  uploadedFiles: Record<string, string>
) => {
  return body.featuredImage
    ? body.featuredImage.src.startsWith("blob:")
      ? {
          ...body.featuredImage,
          src: uploadedFiles[body.featuredImage.src],
        }
      : body.featuredImage
    : undefined;
};

export const buildPostBody = (
  body: PostBody,
  content: JSONContent,
  metaSchemaId: number,
  metadata: any
) => ({
  title: body.title,
  tagIds: body.tagIds,
  content: generateHTML(content, extensions),
  contentJson: content,
  status: "PUBLISHED" as const,
  metadata,
  metaSchemaId,
});
