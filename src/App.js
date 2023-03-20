import React, { useState, useRef } from "react";
import Chat from "./companent/Chat";
import Auth from "./companent/Auth";
import "./assest/index.css"

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  const [room, setRoom] = useState(null)
  const inputRef = useRef(null)
  if (!isAuth) {
    <div className="container">
      <Auth setIsAuth={setIsAuth} />
    </div>
  }

  return (
    <div className="container">
      {
        room ?
          (
            <Chat room={room}/>
          )
          : (
            <div className="roomContainer">
              <h1>Chat Odası</h1>
              <p>Hangi Odaya Gireceksiniz?</p>
              <input ref={inputRef} type="text" placeholder="Oda İsmini Yazınız..." />
              <button onClick={() => setRoom(inputRef.current.value)} id="enter">Odaya Giriş Yap</button>
              <button id="leave">Çıkış Yap</button>
            </div>
           )
      }
    </div>
  );
}

export default App;
