import axiosService from "./axios.service";

const messageService = {
    getMessages: () => axiosService.get("/messages"),
    randomAnswer: () => axiosService.get("/messages/random"),
    sendMessage: (message) => axiosService.post("/messages", message),
};

export default messageService;