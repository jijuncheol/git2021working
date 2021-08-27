interface FeedState {
  id: number;
  content?: string | undefined;
  dataUrl?: string | undefined;
  fileType?: string | undefined;
  createTime: number;
  modifyTime?: number;
  isEdit?: boolean;
}
export type { FeedState };
