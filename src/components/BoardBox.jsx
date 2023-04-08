import React, { useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getBoardList } from "../api";
import { AuthContext } from "../context/authoContext";
import axios from "axios";

function BoardBox(props) {
  const BASE_PATH = "http://localhost:8080/api";

  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const page = location.pathname.split("/")[2];
  const list_num = location.pathname.split("/")[3];

  const { data, isLoading, isError } = useQuery(
    ["boardList", list_num],
    () => getBoardList(list_num),
    {
      keepPreviousData: true,
      staleTime: 0,
      refetchOnWindowFocus: false, //윈도우가 포커스를 가지면 새로고침
    }
  );

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_PATH}/board/${list_num}`);
      navigate("/board");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="board_box">
      <h3 className="title">게시판 - 내용보기</h3>

      {data &&
        data.map((board, index) => (
          <ul id="view_content" key={index}>
            <li>
              <span className="col1">
                <b>제목 :{board.subject}</b>
              </span>
              <span className="col2">
                {" "}
                {board.name} | {board.regist_day}{" "}
              </span>
            </li>
            <li>
              <span>{board.content}</span>
            </li>
          </ul>
        ))}

      <ul className="buttons">
        <li>
          <button>
            <Link to={`/boardlist/${page}`}>목록</Link>
          </button>
        </li>

        {currentUser ? (
          <>
            <li>
              <button>수정</button>
            </li>
            <li>
              <button onClick={handleDelete}>삭제</button>
            </li>
            <li>
              <button>글쓰기</button>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
}

export default BoardBox;
