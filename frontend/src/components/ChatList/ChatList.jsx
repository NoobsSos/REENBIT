import React, { useState, useEffect } from 'react'
import axios from 'axios';

import styles from "./ChatList.module.css";

import profile_pic from "../../assets/profile_pic.jpg"
import search from "../../assets/search.png"

import chatService from '../../services/chat.service.js';

import { selectChat, addChat, deselectChat, logOut } from '../../store/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedChat = useSelector((state) => state.selectedChat);
    const user = useSelector((state) => state.user);

    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
    });

    const [isOpen, setIsOpen] = React.useState(false)

    
    const [chats, setChats] = React.useState([]);
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredChats = chats.filter(chat => {
        const fullName = `${chat.firstName} ${chat.lastName}`.toLowerCase();
        return fullName.includes(searchText.toLowerCase());
    });

    const selectingChat = (chat) => {
        if (selectedChat && selectedChat._id === chat._id) {
            dispatch(deselectChat());
        } else {
            dispatch(selectChat({ selectedChat: chat }));
        } 
    }

    const getChats = async () => {
        try {
            const response = await chatService.getChats();
            console.log(response.data);
            setChats(response.data);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    useEffect(() => {
        getChats();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.lastName || !formData.firstName) {
            console.error("Both are required");
            return;
        }
    
        const newChat = { firstName: formData.firstName, lastName: formData.lastName, createdBy: user };
        setChats([...chats, newChat]);

        await chatService.createChat({ firstName: formData.firstName, lastName: formData.lastName, user: user });

        setIsOpen(false);
        console.log(formData);

    };

    return (
        <div className={styles.content}>
            <div className={styles.top}>
                <div className={styles.profile}>
                    <img src={profile_pic} className={styles.profile_pic}  alt="profile" />
                    <div className={styles.button}>
                        {user ? <button onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)} className={styles.login}>New chat</button> 
                                    : 
                                <button onClick={() => navigate('/login')} className={styles.login}>Log In</button>}
                        {user && <button onClick={() => dispatch(logOut())} className={styles.login}>Log Out</button>}
                    </div>
                </div>

                {isOpen && (
                    <div className={styles.new_chat}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <input required
                                type="text" 
                                name="firstName" 
                                value={formData.firstName} 
                                onChange={handleInputChange} 
                                className={styles.input} 
                                placeholder="First name" 
                            />
                            <input required
                                type="text" 
                                name="lastName" 
                                value={formData.lastName} 
                                onChange={handleInputChange} 
                                className={styles.input} 
                                placeholder="Last name" 
                            />
                            <button type='submit' className={styles.submit}>Create chat</button>
                        </form>
                    </div>
                )}

                <div className={styles.search}>
                    <input
                        type="text"
                        className={styles.search_bar}
                        placeholder="🔍  Search chat"
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className={styles.bottom}>
                <h2 className={styles.title}>Chats</h2>
                <div className={styles.chatList}>
                    {searchText ? filteredChats.filter(chat => chat.createdBy === user).map(chat => (
                        <div key={chat.id} onClick={() => selectingChat(chat)} className={styles.chat}>
                            <img src={profile_pic} className={styles.profile_pic}  alt="profile" />
                            <div className={styles.chat_info}>
                                <div className={styles.username}>{chat.firstName} {chat.lastName}</div>
                                <div className={styles.last_message}>Last message</div>
                            </div>
                            <div className={styles.time}>
                                <p>Aug 17, 2022</p>
                            </div>
                        </div>  
                    )) : chats.filter(chat => chat.createdBy === user).map(chat => (
                        <div key={chat.id} onClick={() => selectingChat(chat)} className={styles.chat}>
                            <img src={profile_pic} className={styles.profile_pic}  alt="profile" />
                            <div className={styles.chat_info}>
                                <div className={styles.username}>{chat.firstName} {chat.lastName}</div>
                                <div className={styles.last_message}>Last message</div>
                            </div>
                            <div className={styles.time}>
                                <p>Aug 17, 2022</p>
                            </div>
                        </div>  
                    ))}

                </div>
            </div>
        </div>
    )
}

export default ChatList