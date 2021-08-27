import { useRef, useState } from "react";
import { FeedState } from "./type";
// import { lorem, penguin, robot } from "../common/data";
// import { getTimeString } from "../common/lib/string";

interface ModalProp {
  item: FeedState;
  onClose: () => void;
  onSave: (editItem: FeedState) => void;
}

const FeedEditModal = ({ item, onClose, onSave }: ModalProp) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const save = () => {
    const feed: FeedState = {
      id: item.id,
      content: textRef.current?.value,

      createTime: item.createTime,
    };
    onSave(feed);
  }

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => {
        onClose();
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h5 className="modal-title">EDIT Feed</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                onClose();
              }}
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="file"
              className="form-control me-1"
              accept="image/png, image/jpeg, video/mp4"
              ref={fileRef}
            />
            <textarea
              className="form-control mb-1"
              defaultValue={item.content}
              ref={textRef}>
            </textarea>
            <img
              src={item.dataUrl}
              className="card-img-top"
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault()
                onClose();
              }}
            >
              닫기
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                save();
              }}
            >
              저장
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}



export default FeedEditModal;