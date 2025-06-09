import styled from 'styled-components';

import { useState, useEffect } from 'react';

import { ButtonBrown40 } from '../../../components/Button.jsx';

function AnswerForm(editMode, onEditChange, rejected, children, subjectInfo) {
  //editMode = 상위 컴포넌트에서 내려받는 editMode 여부 (true/false) 수정모드로 진입할지 여부를 결정.
  //onEditChange = 상위 컴포넌트에서 제어 할 목적으로 만든 set

  const [completeState, SetCompleteState] = useState(children);
  const [answerText, setAnswerText] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (editMode) {
      const handleAnswerEdit = async () => {
        try {
          const response = await axios.get(
            `https://openmind-api.vercel.app/16-6/answers/${children.id}/`,
          );
          setText(response.data.content);
          setAnswerText(response.data.content);
          textArray = response.data.content;
        } catch (err) {
          console.log(err);
        }
      };

      handleAnswerEdit();
    }
  }, [editMode]);

  const buttonEnabled = answerText.trim().length > 0;

  const handleAnswerChange = (e) => {
    setAnswerText(e.target.value); //입력값을 answerText 에 담는다.
    console.log(e.target.value); // 입력 확인
  };

  //작성 버튼 누르면 아래 실행.
  const handleSubmitAnswer = async () => {
    if (answerText.trim().length > 0) {
      const requestBody = {
        content: answerText,
        isRejected: false,
      };
      if (completeState == null) {
        try {
          const response = await axios.post(
            `https://openmind-api.vercel.app/16-6/questions/${questionID}/answers/`,
            requestBody,
          );
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          const response = await axios.put(
            `https://openmind-api.vercel.app/16-6/answers/${children.id}/`,
            requestBody,
          );
        } catch (err) {
          console.error(err);
        }
      }
      setAnswerText(''); // 제출 후 입력 필드 초기화
    }
  };

  return (
    <AnswerBoxWrapper>
      <AnswerBoxSubjectImage
        src={subjectInfo.imageSource}
        alt='답변자 프로필 사진'
      />
      <div>
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
      </div>
    </AnswerBoxWrapper>
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

const AnswerBoxWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const AnswerBoxSubjectImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 9999px;
`;
