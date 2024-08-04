import axiosService from "./axios.service";

const messageService = {
    getMessages: () => axiosService.get("/messages"),
    sendMessage: (message) => axiosService.post("/messages", message),
};

export default messageService;