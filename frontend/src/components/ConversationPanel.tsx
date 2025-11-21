/**
 * Conversation Panel Component
 * Real-time chat interface with agent using AppSync subscriptions
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  ConversationMessage,
  sendMessageToAgent,
  getConversationHistoryForProject,
  subscribeToConversation,
  formatTimestamp,
} from '../services/conversationService';
import './ConversationPanel.css';

interface ConversationPanelProps {
  projectId: string;
  agentId: string;
  agentName?: string;
}

export const ConversationPanel: React.FC<ConversationPanelProps> = ({
  projectId,
  agentId,
  agentName = 'Agent',
}) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversation history on mount
  useEffect(() => {
    loadHistory();
  }, [projectId]);

  // Subscribe to new messages
  useEffect(() => {
    const unsubscribe = subscribeToConversation(
      projectId,
      (message) => {
        setMessages((prev) => {
          // Avoid duplicates
          if (prev.some((m) => m.id === message.id)) {
            return prev;
          }
          return [...prev, message];
        });
      },
      (error) => {
        console.error('Subscription error:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [projectId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const history = await getConversationHistoryForProject(projectId);
      setMessages(history);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || sending) return;

    const messageText = inputMessage.trim();
    setInputMessage('');
    setSending(true);

    try {
      await sendMessageToAgent(projectId, agentId, messageText);
      // Message will appear via subscription
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
      setInputMessage(messageText); // Restore message
    } finally {
      setSending(false);
    }
  };

  const renderMessage = (message: ConversationMessage) => {
    const isUser = message.messageType === 'USER_INPUT';
    const isSystem = message.messageType === 'SYSTEM_NOTIFICATION';
    const isProgress = message.messageType === 'PROGRESS_UPDATE';

    if (isSystem || isProgress) {
      return (
        <div key={message.id} className="message-system">
          <div className="message-content">
            <span className="message-icon">ℹ️</span>
            {message.message}
          </div>
          <div className="message-time">{formatTimestamp(message.timestamp)}</div>
        </div>
      );
    }

    return (
      <div key={message.id} className={`message ${isUser ? 'message-user' : 'message-agent'}`}>
        <div className="message-header">
          <span className="message-sender">
            {isUser ? 'You' : agentName}
          </span>
          <span className="message-time">{formatTimestamp(message.timestamp)}</span>
        </div>
        <div className="message-content">{message.message}</div>
      </div>
    );
  };

  return (
    <div className="conversation-panel">
      <div className="conversation-header">
        <h3>💬 Conversation with {agentName}</h3>
      </div>

      <div className="conversation-messages">
        {loading && (
          <div className="conversation-loading">
            <div className="spinner"></div>
            <p>Loading conversation...</p>
          </div>
        )}

        {!loading && messages.length === 0 && (
          <div className="conversation-empty">
            <p>No messages yet. Start a conversation with {agentName}!</p>
          </div>
        )}

        {messages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>

      <form className="conversation-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Message ${agentName}...`}
          disabled={sending}
          className="message-input"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || sending}
          className="send-button"
        >
          {sending ? '⏳' : '📤'} Send
        </button>
      </form>
    </div>
  );
};
