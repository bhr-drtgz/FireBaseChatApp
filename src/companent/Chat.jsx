import React, { useState, useEffect } from 'react'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore"
import { db, auth } from './../fireBase/FirebaseConfig';

const Chat = ({ room }) => {
    const [newMsg, setNewMsg] = useState("")
    const [messages, setMessages] = useState([])
    const messageRef = collection(db, "Message")
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!newMsg) return;
        addDoc(messageRef, {
            text: newMsg,
            user: auth.currentUser.displayName,
            room: room,
            createdAt: serverTimestamp(),
        })
        console.log(newMsg)
        setNewMsg("")
    }
    useEffect(() => {
        const queryMessage = query(
            messageRef,
            where("room", "==", room),
            orderBy("createdAt")
        )
        let commingMessages = []
        onSnapshot(queryMessage, ((snapShot) =>
            snapShot.forEach((doc) => {
                commingMessages.push({ ...doc.data(), id: doc.id })
            })
        ))
        setMessages(commingMessages)
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
                        <p key={new Date()} >{message.text}</p>
                    ))
                }
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