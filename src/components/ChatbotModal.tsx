import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function ChatbotModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full gradient-button shadow-lg flex items-center justify-center z-40 hover:shadow-xl transition-shadow"
      >
        <MessageCircle className="text-white" size={28} />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 100, y: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 100, y: 100 }}
              className="fixed bottom-6 right-6 w-full max-w-md h-[600px] glass-strong rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="gradient-button p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <h3 className="text-white font-bold text-lg">Ask Nia</h3>
                    <p className="text-white/80 text-xs">Your AI Learning Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="text-white" size={20} />
                </button>
              </div>

              {/* Chatbase Embed Container */}
              <div className="flex-1 overflow-hidden bg-white">
                {/*
                  PASTE YOUR CHATBASE EMBED CODE HERE
                  Example:
                  <iframe
                    src="https://www.chatbase.co/chatbot-iframe/YOUR_CHATBOT_ID"
                    width="100%"
                    style={{ height: '100%', minHeight: '500px' }}
                    frameBorder="0"
                  ></iframe>
                */}
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">🤖</span>
                    </div>
                    <p className="text-gray-600 font-medium mb-2">Chatbot Coming Soon!</p>
                    <p className="text-gray-500 text-sm">
                      Replace this section with your Chatbase embed code
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
