import styled from 'styled-components';
import { useState, useEffect } from 'react';

import axios from 'axios';

import { ButtonBrown40 } from '../../../components/Button.jsx';

import { relativeTimeCalculator } from '../../../functions/relativeTimeCalculator.js';

function AnswerForm({
  subjectInfo,
  children,
  questionID,
  editMode,
  onEditChange,
  rejected,
}) {
  //editMode = 상위 컴포넌트에서 내려받는 editMode 여부 (true/false) 수정모드로 진입할지 여부를 결정.
  //onEditChange = 상위 컴포넌트에서 제어 할 목적으로 만든 set
  //const time = relativeTimeCalculator(children.createdAt);
  console.log(`children : ${children} rejected : ${rejected}`);
  const [completeState, SetCompleteState] = useState(children);
  const [answerText, setAnswerText] = useState('');
  const [text, setText] = useState('');
  let textArray;

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

  if (
    completeState == null ||
    (children.content == '(empty)' && rejected == false)
  ) {
    const buttonEnabled = answerText.trim().length > 0; // trim 을 통해 앞 뒤 공백 제거 후 길이가 0보다 크면 true .

    const handleAnswerChange = (e) => {
      setAnswerText(e.target.value); //입력값을 answerText 에 담는다.
      console.log(e.target.value); // 입력 확인
    };

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
        <AnswerInput>
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
      </AnswerBoxWrapper>
    );
  }

  if (editMode) {
    const buttonEnabled = text !== answerText;

    const handleAnswerChange = (e) => {
      setAnswerText(e.target.value); //입력값을 answerText 에 담는다.
      console.log(e.target.value); // 입력 확인
    };

    const handleSubmitEdit = async () => {
      if (answerText.trim().length > 0) {
        const requestBody = {
          content: answerText,
          isRejected: false,
        };
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
      onEditChange(false);
    };

    return (
      <AnswerBoxWrapper>
        <AnswerInput>
          <SubstantialInput
            onChange={handleAnswerChange}
            value={answerText}
          ></SubstantialInput>
          <AnswerCompleteButton
            onClick={handleSubmitEdit}
            disabled={!buttonEnabled}
          >
            수정 완료
          </AnswerCompleteButton>
        </AnswerInput>
      </AnswerBoxWrapper>
    );
  }

  return (
    <AnswerBoxWrapper>
      <div>
        <AnswerBoxUpperlineWrapper>
          <AnswerBoxCreatedAt>
            {completeState ? (
              relativeTimeCalculator(children.createdAt)
            ) : (
              <div></div>
            )}
          </AnswerBoxCreatedAt>
        </AnswerBoxUpperlineWrapper>
        {rejected ? (
          <AnswerBoxText isRejected={rejected}>답변 거절</AnswerBoxText>
        ) : (
          completeState && <AnswerBoxText>{children.content}</AnswerBoxText>
        )}
      </div>
    </AnswerBoxWrapper>
  );
}

export default AnswerForm;

const AnswerBoxWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const AnswerBoxCreatedAt = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.gray40};
`;

const AnswerBoxUpperlineWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 8px;
  margin-bottom: 4px;
`;

const AnswerBoxText = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'isRejected',
})`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.isRejected && props.theme.color.red50};
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

const AnswerInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;
