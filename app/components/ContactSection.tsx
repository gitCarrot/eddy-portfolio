import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    submitted: false,
    loading: false,
    error: null as string | null
  });
  
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 폼 유효성 검사
    if (!formState.name || !formState.email || !formState.message) {
      setFormState(prev => ({
        ...prev,
        error: 'Please fill in all fields'
      }));
      return;
    }
    
    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setFormState(prev => ({
        ...prev,
        error: 'Please enter a valid email address'
      }));
      return;
    }
    
    // 로딩 상태 설정
    setFormState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    
    try {
      // 여기에 실제 폼 제출 로직 구현
      // 예: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formState) });
      
      // 성공 시 상태 업데이트 (실제 구현 시 서버 응답 후 처리)
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          message: '',
          submitted: true,
          loading: false,
          error: null
        });
      }, 1500); // 데모용 지연
    } catch (error) {
      console.error('Failed to send email:', error);
      setFormState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to send message. Please try again later.'
      }));
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <div className="w-full py-16">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 section-title">Get In Touch</h2>
          <p className="text-lg text-[var(--text-primary)] dark:text-zinc-300 max-w-2xl mx-auto font-medium">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {formState.submitted ? (
              <motion.div
                className="bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl p-8 shadow-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)] dark:text-white">Message Sent!</h3>
                <p className="text-[var(--text-primary)] dark:text-zinc-300">
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-2 bg-indigo-500 text-white rounded-full text-sm font-medium"
                  onClick={() => setFormState(prev => ({ ...prev, submitted: false }))}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl p-6 md:p-8 shadow-lg"
              >
                <motion.div variants={itemVariants} className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] dark:text-zinc-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-white/10 border border-white/30 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-[var(--text-primary)] dark:text-white"
                    placeholder="John Doe"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] dark:text-zinc-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-white/10 border border-white/30 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-[var(--text-primary)] dark:text-white"
                    placeholder="john@example.com"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] dark:text-zinc-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-white/10 border border-white/30 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-[var(--text-primary)] dark:text-white resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </motion.div>
                
                {formState.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm"
                  >
                    {formState.error}
                  </motion.div>
                )}
                
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={formState.loading}
                    className={`w-full py-3 rounded-lg font-medium text-white transition-all ${
                      formState.loading
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-500 hover:bg-indigo-600'
                    }`}
                  >
                    {formState.loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl p-6 md:p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-[var(--text-primary)] dark:text-white">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white">Email</h4>
                    <p className="text-[var(--text-primary)] dark:text-zinc-300">contact@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white">Location</h4>
                    <p className="text-[var(--text-primary)] dark:text-zinc-300">Honolulu, Hawaii</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white">Social Media</h4>
                    <div className="flex mt-2 space-x-3">
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-primary)] dark:text-zinc-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-primary)] dark:text-zinc-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-primary)] dark:text-zinc-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}