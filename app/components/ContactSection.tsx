import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // EmailJS를 사용하여 실제 이메일 전송
    // 환경 변수에서 EmailJS 설정 값을 가져옵니다
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, 
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, 
      formRef.current!, 
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // 성공 메시지 5초 후 리셋
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      setIsSubmitting(false);
      setError('Failed to send message. Please try again later.');
    });
  };
  
  const inputVariants = {
    focus: { scale: 1.01, transition: { duration: 0.2 } }
  };
  
  return (
    <div className="w-full">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Have a project in mind or just want to say hello? Feel free to reach out!
        </p>
      </motion.div>
      
      <div className="max-w-2xl mx-auto">
        <motion.form 
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          whileHover={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
          className="space-y-6 p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-zinc-100/10 dark:border-zinc-800/20"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
            <motion.input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border-2 border-transparent focus:border-black dark:focus:border-white focus:outline-none transition-colors"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <motion.input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border-2 border-transparent focus:border-black dark:focus:border-white focus:outline-none transition-colors"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
            <motion.textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border-2 border-transparent focus:border-black dark:focus:border-white focus:outline-none transition-colors resize-none"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
          
          <motion.button
            type="submit"
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all
              ${isSubmitting ? 'bg-zinc-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'}`}
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)" } : undefined}
            whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
            animate={isSubmitting ? 
              { opacity: [1, 0.7, 1], transition: { repeat: Infinity, duration: 1.5 } } : 
              { opacity: 1 }
            }
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
          
          {isSubmitted && (
            <motion.div
              className="text-green-600 font-medium text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Message sent successfully! I&apos;ll get back to you soon.
            </motion.div>
          )}
          
          {error && (
            <motion.div
              className="text-red-600 font-medium text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {error}
            </motion.div>
          )}
        </motion.form>
        
        <motion.div 
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <a href="mailto:your.email@example.com" className="flex items-center gap-2 text-lg hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            your.email@example.com
          </a>
          
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
            GitHub
          </a>
          
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect width="4" height="12" x="2" y="9"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            LinkedIn
          </a>
        </motion.div>
      </div>
    </div>
  );
}