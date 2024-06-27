import { useContext, useEffect, useRef, useState } from "react";
import "./Chat.scss";
import { AuthContext } from "../../context/AuthContext.jsx";
import ApiRequest from "../../lib/apiRequest.js";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext.jsx";
import { useNotificationStore } from "../../lib/notificationStore.js";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const decrease = useNotificationStore((state) => state.decrease);

  const messageEndRef = useRef();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await ApiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;
    try {
      const res = await ApiRequest.post("/messages/" + chat.id, {
        text,
      });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await ApiRequest.put("/chats/read/" + chat.id);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="Chat">
      <div className="messages">
        <h1>Messages</h1>
        {/* <div className="message">
          <img src="/public/assets/pics/lana-profile-2.jpg" alt="" />
          <span>Lana Rhoades</span>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="message">
          <img src="/public/assets/pics/lana-profile-2.jpg" alt="" />
          <span>Lana Rhoades</span>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="message">
          <img src="/public/assets/pics/lana-profile-2.jpg" alt="" />
          <span>Lana Rhoades</span>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="message">
          <img src="/public/assets/pics/lana-profile-2.jpg" alt="" />
          <span>Lana Rhoades</span>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="message">
          <img src="/public/assets/pics/lana-profile-2.jpg" alt="" />
          <span>Lana Rhoades</span>
          <p>Lorem ipsum dolor sit amet.</p>
        </div> */}

        {chats?.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img
              src={
                c.receiver.avatar || "../../../public/assets/pics/noAvatar.jpg"
              }
              alt=""
            />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={
                  chat.receiver.avatar ||
                  "../../../public/assets/pics/noAvatar.jpg"
                }
                alt=""
              />
              <span>{chat.receiver.username}</span>
            </div>
            <div className="close" onClick={() => setChat(null)}>
              X
            </div>
          </div>
          <div className="center">
            {chat.messages.map((message) => {
              return (
                <div
                  className="chatMessage"
                  style={{
                    alignSelf:
                      message.userId === currentUser.id
                        ? "flex-end"
                        : "flex-start",
                    textAlign:
                      message.userId === currentUser.id ? "right" : "left",
                  }}
                  key={message.id}
                >
                  <p>{message.text}</p>
                  <span
                    style={{
                      backgroundColor:
                        message.userId === currentUser.id
                          ? "rgba(2, 255, 2, 0.400)"
                          : "var(--color-template)",
                      alignSelf:
                        message.userId === currentUser.id
                          ? "flex-end"
                          : "flex-start",
                      textAlign:
                        message.userId === currentUser.id ? "right" : "left",
                    }}
                  >
                    {format(message.createdAt)}
                  </span>
                </div>
              );
            })}

            {/* <div className="chatMessage">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              <span>1 hour ago</span>
            </div> */}

            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}
export default Chat;
