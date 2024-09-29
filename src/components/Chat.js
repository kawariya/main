import  { useEffect, useState } from "react";
import { addDoc, collection,serverTimestamp , onSnapshot,query,where } from "firebase/firestore";
import {  auth,db } from "../firebase-config";
import {  orderBy } from 'firebase/firestore';

//import "../styles/Chat.css";
//import '../styles/Chat.css';

export const Chat = (props) => {
  const {room} = props
    const [newMessage, setNewMessage] = useState("");
    const [messages,setMessages] = useState([]);
    const messageRef= collection(db,"messages");

    useEffect( () => {
        const queryMessages = query(
            messageRef,
            where("room","==",room) , 
            orderBy("createdAt")
        );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages= [];
            //console.log("NEW MESSAGE");
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
 
            });
            setMessages(messages);

        });
        return () => unsuscribe();
    }, []);

   
   
   
   
   
    const handleSubmit =  async (e) => {
        e.preventDefault();
        if (newMessage ==="") return;
        await addDoc(messageRef , {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,

        });

        setNewMessage("");


    };
    return (
    <div className="chat-app">
        <div className="header">
            <h1> Welcome to: {room.toUpperCase()}</h1>
        </div>
        <div className="messages">
             {messages.map((message) => (
             //<h1> {message.text}</h1>)}</div>
               <div className="messages" key={message.id}> 
                 <span className="user">{message.user}</span>
                 {message.text}
                 
               
                </div>
             ))}
        </div >
            <form  onSubmit={handleSubmit} className="new-message-form">
                <input
                 className="new-message-input"
                 placeholder="Type your message here..."
                 onChange={(e) => setNewMessage(e.target.value)}
                 value={newMessage}
                />
                <button  type="submit" className="send-button">
                    Send
                </button>
            </form>
    </div>
  );
};