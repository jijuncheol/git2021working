import { useRef, useState } from "react";
import produce from "immer";
import { FeedState } from "./type";

import FeedEditModal from "./FeedEditModal";
// import { lorem, penguin, robot } from "../common/data";
// import { getTimeString } from "../common/lib/string";

const getTimeString = (unixtime: number) => {
  // Locale: timezone, currency 등
  // js에서는 브라우저의 정보를 이용함
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const Feed = () => {
  console.log("--feedwithmodal--");
  const [feedList, setFeedList] = useState<FeedState[]>([]);

  const [isEdit, setIsEdit] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e) {
      if (e.code !== "Enter") return;
    }

    if (fileRef.current?.files?.length) {
      const file = fileRef.current?.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        post(reader.result?.toString(), file.type);
      };
    } else {
      post(undefined, undefined);
    }
  };

  const post = (dataUrl: string | undefined, fileType: string | undefined) => {
    const feed: FeedState = {
      id: feedList.length > 0 ? feedList[0].id + 1 : 1,

      content: textRef.current?.value,
      dataUrl: dataUrl,
      fileType: fileType,
      createTime: new Date().getTime(),
    };

    setFeedList(
      produce((state) => {
        state.unshift(feed);
      })
    );

    formRef.current?.reset();
  };

  const del = (id: number) => {
    setFeedList(feedList.filter((item) => item.id !== id));
  };

  const editItem = useRef<FeedState>({ id: 0, dataUrl: "", createTime: 0 });

  const edit = (item: FeedState) => {
    editItem.current = item
    setIsEdit(true);
  };

  const save = (editItem: FeedState) => {
    console.log(editItem);
    setFeedList(
      produce((state) => {
        const item = state.find((item) => item.id === editItem.id);
        if (item) {
          item.dataUrl = editItem.dataUrl

        }
      })
    );

    setIsEdit(false);
  };

  return (
    <>
      <h2 className="text-center my-5">Feeds</h2>
      {isEdit && (
        <FeedEditModal
          item={editItem.current}
          onClose={() => {
            setIsEdit(false);
          }}
          onSave={(editItem) => {
            save(editItem);
          }}
        />
      )}
      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        ref={formRef}
      >
        <textarea
          className="form-control mb-1"
          placeholder="Leave a post here"
          ref={textRef}
          style={{ boxSizing: "border-box", height: "15vh" }}
        ></textarea>
        <div className="d-flex">
          <input
            type="file"
            className="form-control me-1"
            accept="image/png, image/jpeg, video/mp4"
            ref={fileRef}
          />
          <button
            className="btn btn-primary text-nowrap"
            type="button"
            onClick={() => {
              add(null);
            }}
          >
            입력
          </button>
        </div>
      </form>
      <div className="mt-3">
        {feedList.map((item) => (
          <div className="card mt-1" key={item.id}>
            {item.fileType &&
              (item.fileType?.includes("image") ? (
                <img
                  src={item.dataUrl}
                  className="card-img-top"
                  alt={item.content}
                />
              ) : (
                <video className="card-img-top" controls src={item.dataUrl} />
              ))}
            <div className="card-body">
              <p className="card-text">{item.content}</p>
              <div className="d-flex">
                <div className="w-100">
                  <span className="text-secondary">
                    {getTimeString(
                      item.modifyTime ? item.modifyTime : item.createTime
                    )}
                  </span>
                </div>
                <a href="#!"
                  className="link-secondary fs-6 text-nowrap me-2"
                  onClick={(e) => {
                    e.preventDefault();
                    edit(item);
                  }}
                >
                  수정
                </a>
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault(); // 기본 동작 방지
                    del(item.id);
                  }}
                  className="link-secondary fs-6 text-nowrap"
                >
                  삭제
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;
