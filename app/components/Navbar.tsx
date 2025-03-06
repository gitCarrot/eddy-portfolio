import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
    
    const unsubscribeScroll = scrollY.on('change', (y) => {
      setIsScrolled(y > 50);
    });
    
    const handleScroll = () => {
      const currentPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const offset = window.scrollY + top;
          
          if (currentPosition >= offset && currentPosition <= window.scrollY + bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      unsubscribeScroll();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);
  
  const navItems = ['about', 'projects', 'experience', 'skills', 'contact'];
  
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="font-bold text-xl font-[family-name:var(--font-geist-sans)]"
        >
          <Link href="#hero" className="flex items-center gap-2">
            <motion.span 
              className="font-[family-name:var(--font-geist-mono)] h-8 w-8 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-sm"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >HJ</motion.span>
            <span>@gitCarrot</span>
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 font-[family-name:var(--font-geist-sans)]">
          {navItems.map((item) => (
            <li key={item}>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ y: 1 }}
              >
                <Link 
                  href={`#${item}`}
                  className={`text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors capitalize ${
                    activeSection === item ? 'font-semibold border-b-2 border-black dark:border-white' : ''
                  }`}
                >
                  {item}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
        
        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span 
            className={`bg-black dark:bg-white block h-0.5 w-6 rounded transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <motion.span 
            className={`bg-black dark:bg-white block h-0.5 w-6 rounded transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <motion.span 
            className={`bg-black dark:bg-white block h-0.5 w-6 rounded transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </motion.button>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-16 bg-white/95 dark:bg-black/95 z-40 flex flex-col md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul 
              className="flex flex-col items-center justify-center flex-1 gap-8 font-[family-name:var(--font-geist-sans)]"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { 
                    staggerChildren: 0.1,
                    delayChildren: 0.1
                  }
                }
              }}
            >
              {navItems.map((item) => (
                <motion.li 
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <Link 
                    href={`#${item}`}
                    className={`text-2xl text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors capitalize ${
                      activeSection === item ? 'font-semibold' : ''
                    }`}
                    onClick={handleNavClick}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}