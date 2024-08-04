import axiosService from "./axios.service";

const chatService = {
    getChats: () => axiosService.get("/chats"),
    createChat: (chat) => axiosService.post("/chats", chat),
    deleteChat: (chatId) => axiosService.delete(`/chats/${chatId}`),
};

export default chatService;