import Axios from "axios";

const api = Axios.create({
    //여기에 localhost에 서버 주소 입력
  baseURL: "http://208.67.222.222:8080/kafka",
});

const chatAPI = {
  getMessages: (groupId) => {
    console.log("Calling get messages from API");
    return api.get(`/messages/${groupId}`);
  },

  sendMessage: (username, text) => {
    let msg = {
      author: username,
      content: text,
    };
    return api.post(`/publish`, msg, {
      headers: { "Content-Type": "application/json" },
    });
  },
};

export default chatAPI;