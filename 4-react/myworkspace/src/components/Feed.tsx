import React, { useRef, useState } from "react";

import produce, { Immer } from "immer";


interface FeedState {
  id: number;
  content?: string | undefined;
  dataUrl?: string | undefined;
  fileType?: string | undefined;
  createTime: number;
}

const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
}

const Feed = () => {
  const [feedList, setFeedList] = useState<FeedState[]>([
  ]);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);


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
  }



  const del = (id: number) => {
    setFeedList(feedList.filter((item) => item.id !== id));
  }

  return (
    <>
      <h2 className="text-conter my-5">Feed</h2>
      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        ref={formRef}
      >
        <textarea
          style={{ boxSizing: "border-box", height: "15vh" }}
          className="form-control mb-1 w-100"
          placeholder="Leave a post here"
          ref={textRef}
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
      <div className="card mt-1">
        {feedList.map(item => (
          <div className="card-body">
            <img src={item.dataUrl} className="card-img-top" alt="..."></img>
            <p className="card-text">{item.content}</p>
            <span>
              - {getTimeString(item.createTime)}
            </span>
            <a href="#"
              className="link-secondary fs-6 float-end"
              onClick={() => {
                del(item.id);
              }}
            >
              삭제
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;