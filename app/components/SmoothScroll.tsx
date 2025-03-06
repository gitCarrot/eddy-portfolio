'use client';

import { useEffect, useState, useRef, useCallback } from 'react';



export default function SmoothScroll() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const lastScrollTime = useRef(0);
  
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
      setActiveSection(currentSection.id);
      
      // 현재 섹션에 활성화 클래스 추가 (DOM 조작 최소화)
      for (const section of sections) {
        if (section === currentSection && !section.classList.contains('section-active')) {
          section.classList.add('section-active');
        } else if (section !== currentSection && section.classList.contains('section-active')) {
          section.classList.remove('section-active');
        }
      }
    }
    
    // 스크롤 중이면 다음 프레임에 다시 실행
    if (isScrollingRef.current) {
      rafRef.current = requestAnimationFrame(detectVisibleSection);
    }
  }, [activeSection]);
  
  // 스크롤 타임아웃 ref
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
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
  
  // 스크롤 이벤트 등록
  useEffect(() => {
    // 초기 실행
    requestAnimationFrame(detectVisibleSection);
    
    // 스크롤 이벤트 리스너 등록 (passive: true로 성능 향상)
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 리사이즈 이벤트 리스너 등록
    const handleResize = () => {
      // 리사이즈 시 한 번 실행
      requestAnimationFrame(detectVisibleSection);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    // 클린업 함수
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [detectVisibleSection, handleScroll]);
  
  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
} 