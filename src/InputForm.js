import { useState } from "react";
import Dummy from "./Dummy.js";
import "./InputForm.css";

console.log(Dummy);
function InputForm() {
  const [keyword, setKeyword] = useState(""); // 입력 값 스테이트
  const [suggestions, setSuggestions] = useState([]); // 제안 (밑에 나오는 suggestion) 스테이트
  //const [selectIndex, setSelectIndex] = useState(-1); //미완

  const handleInputChange = (e) => {
    // 입력 이 되었을때 실행 되는 함수
    const value = e.target.value;
    setKeyword(value);
    //setHighlightedIndex(-1); //****미완

    if (value.trim() === "") {
      // 값이 없음에도 추천 목록이 계속 남아있는 것을 방지
      setSuggestions([]);
      return;
    }

    const filter = Dummy.filter((keywords) =>
      keywords.description.toLowerCase().includes(value.toLowerCase())
    ); //더미 들고 온 값을 대소문자 구분 하지 않고 필터
    setSuggestions(filter.map((keywords) => keywords.description)); //필터 값 추출
  };

  //추천 단어 클릭 핸들러
  const handleSelectSuggestion = (selectedSuggestion) => {
    setKeyword(selectedSuggestion);
    setSuggestions([]);
    console.log(selectedSuggestion); //console check
    //setHighlightedIndex(-1); //****미완
  };

  /* give up ===<R.I.P.>===
  const highlight = (text, match) => {
    if (!match) {
      return text;
    }
    const lowerText = text.toLowerCase(); // 소문자 변환
    const lowerMatch = match.toLowerCase();
    strongText = []
    let lastIndex = 0;

    let index = lowerText.indexOf(lowerMatch, lastIndex); // 찾고자 하는 문자열 첫부분 탐색
    while(index!==-1){
    strongText.push(text.substring(lastIndex, index)) //"문자열".substring(startIndex, endIndex); 로 시작 부분과 종료 부분을 지정하여 자름
    strongText.push(<strong key={index}>{text.substring(index, index+match.length)}</strong>)
    //미완
    }
  };
  */

  //미완 ( 키보드 입력 )
  /*
  const handlePresstheButton = (e) => {
    if (suggestions.length === 0) {
      //추천 목록 없으면 처리 x
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        setSelectIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
        );
        break;

      case "ArrowUp":
        setSelectIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
        );
        break;
      default:
        break;
    }
  };
  */
  return (
    <form className="input-style">
      <input
        placeholder="검색어 입력"
        value={keyword}
        onChange={handleInputChange}
        // onKeyDown={handlePresstheButton}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggest, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(suggest)}
              className="suggestion-item"
            >
              {suggest}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default InputForm;
