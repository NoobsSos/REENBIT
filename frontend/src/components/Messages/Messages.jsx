import React, { useEffect, useRef } from 'react'

import styles from "./Messages.module.css";

import { useSelector } from 'react-redux';

const Messages = ({messages}) => {

    const selectedChat = useSelector((state) => state.selectedChat) || null;
    const user = useSelector((state) => state.user) || null;

    return (
        <>
            {selectedChat ? 
            (
                    <div className={styles.messages}>
                        {messages && messages
                                    .filter(message => message.receiver === selectedChat._id || message.sender === selectedChat._id)
                                    .map(message => (
                                        <div key={message.id} className={message.sender === user ? styles.sender : styles.receiver}>
                                            {/* <div className={message.sender === user ? styles.sender : styles.receiver}> */}
                                                {message.text}
                                            {/* </div> */}
                                        </div>
                        ))}
                    </div>
            )
             : (<div className={styles.content}></div>)}
        </>
    )
}

export default Messages