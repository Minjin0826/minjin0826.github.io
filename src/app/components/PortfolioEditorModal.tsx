"use client";

import React, { useState, useEffect } from "react";
import { X, User, Award, BookOpen, FileText, Plus, Trash2, RotateCcw, Check } from "lucide-react";
import { PortfolioData, BookLog, ResearchReport } from "../types/portfolio";

interface PortfolioEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
}

export default function PortfolioEditorModal({
  isOpen,
  onClose,
  initialData,
  onSave,
  onReset
}: PortfolioEditorModalProps) {
  const [formData, setFormData] = useState<PortfolioData>(initialData);
  const [activeStep, setActiveStep] = useState<number>(1);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // 프로필 변경 핸들러
  const handleProfileChange = (field: keyof PortfolioData["profile"], value: string) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  // 독서 추가
  const handleAddBook = () => {
    const newBook: BookLog = {
      id: Date.now().toString(),
      category: "humanity",
      categoryKo: "인문학 / 철학",
      title: "새 책 제목",
      author: "저자 이름",
      review: "읽은 책에 대한 독서 소감 및 서평을 작성하세요."
    };
    setFormData(prev => ({
      ...prev,
      bookLogs: [...prev.bookLogs, newBook]
    }));
  };

  // 독서 삭제
  const handleRemoveBook = (id: string) => {
    setFormData(prev => ({
      ...prev,
      bookLogs: prev.bookLogs.filter(b => b.id !== id)
    }));
  };

  // 독서 변경
  const handleBookChange = (id: string, field: keyof BookLog, value: string) => {
    setFormData(prev => ({
      ...prev,
      bookLogs: prev.bookLogs.map(book => {
        if (book.id === id) {
          const updated = { ...book, [field]: value };
          if (field === "category") {
            if (value === "humanity") updated.categoryKo = "인문학 / 철학";
            if (value === "society") updated.categoryKo = "사회과학 / 역사";
            if (value === "literature") updated.categoryKo = "문학 / 문화";
          }
          return updated;
        }
        return book;
      })
    }));
  };

  // 연구 보고서 추가
  const handleAddReport = () => {
    const newReport: ResearchReport = {
      id: Date.now().toString(),
      title: "새 탐구 보고서 제목",
      subject: "사회/어학 탐구",
      date: "2026년 6월",
      tag: "사회과학",
      preview: "보고서에 대한 짧은 요약 내용입니다.",
      abstract: "탐구 동기, 과정, 결론 및 시사점을 담은 상세 초록 내용입니다."
    };
    setFormData(prev => ({
      ...prev,
      researchReports: [...prev.researchReports, newReport]
    }));
  };

  // 연구 보고서 삭제
  const handleRemoveReport = (id: string) => {
    setFormData(prev => ({
      ...prev,
      researchReports: prev.researchReports.filter(r => r.id !== id)
    }));
  };

  // 저장 버튼
  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
      {/* 백드롭 */}
      <div 
        className="fixed inset-0 bg-[#0e0e11]/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* 모달 박스 */}
      <div className="relative z-10 w-full max-w-[850px] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[24px] shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] flex flex-col text-[var(--text-primary)]">
        
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif">✏️ 내 포트폴리오 정보 직접 수정</h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              이름, 학교, 학년, 성적, 읽은 책 및 탐구 보고서를 자유롭게 기입하세요.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--bg-app)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Step 탭 이동 */}
        <div className="flex border-b border-[var(--border-color)] gap-2 py-3 overflow-x-auto text-xs sm:text-sm font-medium">
          <button
            type="button"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] whitespace-nowrap transition-colors ${
              activeStep === 1 ? "bg-[var(--accent)] text-white font-semibold" : "bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--accent)]"
            }`}
            onClick={() => setActiveStep(1)}
          >
            <User size={16} /> 1. 인적사항 & 프로필
          </button>
          <button
            type="button"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] whitespace-nowrap transition-colors ${
              activeStep === 2 ? "bg-[var(--accent)] text-white font-semibold" : "bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--accent)]"
            }`}
            onClick={() => setActiveStep(2)}
          >
            <Award size={16} /> 2. 성적 & 어학
          </button>
          <button
            type="button"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] whitespace-nowrap transition-colors ${
              activeStep === 3 ? "bg-[var(--accent)] text-white font-semibold" : "bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--accent)]"
            }`}
            onClick={() => setActiveStep(3)}
          >
            <BookOpen size={16} /> 3. 읽은 책 & 서평
          </button>
          <button
            type="button"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] whitespace-nowrap transition-colors ${
              activeStep === 4 ? "bg-[var(--accent)] text-white font-semibold" : "bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--accent)]"
            }`}
            onClick={() => setActiveStep(4)}
          >
            <FileText size={16} /> 4. 탐구 보고서
          </button>
        </div>

        {/* 메인 입력 Form Body */}
        <form onSubmit={handleSaveSubmit} className="flex-1 overflow-y-auto py-5 px-1 space-y-6">
          
          {/* Step 1: 인적사항 & 프로필 */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">지원자 이름 *</label>
                  <input
                    type="text"
                    required
                    value={formData.profile.name}
                    onChange={e => handleProfileChange("name", e.target.value)}
                    placeholder="예: 홍길동"
                    className="w-full p-2.5 rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-app)] text-sm focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">지망 학교 / 계열 *</label>
                  <input
                    type="text"
                    required
                    value={formData.profile.targetSchool}
                    onChange={e => handleProfileChange("targetSchool", e.target.value)}
                    placeholder="예: 외국어고등학교 국제계열 지망"
                    className="w-full p-2.5 rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-app)] text-sm focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">현재 중학교 소속 *</label>
                  <input
                    type="text"
                    required
                    value={formData.profile.currentSchool}
                    onChange={e => handleProfileChange("currentSchool", e.target.value)}
                    placeholder="예: 한국중학교"
                    className="w-full p-2.5 rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-app)] text-sm focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">학년 *</label>
                  <input
                    type="text"
                    required
                    value={formData.profile.grade}
                    onChange={e => handleProfileChange("grade", e.target.value)}
                    placeholder="예: 3학년"
                    className="w-full p-2.5 rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-app)] text-sm focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">관심 분야</label>
                <input
                  type="text"
                  value={formData.profile.interests}
                  onChange={e => handleProfileChange("interests", e.target.value)}
                  placeholder="예: 국제정치학, 사회학, 비교문화학"
                  className="w-full p-2.5 rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-app)] text-sm focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">나를 표현하는 한 줄 슬로건 (Vision Quote)</label>
                <input
                  type="text"
                  value={formData.profile.visionQuote}
                  onChange={e => handleProfileChange("visionQuote", e.target.value)}
                  placeholder='예: "언어로 문화의 장벽을 허물고, 세상을 탐구합니다."'
                  className="w-full p-2.5 rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-app)] text-sm font-serif focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">자기소개 및 포부 상세</label>
                <textarea
                  rows={4}
                  value={formData.profile.visionDescription}
                  onChange={e => handleProfileChange("visionDescription", e.target.value)}
                  placeholder="포트폴리오 대문 메인 화면에 들어갈 자기소개글을 적어주세요."
                  className="w-full p-2.5 rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-app)] text-sm leading-relaxed focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>
          )}

          {/* Step 2: 성적 및 어학 */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-[var(--text-primary)]">학기별 성적 점수 및 성취도</h3>
                <div className="space-y-3">
                  {formData.academicGrades.map((gradeItem, idx) => (
                    <div key={idx} className="p-3.5 border border-[var(--border-color)] rounded-[12px] bg-[var(--bg-app)] space-y-2">
                      <span className="font-semibold text-xs text-[var(--accent)]">{gradeItem.term}</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div>
                          <label className="block mb-0.5 text-[var(--text-muted)]">영어 점수(100만점)</label>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={gradeItem.englishScore}
                            onChange={e => {
                              const val = Number(e.target.value);
                              setFormData(prev => {
                                const copy = [...prev.academicGrades];
                                copy[idx].englishScore = val;
                                return { ...prev, academicGrades: copy };
                              });
                            }}
                            className="w-full p-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-card)]"
                          />
                        </div>
                        <div>
                          <label className="block mb-0.5 text-[var(--text-muted)]">국어 점수(100만점)</label>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={gradeItem.koreanScore}
                            onChange={e => {
                              const val = Number(e.target.value);
                              setFormData(prev => {
                                const copy = [...prev.academicGrades];
                                copy[idx].koreanScore = val;
                                return { ...prev, academicGrades: copy };
                              });
                            }}
                            className="w-full p-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-card)]"
                          />
                        </div>
                        <div>
                          <label className="block mb-0.5 text-[var(--text-muted)]">사회 점수(100만점)</label>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={gradeItem.socialScore}
                            onChange={e => {
                              const val = Number(e.target.value);
                              setFormData(prev => {
                                const copy = [...prev.academicGrades];
                                copy[idx].socialScore = val;
                                return { ...prev, academicGrades: copy };
                              });
                            }}
                            className="w-full p-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-card)]"
                          />
                        </div>
                        <div>
                          <label className="block mb-0.5 text-[var(--text-muted)]">학기 성취 요약</label>
                          <input
                            type="text"
                            value={gradeItem.achievement}
                            onChange={e => {
                              const val = e.target.value;
                              setFormData(prev => {
                                const copy = [...prev.academicGrades];
                                copy[idx].achievement = val;
                                return { ...prev, academicGrades: copy };
                              });
                            }}
                            className="w-full p-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-card)]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2 text-[var(--text-primary)]">어학 자격 / 인증 현황</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">영어 등급 / 자격</label>
                    <input
                      type="text"
                      value={formData.profile.englishLevel}
                      onChange={e => handleProfileChange("englishLevel", e.target.value)}
                      placeholder="예: Advanced (C1) 또는 토플 105점"
                      className="w-full p-2.5 rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-app)] text-sm focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">제2외국어 등급 / 자격</label>
                    <input
                      type="text"
                      value={formData.profile.spanishLevel}
                      onChange={e => handleProfileChange("spanishLevel", e.target.value)}
                      placeholder="예: DELE A1 또는 JLPT N3"
                      className="w-full p-2.5 rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-app)] text-sm focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 읽은 책 & 서평 */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">인문·사회·문학 독서 기록 목록</h3>
                <button
                  type="button"
                  onClick={handleAddBook}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 bg-[var(--accent)] text-white rounded-[8px] font-medium hover:bg-[var(--accent-hover)] transition-colors"
                >
                  <Plus size={14} /> 책 기록 추가하기
                </button>
              </div>

              {formData.bookLogs.map((book) => (
                <div key={book.id} className="p-4 border border-[var(--border-color)] rounded-[12px] bg-[var(--bg-app)] space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveBook(book.id)}
                    className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1"
                    title="책 삭제"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pr-8">
                    <div>
                      <label className="block mb-1 text-[var(--text-muted)]">책 제목 *</label>
                      <input
                        type="text"
                        required
                        value={book.title}
                        onChange={e => handleBookChange(book.id, "title", e.target.value)}
                        className="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--bg-card)] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-[var(--text-muted)]">저자 *</label>
                      <input
                        type="text"
                        required
                        value={book.author}
                        onChange={e => handleBookChange(book.id, "author", e.target.value)}
                        className="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--bg-card)] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-[var(--text-muted)]">분야 카테고리</label>
                      <select
                        value={book.category}
                        onChange={e => handleBookChange(book.id, "category", e.target.value)}
                        className="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--bg-card)] text-sm"
                      >
                        <option value="humanity">인문학 / 철학</option>
                        <option value="society">사회과학 / 역사</option>
                        <option value="literature">문학 / 문화</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs mb-1 text-[var(--text-muted)]">서평 및 느낀점 *</label>
                    <textarea
                      rows={3}
                      required
                      value={book.review}
                      onChange={e => handleBookChange(book.id, "review", e.target.value)}
                      className="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--bg-card)] text-sm leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 4: 탐구 보고서 */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">학술 탐구 보고서 목록</h3>
                <button
                  type="button"
                  onClick={handleAddReport}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 bg-[var(--accent)] text-white rounded-[8px] font-medium hover:bg-[var(--accent-hover)] transition-colors"
                >
                  <Plus size={14} /> 보고서 추가하기
                </button>
              </div>

              {formData.researchReports.map((report) => (
                <div key={report.id} className="p-4 border border-[var(--border-color)] rounded-[12px] bg-[var(--bg-app)] space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveReport(report.id)}
                    className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1"
                    title="보고서 삭제"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pr-8">
                    <div className="sm:col-span-2">
                      <label className="block mb-1 text-[var(--text-muted)]">보고서 제목 *</label>
                      <input
                        type="text"
                        required
                        value={report.title}
                        onChange={e => {
                          const val = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            researchReports: prev.researchReports.map(r => r.id === report.id ? { ...r, title: val } : r)
                          }));
                        }}
                        className="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--bg-card)] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-[var(--text-muted)]">태그 분야</label>
                      <input
                        type="text"
                        value={report.tag}
                        onChange={e => {
                          const val = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            researchReports: prev.researchReports.map(r => r.id === report.id ? { ...r, tag: val } : r)
                          }));
                        }}
                        placeholder="예: 사회과학"
                        className="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--bg-card)] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs mb-1 text-[var(--text-muted)]">연구 초록 (Abstract - 클릭 시 팝업 내용)</label>
                    <textarea
                      rows={3}
                      value={report.abstract}
                      onChange={e => {
                        const val = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          researchReports: prev.researchReports.map(r => r.id === report.id ? { ...r, abstract: val } : r)
                        }));
                      }}
                      className="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--bg-card)] text-sm leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 하단 푸터 버튼 조작 */}
          <div className="pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors"
            >
              <RotateCcw size={14} /> 기본 샘플 데이터로 복원
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-[10px] border border-[var(--border-color)] hover:bg-[var(--bg-app)] transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 text-sm rounded-[10px] bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent-hover)] shadow-md transition-all"
              >
                <Check size={16} /> 내 포트폴리오 저장하기
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
