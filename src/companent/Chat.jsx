import React, { useState, useEffect } from 'react'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db, auth } from './../fireBase/FirebaseConfig';

const Chat = ({ room }) => {
    const [newMsg, setNewMsg] = useState("")
    const [messages, setMessages] = useState([]);
    const messageRef = collection(db, "Message");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newMsg) return;
        addDoc(messageRef, {
            text: newMsg,
            user: auth.currentUser.displayName,
            room: room,
            createdAt: serverTimestamp(),
        });
        setNewMsg("")
    };

    useEffect(() => {
        const queryMessage = query(
            messageRef,
            where("room", "==", room),
            orderBy("createdAt")
        );
        onSnapshot(queryMessage, (snapShot) => {
            let commingMessages = [];
             snapShot.forEach((doc) => {
                commingMessages.push({ ...doc.data(), id: doc.id })
            })
            setMessages(commingMessages)
        })
    }, [])
    return (
        <div className='chat'>
            <div className='chatInfo'>
                <p>ChatBahri</p>
                <h2>{room}</h2>
                <a href='/'>Farklı Odaya Git</a>
            </div>
            <div className='chatMessage'>
                {
                    messages.map((message) => (
                        <>
                            {
                                auth.currentUser.displayName === message.user ? (
                                    <p className='userMessege'>{message.text}</p>
                                ) : (
                                    <p className='messageWrap'><span className='messageInfo'>{message.user}:</span><span className='infoText'>{message.text}</span></p>
                                )
                            }
                        </>
                    ))}
            </div>
            <div className='chatSecond'>
                <form onSubmit={handleSubmit}>
                    <input value={newMsg} onChange={(event) => setNewMsg(event.target.value)} type="text" placeholder='Mesajınızı Yazınız...'></input>
                    <button type='submit' >Gönder</button>
                </form>
            </div>
        </div>
    )
}

export default Chat