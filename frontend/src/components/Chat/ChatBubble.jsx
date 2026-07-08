import React from 'react';

const ChatBubble = ({ message, isUser, avatar, actions, options }) => {
  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mr-4 mt-2">
          {avatar}
        </div>
      )}
      
      <div className={`max-w-[75%] rounded-2xl p-6 text-sm leading-relaxed shadow-lg ${
        isUser 
          ? 'bg-[#2A3F35] border border-primary/20 text-gray-200' 
          : 'bg-card border border-white/5 text-gray-300'
      }`}>
        <div dangerouslySetInnerHTML={{ 
          __html: message.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\n/g, '<br/>') 
        }} />
        
        {options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {options.map((opt, j) => (
              <div key={j} className="bg-[#1A2234] border border-white/10 rounded-xl p-4 hover:border-primary/50 cursor-pointer transition-colors group">
                <div className="text-xs font-bold text-white mb-1 group-hover:text-primary transition-colors">{opt.title}</div>
                <div className="text-[10px] text-gray-500 italic">{opt.desc}</div>
              </div>
            ))}
          </div>
        )}
        
        {actions && (
          <div className="flex flex-wrap gap-2 mt-4">
            {actions.map((action, i) => (
              <button key={i} onClick={action.onClick} className="bg-background border border-primary/30 text-primary px-4 py-2 rounded-full text-xs font-bold hover:bg-white/5 transition-colors">
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {isUser && avatar && (
        <img src={avatar} alt="User" className="w-10 h-10 rounded-full border border-white/10 shrink-0 ml-4 mt-2" />
      )}
    </div>
  );
};

export default ChatBubble;