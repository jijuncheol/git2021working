import React, { useRef, useState } from "react";
import Alert from "./base/Alert";

import produce from "immer";

interface ContactState {
  id: number;
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  isEdit?: boolean;
}

const Contact = () => {

  const [contactList, setContactList] = useState<ContactState[]>([
  ]);
  const [isError, setIsError] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e) {
      if (e.code !== "Enter") return;
    }

    if (!nameRef.current?.value) {
      setIsError(true);
      return;
    }

    const contact: ContactState = {
      id: contactList.length > 0 ? contactList[0].id + 1 : 1,
      name: nameRef.current?.value,
      phone: phoneRef.current?.value,
      email: emailRef.current?.value,
    };
    setContactList(
      produce((state) => {
        state.unshift(contact);
      })
    );
    formRef.current?.reset();
    setIsError(false);
  };

  const del = (id: number, index: number) => {
    console.log(id);
    setContactList(
      produce((state) => {
        state.splice(index, 1);
      })
    );
  };

  const edit = (id: number, mod: boolean) => {
    setContactList(
      produce((state) => {
        const item = state.find((item) => item.id === id);
        if (item) {
          item.isEdit = mod;
        }
      })
    );
  };

  const save = (id: number, index: number) => {
    console.log(nameRef.current);

    const input = nameRef.current?.querySelectorAll("input")[index];


    setContactList(
      produce((state) => {
        const item = state.find((item) => item.id === id);
        if (item) {
          item.name = input?.value;
          item.phone = input?.value;
          item.email = input?.value;
          item.isEdit = false;
        }
      })
    );
  };


  return (
    <>
      <h2 className="text-center my-5">전화번호 관리</h2>
      <form
        className="d-flex"
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          id="txt-name"
          type="text"
          className="form-control me-2"
          placeholder="이름"
          ref={nameRef}
          onKeyPress={(e) => {
            add(e);
          }}
        />
        <input
          id="txt-phone"
          type="text"
          className="form-control me-2"
          placeholder="연락처"
          ref={phoneRef}
          onKeyPress={(e) => {
            add(e);
          }}
        />
        <input
          id="txt-email"
          type="text"
          className="form-control me-2"
          placeholder="이메일"
          ref={emailRef}
          onKeyPress={(e) => {
            add(e);
          }}
        />
        <button
          type="button"
          className="btn btn-primary text-nowrap"
          onClick={() => {
            add(null);
          }}
        >
          추가
        </button>
      </form>
      {isError && (
        <Alert
          message={"내용을 입력해주세요."}
          variant={"danger"}
          onClose={() => {
            setIsError(false);
          }}
        />
      )}
      <table className="table table-striped" ref={tableRef}>
        <thead>
          <th>이름</th>
          <th>전화번호</th>
          <th>이메일</th>
          <th>작업</th>
        </thead>
        {contactList.map((item, index) => (
          <tbody id="table-list" key={item.id}>
            {!item.isEdit && <td>{item.name}</td>}
            {!item.isEdit && <td>{item.phone}</td>}
            {!item.isEdit && <td>{item.email}</td>}
            {item.isEdit && (
              <input type="text" className="form-control me-2" defaultValue={item.name} />
            )}
            {item.isEdit && (
              <input type="text" className="form-control me-2" defaultValue={item.phone} />
            )}
            {item.isEdit && (
              <input type="text" className="form-control me-2" defaultValue={item.email} />
            )}
            {!item.isEdit && (
              <button
                className="btn btn-outline-secondary btn-sm text-nowrap"
                onClick={() => {
                  edit(item.id, true);
                }}
              >
                수정
              </button>
            )}
            {!item.isEdit && (
              <button
                className="btn btn-outline-secondary btn-sm text-nowrap"
                onClick={() => {
                  del(item.id, index);
                }}
              >
                삭제
              </button>
            )}
            {item.isEdit && (
              <button
                className="btn btn-outline-secondary btn-sm ms-2 me-1 text-nowrap"
                onClick={() => {
                  save(item.id, index);
                }}
              >
                저장
              </button>
            )}
            {item.isEdit && (
              <button
                className="btn btn-outline-secondary btn-sm text-nowrap"
                onClick={() => {
                  edit(item.id, false);
                }}
              >
                취소
              </button>
            )}
          </tbody>

        ))}
      </table>
    </>
  );

};

export default Contact;