interface FeedItemState {
  id: number;
  content?: string | undefined;
  memo?: string | undefined;
  dataUrl?: string | undefined;
  fileType?: string | undefined;
  username: string | undefined;
  createTime: number;
  modifyTime?: number;
  isEdit?: boolean;
}
export type { FeedItemState };