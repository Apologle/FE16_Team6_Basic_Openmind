import styled from 'styled-components';

import { useState, useEffect } from 'react';

import { ButtonBrown40 } from '../../../components/Button.jsx';

function AnswerForm(editMode, onEditChange, rejected, children, subjectInfo) {
  const [completeState, SetCompleteState] = useState(children);
  const [answerText, setAnswerText] = useState('');
  const [text, setText] = useState('');

  const handleAnswerChange = (e) => {
    setAnswerText(e.target.value); //입력값을 answerText 에 담는다.
    console.log(e.target.value); // 입력 확인
  };

  return (
    <>
      <AnswerInput>
        <AnswerBoxUpperlineWrapper>
          <AnswerBoxSubjectname>{subjectInfo.name}</AnswerBoxSubjectname>
        </AnswerBoxUpperlineWrapper>
        <SubstantialInput
          onChange={handleAnswerChange}
          value={answerText}
          placeholder='답변을 입력해 주세요'
        ></SubstantialInput>
        <AnswerCompleteButton
          onClick={handleSubmitAnswer}
          disabled={!buttonEnabled}
        >
          답변 완료
        </AnswerCompleteButton>
      </AnswerInput>
    </>
  );
}

export default AnswerForm;

const AnswerInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const AnswerBoxUpperlineWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 8px;
  margin-bottom: 4px;
`;

const AnswerBoxSubjectname = styled.span`
  font-size: 18px;
  font-weight: 400;
`;

const SubstantialInput = styled.textarea`
  border: none;
  background-color: ${({ theme }) => theme.color.gray20};
  border-radius: 8px;
  flex-grow: 1;
  min-width: 0px;
  min-height: 186px;
  vertical-align: top;
  padding: 16px;
  resize: none;
  width: 100%;

  &:focus {
    outline: none;
    border-style: solid; /* 기본 아웃라인 제거 */
    border-color: ${({ theme }) => theme.color.brown40};
    border-width: 1px;
  }
`;

const AnswerCompleteButton = styled(ButtonBrown40)`
  justify-content: center;
  font-size: 16px;
`;
