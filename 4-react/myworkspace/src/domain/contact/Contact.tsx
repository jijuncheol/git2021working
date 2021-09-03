import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store";

const getTimeString = (unixtime: number) => {
  const day = 24 * 60 * 60 * 1000;
  const dateTime = new Date(unixtime);
  return unixtime - new Date().getTime() >= day
    ? dateTime.toLocaleDateString()
    : dateTime.toLocaleTimeString();
};

const Contact = () => {
  const contact = useSelector((state: RootState) => state.contact)
  const history = useHistory();

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Contact</h2>
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-primary"
          onClick={() => {
            history.push("/contacts/create");
          }}
        >
          <i className="bi bi-plus" />
          추가
        </button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">이름</th>
            <th scope="col">전화번호</th>
            <th scope="col">이메일</th>
            <th scope="col">작업</th>
            <th scope="col">작성일시</th>
          </tr>
        </thead>
        <tbody>
          {contact.data.map((item, index) => (
            <tr>
              <th scope="row">{contact.data.length - index}</th>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{getTimeString(item.createdTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contact;