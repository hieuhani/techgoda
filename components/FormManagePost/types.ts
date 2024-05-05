export type ContentTypeImageBlock = {
  type: "imageBlock";
  attrs: {
    src: string;
    width: number;
    height: number;
    blurHash: string;
    fileName: string;
    fileSize: string;
  };
};

export type ContentTypeParagraph = {
  type: "paragraph";
  attrs: {
    content: string;
  };
};

export type ContentTypeImage = {
  type: "image";
  attrs: {
    src: string;
    alt?: string;
    title?: string;
  };
};
export type Content =
  | ContentTypeParagraph
  | ContentTypeImageBlock
  | ContentTypeImage;

export type ContentDoc = {
  type: "doc";
  content: Content[];
};
export type ImageBlockAttrs = Extract<Content, { type: "imageBlock" }>;

export type PostBody = {
  title: string;
  content: ContentDoc;
  featuredImage: ImageBlockAttrs["attrs"] | null;
  tagIds: number[];
};
