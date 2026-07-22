"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ResearchData {
  title: string;
  subject: string;
  date: string;
  abstract: string;
}

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResearchData | null;
}

export default function ResearchModal({ isOpen, onClose, data }: ResearchModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 모달이 열리면 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      {/* 백드롭 레이어 */}
      <div 
        className="absolute inset-0 bg-[#0e0e11]/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* 모달 래퍼 */}
      <div className="relative z-101 w-[90%] max-w-[600px] rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-card)] p-10 shadow-[var(--shadow-lg)] transition-transform duration-300 ease-out scale-100">
        
        {/* 닫기 버튼 */}
        <button 
          className="absolute top-6 right-6 flex items-center justify-center rounded-full p-1 text-[var(--text-muted)] hover:bg-[var(--bg-app)] hover:text-[var(--text-primary)] transition-colors duration-200"
          onClick={onClose}
          aria-label="모달 닫기"
        >
          <X size={20} />
        </button>

        {/* 모달 헤더 */}
        <div className="mb-6">
          <span className="inline-block text-[0.8rem] font-bold uppercase tracking-wider text-[var(--accent)] mb-2">
            {data.subject}
          </span>
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] leading-tight mb-2">
            {data.title}
          </h2>
          <span className="text-[0.8rem] text-[var(--text-muted)]">
            작성일: {data.date}
          </span>
        </div>

        {/* 모달 바디 */}
        <div className="border-t border-[var(--border-color)] pt-5">
          <h3 className="text-[1rem] font-semibold text-[var(--text-primary)] mb-3">
            연구 초록 (Abstract)
          </h3>
          <p className="text-[0.95rem] text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
            {data.abstract}
          </p>
        </div>

      </div>
    </div>
  );
}
