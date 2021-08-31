import { useRef, useState } from "react";
import { FeedItemState } from "./type";

interface ModalProp {
  item: FeedItemState;
  onClose: () => void;
  onSave: (editItem: FeedItemState) => void;
}

const FeedEditModal = ({ item, onClose, onSave }: ModalProp) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [url, setUrl] = useState(item.dataUrl)

  const change = () => {
    if (inputRef.current?.files?.length) {
      const file = inputRef.current?.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const baseUrl = reader.result?.toString();
        setUrl(baseUrl);
      };
    };
  };

  const save = (dataUrl: string | undefined) => {
    const feed: FeedItemState = {
      id: item.id,
      content: textRef.current?.value,
      createTime: item.createTime,
      username: item.username,
      dataUrl: dataUrl

    };

    onSave(feed);
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => {
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
          <div className="modal-body" key={item.id}>
            {item.fileType &&
              (item.fileType?.includes("image") ? (
                <img
                  src={url}
                  className="card-img-top"
                  alt={item.content}
                />
              ) : (
                <video className="card-img-top" controls>
                  <source
                    src={url}
                    type={"Video/mp4"}></source>
                </video>
              ))}
            <textarea
              className="form-control mb-1"
              placeholder="Leave a post here"
              style={{ boxSizing: "border-box", height: "15vh" }}
              defaultValue={item.content}
              ref={textRef}
            />
            <input
              type="file"
              className="form-control me-1"
              accept="image/png, image/jpeg, video/mp4"
              onChange={(e) => {
                e.preventDefault();
                change();
              }}
              ref={inputRef}
            />
          </div>
          <div className="modal-footer">
            <button type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                onClose();
              }}
            >닫기</button>
            <button type="button"
              className="btn btn-primary"
              onClick={() => {
                save(url);
              }}
            >저장</button>
          </div>
        </div>
      </div>
    </div>
  )
};




export default FeedEditModal;