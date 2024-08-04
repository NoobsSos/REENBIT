import React, { useEffect, useState } from 'react'
import axios from 'axios';

import styles from "./Chat.module.css";
import profile_pic from "../../assets/profile_pic.jpg" 

import Messages from '../Messages/Messages';

import messageService from '../../services/message.service';
import chatService from '../../services/chat.service';

import { useSelector, useDispatch } from 'react-redux';
import { selectChat } from '../../store/index.js';

const Chat = () => {

    const dispatch = useDispatch();

    const selectedChat = useSelector((state) => state.selectedChat) || null;
    const user = useSelector((state) => state.user) || null;

    const [messages, setMessages] = React.useState([]);

    const [inputText, setInputText] = useState('');

    const sendMessage = async () => {
        if (inputText.trim() !== '') {
            setMessages([...messages, { id: messages.length + 1, text: inputText, sender: user, receiver: selectedChat._id }]);

            await messageService.sendMessage({ sender: user, receiver: selectedChat._id, text: inputText });

            setInputText('');
        }
    };

    const deleteChat = async () => {
        await chatService.deleteChat(selectedChat._id);
        dispatch(selectChat({ selectedChat: null }));

        window.location.reload();
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await messageService.getMessages();
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
    
        fetchMessages();
    }, [selectedChat]);

    const sendAnswer = async () => {
        try {
            const response = await axios.get('https://api.adviceslip.com/advice');
            setMessages(prevMessages => [
                ...prevMessages, 
                { id: prevMessages.length + 1, text: response.data.slip.advice, sender: selectedChat._id }
            ]);

            await messageService.sendMessage({ sender: selectedChat._id, receiver: user, text: response.data.slip.advice });
        } catch (error) {
            console.error("Error fetching advice:", error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (messages.length > 0 && messages[messages.length - 1].sender === user) {
                sendAnswer();
            }
        }, 3000);
    }, [messages]);

    return (
        <>
            {selectedChat ? 
            (
               <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.profile}>
                            <img src={profile_pic} className={styles.profile_pic}  alt="profile" />
                            <h2 className={styles.username}>{selectedChat.firstName} {selectedChat.lastName}</h2>
                        </div>
                        <button onClick={() => deleteChat()} className={styles.button}>Delete chat</button>
                    </div>

                    <Messages messages={messages}/>

                    <div className={styles.bottom}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Type a message..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <button onClick={() => sendMessage()} className={styles.send}>Send</button>
                    </div>
               </div>
            )
             : (<div className={styles.content}></div>)}
        </>
    )
}

export default Chat