import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const QUESTION_LIMIT = 3;

export async function getSubjects(queryStrings) {
  const { limit, offset = 0, sort = 'time' } = queryStrings;
  try {
    const res = await axios.get(
      `${BASE_URL}/subjects/?limit=${limit}&offset=${offset}&sort=${sort}`,
    );
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
}

export const additionalFetch = (url, setQuestion) => {
  axios.get(url).then((res) => {
    setQuestion((prev) => [...prev, ...res.data.results]);
  });
};

export const deletePage = async (id) => {
  let redirect = true;
  try {
    await axios.delete(`${BASE_URL}/subjects/${id}/`);
    localStorage.removeItem('userData');
    redirect = true;
    alert('삭제가 성공적으로 완료하였습니다.');
  } catch (err) {
    console.error(err);
    alert('삭제에 실패하였습니다.');
    redirect = false;
  }
  return redirect;
};

export const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/subjects/${userId}/`);
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const fetchPost = async (userId, offset = 0, limit = QUESTION_LIMIT) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/subjects/${userId}/questions/?limit=${limit}&offset=${offset}`,
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const createQuestion = async (userId, questionText) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/subjects/${userId}/questions/`,
      {
        content: questionText,
      },
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/questions/${questionId}/`);
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const createAnswer = async (
  questionId,
  answerText,
  isRejected = false,
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/questions/${questionId}/answers/`,
      {
        content: answerText,
        isRejected: isRejected,
      },
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const updateAnswer = async (
  answerId,
  answerText,
  isRejected = false,
) => {
  try {
    const response = await axios.put(`${BASE_URL}/answers/${answerId}/`, {
      content: answerText,
      isRejected: isRejected,
    });
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};
