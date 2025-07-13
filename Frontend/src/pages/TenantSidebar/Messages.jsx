import React, { useState } from "react";
import { Send } from "lucide-react";

const Messages = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello!", sender: "user" },
        { id: 2, text: "Hi there!", sender: "tenant" },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            setMessages([
                ...messages,
                { id: messages.length + 1, text: newMessage, sender: "user" },
            ]);
            setNewMessage("");
        }
    };

    return (
        <div className="flex flex-col h-full p-4 bg-gray-100">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto bg-white rounded shadow p-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`mb-2 p-2 rounded ${
                            message.sender === "user"
                                ? "bg-blue-500 text-white self-end"
                                : "bg-gray-200 text-gray-800 self-start"
                        }`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="mt-4 flex items-center">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 flex items-center"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Messages;