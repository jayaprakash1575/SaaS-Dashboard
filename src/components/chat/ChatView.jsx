import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Search,
  CheckCheck
} from 'lucide-react';
import { chatContacts, initialChatMessages } from '../../data/mockData';
import SearchInput from '../common/SearchInput';
import Button from '../common/Button';

export const ChatView = () => {
  const [contacts, setContacts] = useState(chatContacts);
  const [activeContact, setActiveContact] = useState(chatContacts[0]);
  const [messages, setMessages] = useState(initialChatMessages);
  const [inputText, setInputText] = useState('');
  const [searchContact, setSearchContact] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchContact.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      text: inputText,
      timestamp: 'Just now',
      isMe: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Trigger typing indicator then automated reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyMsg = {
        id: `msg-${Date.now() + 1}`,
        senderId: activeContact.id,
        text: `Thanks for the update! The ${activeContact.name} team reviewed it and approves the dashboard specs.`,
        timestamp: 'Just now',
        isMe: false,
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1400);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden flex flex-col md:flex-row h-[calc(100vh-210px)] min-h-[580px]">
        {/* Left Column: Contact List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-slate-100 flex flex-col">
          {/* Search Header */}
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-xl font-bold text-[#1B2559] mb-3">Messages</h3>
            <SearchInput
              value={searchContact}
              onChange={setSearchContact}
              placeholder="Search conversations..."
            />
          </div>

          {/* Contact List items */}
          <div className="overflow-y-auto flex-1 divide-y divide-slate-50">
            {filteredContacts.map((contact) => {
              const isActive = activeContact.id === contact.id;

              return (
                <div
                  key={contact.id}
                  onClick={() => setActiveContact(contact)}
                  className={`flex items-center gap-3.5 p-4 cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-[#F4F7FE]'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-[#1B2559] truncate">
                        {contact.name}
                      </h4>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {contact.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium truncate">
                      {contact.lastMessage}
                    </p>
                  </div>

                  {contact.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {contact.unread}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Chat Conversation */}
        <div className="flex-1 flex flex-col justify-between bg-slate-50/40 min-w-0">
          {/* Chat Header */}
          <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeContact.avatar}
                  alt={activeContact.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                />
                {activeContact.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1B2559]">
                  {activeContact.name}
                </h4>
                <p className="text-xs text-emerald-600 font-semibold">
                  {activeContact.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={() => alert(`Calling ${activeContact.name}...`)}
                className="p-2 rounded-xl hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                title="Voice Call"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => alert(`Starting video call with ${activeContact.name}...`)}
                className="p-2 rounded-xl hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                title="Video Call"
              >
                <Video className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded-xl hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                title="More"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[70%] p-4 rounded-3xl text-sm font-medium ${
                    msg.isMe
                      ? 'bg-[#4318FF] text-white rounded-br-xs shadow-sm'
                      : 'bg-white text-[#1B2559] rounded-bl-xs border border-slate-100 shadow-card'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Media attachments */}
                  {msg.media && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {msg.media.map((img, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl overflow-hidden border border-white/20 bg-slate-900"
                        >
                          <img
                            src={img}
                            alt="attachment"
                            className="w-full h-28 object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mt-1 px-1 text-[11px] text-slate-400 font-semibold">
                  <span>{msg.timestamp}</span>
                  {msg.isMe && <CheckCheck className="w-3.5 h-3.5 text-[#4318FF]" />}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold px-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>{activeContact.name} is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white border-t border-slate-100 flex items-center gap-3"
          >
            <button
              type="button"
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Attach File"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-[#F4F7FE] border-none text-sm text-[#1B2559] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-2xl bg-[#4318FF] text-white hover:bg-[#3311CC] transition-colors disabled:opacity-40 disabled:hover:bg-[#4318FF] cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
