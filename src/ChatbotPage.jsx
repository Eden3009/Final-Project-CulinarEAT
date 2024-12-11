import React, { useState } from 'react';

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f7f4',
  },
  chatContainer: {
    width: '90%',
    maxWidth: '400px',
    height: '80%',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  chatHeader: {
    backgroundColor: '#D4AF37',
    color: '#fff',
    padding: '10px',
    fontSize: '18px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  chatBody: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  chatMessage: {
    padding: '10px',
    borderRadius: '5px',
    maxWidth: '70%',
    wordWrap: 'break-word',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#D4AF37',
    color: '#fff',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
    color: '#333',
  },
  chatFooter: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderTop: '1px solid #ddd',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginRight: '10px',
    fontSize: '16px',
  },
  sendButton: {
    padding: '10px 15px',
    backgroundColor: '#D4AF37',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

function ChatBotPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);
      setInput('');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.chatContainer}>
        <div style={styles.chatHeader}>Chat with CulinarEAT</div>
        <div style={styles.chatBody}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.chatMessage,
                ...(msg.user ? styles.userMessage : styles.botMessage),
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div style={styles.chatFooter}>
          <input
            style={styles.input}
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button style={styles.sendButton} onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBotPage;
