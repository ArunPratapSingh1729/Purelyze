import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post('http://localhost:3001/chatbot', { message: input });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error communicating with the chatbot server', error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'Error communicating with the server' }]);
    } finally {
      setInput('');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };



  return (
    <div className="w-full h-screen flex justify-center items-center">
      {/* Chat Container */}
      <div className="flex flex-col bg-white w-1/2 h-full max-h-[90vh] shadow-lg rounded-lg p-4">
        
        {/* Chat Messages */}
        <div className="flex flex-col overflow-y-auto h-full p-4 bg-gray-100 rounded-lg">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'} my-2`}>
              {/* Message Bubble */}
              <div className={`flex items-center max-w-xs flex-row `}>
                {/* User/Bot Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold m-2 ${msg.sender === 'user' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                  {msg.sender === 'user' ? 'U' : 'B'}
                </div>
                {/* Message Text */}
                <div className={`p-2 text-sm rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900'}`}>
                  <span className="block font-semibold">{msg.sender === 'user' ? 'User' : 'Bot'}</span>
                  <span>{msg.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex mt-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r-lg">
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default Chatbot;
