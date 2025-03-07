'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export default function SmoothScroll() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const lastScrollTime = useRef(0);
  
  // 배경색 전환 효과 함수
  const applyGradientTransition = useCallback((sectionId: string) => {
    if (sectionId === activeSection) return; // 이미 활성화된 섹션이면 무시
    
    console.log(`배경색 전환: ${activeSection || 'none'} -> ${sectionId}`);
    
    try {
      // 모든 그라디언트 배경 요소 가져오기
      const gradientBgs = {
        hero: document.getElementById('gradient-bg-hero'),
        about: document.getElementById('gradient-bg-about'),
        projects: document.getElementById('gradient-bg-projects'),
        experience: document.getElementById('gradient-bg-experience'),
        skills: document.getElementById('gradient-bg-skills'),
        contact: document.getElementById('gradient-bg-contact')
      };
      
      // 현재 활성화된 섹션 배경 요소
      const currentBg = activeSection ? gradientBgs[activeSection as keyof typeof gradientBgs] : null;
      
      // 새로운 섹션 배경 요소
      const newBg = gradientBgs[sectionId as keyof typeof gradientBgs];
      
      if (!newBg) {
        // 요소가 없는 경우 직접 생성
        const createdBg = document.createElement('div');
        createdBg.id = `gradient-bg-${sectionId}`;
        createdBg.className = `continuous-bg bg-${sectionId}`;
        createdBg.style.opacity = '0';
        document.body.appendChild(createdBg);
        
        // 약간의 지연 후 표시 (DOM에 추가된 후)
        setTimeout(() => {
          createdBg.style.opacity = '1';
        }, 50);
        
        console.log(`${sectionId} 배경 요소 생성 및 표시 완료`);
      } else {
        // 새 배경 표시
        newBg.style.opacity = '1';
      }
      
      // 이전 배경 숨기기 (약간의 지연 후)
      if (currentBg && currentBg !== newBg) {
        setTimeout(() => {
          currentBg.style.opacity = '0';
        }, 500); // 새 배경이 나타나기 시작한 후 이전 배경 숨기기
      }
      
      // body 클래스 업데이트
      document.body.className = '';
      document.body.classList.add(`active-${sectionId}`);
    } catch (error) {
      console.error('배경색 전환 중 오류 발생:', error);
    }
  }, [activeSection]);
  
  // 스로틀링된 스크롤 감지 함수
  const detectVisibleSection = useCallback(() => {
    // 스로틀링 (16ms = 약 60fps)
    const now = Date.now();
    if (now - lastScrollTime.current < 16) {
      // 다음 프레임에 다시 시도
      rafRef.current = requestAnimationFrame(detectVisibleSection);
      return;
    }
    
    lastScrollTime.current = now;
    
    try {
      // 모든 섹션 요소 가져오기
      const sections = Array.from(document.querySelectorAll<HTMLElement>('.section'));
      
      if (sections.length === 0) {
        rafRef.current = requestAnimationFrame(detectVisibleSection);
        return;
      }
      
      let currentSection: HTMLElement | null = null;
      let maxVisibility = 0;
      
      // 각 섹션의 가시성 계산
      for (const section of sections) {
        // getBoundingClientRect는 리플로우를 발생시키므로 한 번만 호출
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // 섹션이 얼마나 보이는지 계산 (0~1)
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibility = visibleHeight / windowHeight;
        
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          currentSection = section;
        }
      }
      
      // 활성 섹션 업데이트
      if (currentSection && currentSection.id !== activeSection) {
        // 현재 섹션에 활성화 클래스 추가 (DOM 조작 최소화)
        for (const section of sections) {
          if (section === currentSection && !section.classList.contains('section-active')) {
            section.classList.add('section-active');
            
            // 배경 색상 전환 효과
            applyGradientTransition(currentSection.id);
            
            // 활성 섹션 상태 업데이트
            setActiveSection(currentSection.id);
          } else if (section !== currentSection && section.classList.contains('section-active')) {
            section.classList.remove('section-active');
          }
        }
      }
    } catch (error) {
      console.error('섹션 감지 중 오류 발생:', error);
    }
    
    // 스크롤 중이면 다음 프레임에 다시 실행
    if (isScrollingRef.current) {
      rafRef.current = requestAnimationFrame(detectVisibleSection);
    }
  }, [activeSection, applyGradientTransition]);
  
  // 스크롤 이벤트 처리 함수
  const handleScroll = useCallback(() => {
    if (!isScrollingRef.current) {
      isScrollingRef.current = true;
      document.body.classList.add('is-scrolling');
      
      // 스크롤 감지 시작
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(detectVisibleSection);
      }
    }
    
    // 스크롤 타임아웃 리셋
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      document.body.classList.remove('is-scrolling');
      
      // 마지막 한 번 더 실행하여 최종 위치 확인
      requestAnimationFrame(detectVisibleSection);
      
      // RAF 취소
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }, 100);
  }, [detectVisibleSection]);
  
  // 스크롤 타임아웃 ref
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
  // 스크롤 이벤트 등록
  useEffect(() => {
    console.log('SmoothScroll 컴포넌트 마운트');
    
    // 초기 실행 - 페이지 로드 시 배경색 설정
    setTimeout(() => {
      // 배경 요소가 있는지 확인하고 없으면 생성
      const checkAndCreateBackgrounds = () => {
        const sections = ['hero', 'about', 'projects', 'experience', 'skills', 'contact'];
        
        sections.forEach(section => {
          const bgElement = document.getElementById(`gradient-bg-${section}`);
          if (!bgElement) {
            console.log(`${section} 배경 요소가 없어서 생성합니다.`);
            const newBg = document.createElement('div');
            newBg.id = `gradient-bg-${section}`;
            newBg.className = `continuous-bg bg-${section}`;
            newBg.style.opacity = section === 'hero' ? '1' : '0';
            document.body.appendChild(newBg);
          }
        });
      };
      
      checkAndCreateBackgrounds();
      requestAnimationFrame(detectVisibleSection);
    }, 1000);
    
    // 스크롤 이벤트 리스너 등록 (passive: true로 성능 향상)
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 리사이즈 이벤트 리스너 등록
    const handleResize = () => {
      // 리사이즈 시 한 번 실행
      requestAnimationFrame(detectVisibleSection);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    // 다크 모드 변경 감지
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkModeChange = () => {
      // 현재 활성화된 섹션이 있으면 그라디언트 다시 적용
      if (activeSection) {
        applyGradientTransition(activeSection);
      }
    };
    
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
    
    // 클린업 함수
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
      
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [detectVisibleSection, handleScroll, applyGradientTransition, activeSection]);
  
  // 해시 변경 감지 (URL 해시가 변경될 때 해당 섹션으로 이동)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // '#'을 제거
      
      if (hash) {
        const section = document.getElementById(hash);
        if (section) {
          // 해당 섹션으로 스크롤
          section.scrollIntoView({ behavior: 'smooth' });
          
          // 배경색 변경
          applyGradientTransition(hash);
        }
      }
    };
    
    // 초기 로드 시 해시 확인
    if (window.location.hash) {
      setTimeout(handleHashChange, 500); // 약간의 지연 후 실행
    }
    
    // 해시 변경 이벤트 리스너 등록
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [applyGradientTransition]);
  
  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
} 