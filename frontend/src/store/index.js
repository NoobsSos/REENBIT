import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat: null,
    chats: [
        { id: 1, name: 'Chat with Alice' },
        { id: 2, name: 'Chat with Bob' },
        { id: 3, name: 'Chat with Charlie' },
        { id: 4, name: 'Chat with Dave' },
        { id: 5, name: 'Chat with Eve' }
    ],
    user: null,
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        selectChat: (state, action) => {
            state.selectedChat = action.payload.selectedChat;
        },
        deselectChat: (state) => {
            state.selectedChat = null;
        },
        addChat: (state, action) => {
            if (action.payload && action.payload.chat) {
                state.chats.push(action.payload.chat);
            }
        },
        deleteChat: (state, action) => {
            if (action.payload && action.payload.chat) {
                console.log("Deleting chat with id:", action.payload.chat.id);
                state.chats = state.chats.filter((chat) => chat.id !== action.payload.chat.id);
            } else {
                console.error("Invalid action payload:", action.payload);
            }
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        logOut: (state) => {
            state.user = null;
            state.selectedChat = null;
            state.chats = [];
        },
    },
});

export const { selectChat, addChat, deselectChat, deleteChat, setUser, logOut } = chatSlice.actions;

export default chatSlice.reducer;