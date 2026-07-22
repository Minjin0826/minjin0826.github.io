"use client";

import React, { useState, useEffect } from "react";
import { 
  GraduationCap, 
  Home, 
  Award, 
  BookOpen, 
  Compass, 
  Bookmark, 
  Milestone, 
  Moon, 
  Sun, 
  Download, 
  User, 
  Languages, 
  SearchCode, 
  MessageSquare, 
  LineChart, 
  Globe, 
  Calendar, 
  ChevronRight,
  Edit3
} from "lucide-react";

import GradeCharts from "./components/GradeCharts";
import InterviewCards from "./components/InterviewCards";
import ResearchModal from "./components/ResearchModal";
import PortfolioEditorModal from "./components/PortfolioEditorModal";
import { PortfolioData, ResearchReport } from "./types/portfolio";
import { defaultPortfolioData } from "./data/defaultPortfolio";

const LOCAL_STORAGE_KEY = "user_portfolio_data_v1";

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [selectedResearch, setSelectedResearch] = useState<ResearchReport | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [bookFilter, setBookFilter] = useState<string>("all");

  // 전체 포트폴리오 동적 데이터 상태
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // 1. 마운트 시 localStorage 데이터 복원
  useEffect(() => {
    setIsMounted(true);
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setPortfolioData(parsed);
      } catch {
        setPortfolioData(defaultPortfolioData);
      }
    }

    // 테마 설정
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.body.classList.add("dark-mode");
      setIsDarkMode(true);
    }
  }, []);

  // 2. 포트폴리오 저장 핸들러
  const handleSavePortfolio = (newData: PortfolioData) => {
    setPortfolioData(newData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
  };

  // 3. 포트폴리오 리셋 핸들러
  const handleResetPortfolio = () => {
    if (confirm("정말 기본 샘플 데이터로 복원하시겠습니까? 입력하신 내용이 초기화됩니다.")) {
      setPortfolioData(defaultPortfolioData);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setIsEditorOpen(false);
    }
  };

  // 4. 다크 모드 토글
  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  // 5. PDF 출력
  const handlePrint = () => {
    window.print();
  };

  // 6. 연구 보고서 모달
  const openModal = (research: ResearchReport) => {
    setSelectedResearch(research);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResearch(null);
  };

  if (!isMounted) return null;

  const { profile, academicGrades, languageActivities, competencyRadar, researchReports, coActivities, bookLogs, roadmapSteps, interviewQnAs } = portfolioData;

  // 독서 데이터 필터링
  const filteredBooks = bookFilter === "all" 
    ? bookLogs 
    : bookLogs.filter(book => book.category === bookFilter);

  return (
    <>
      {/* 배경 장식 요소 */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <div className="app-container flex min-h-screen relative z-10">
        
        {/* 사이드바 영역 */}
        <aside className="sidebar w-[280px] bg-[var(--bg-sidebar)] border-r border-[var(--border-color)] p-10 flex flex-col fixed h-screen z-10 transition-all duration-400 max-[992px]:w-full max-[992px]:h-auto max-[992px]:relative max-[992px]:border-r-0 max-[992px]:border-b max-[992px]:p-6 print:hidden">
          
          <div className="sidebar-header flex flex-col items-center text-center mb-6 max-[992px]:flex-row max-[992px]:gap-4 max-[992px]:mb-4 max-[992px]:text-left">
            <div className="profile-avatar w-20 h-20 rounded-[16px] bg-[var(--accent-light)] flex items-center justify-center mb-4 shadow-[var(--shadow-sm)] max-[992px]:mb-0 max-[992px]:w-[60px] max-[992px]:h-[60px]">
              <GraduationCap size={40} className="text-[var(--accent)] max-[992px]:w-[30px] max-[992px]:h-[30px]" />
            </div>
            <div className="profile-info">
              <h2 className="font-serif font-bold text-[1.35rem] text-[var(--text-primary)] mb-1.5">{profile.name}</h2>
              <p className="text-[0.85rem] text-[var(--text-muted)] font-medium">{profile.targetSchool}</p>
            </div>
          </div>

          {/* 내 정보 직접 수정 버튼 */}
          <button
            onClick={() => setIsEditorOpen(true)}
            className="w-full mb-6 py-2.5 px-3 rounded-[12px] bg-[var(--accent-light)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[rgba(var(--accent-rgb),0.3)] transition-all shadow-sm"
          >
            <Edit3 size={16} /> ✏️ 내 포트폴리오 수정하기
          </button>

          <nav className="sidebar-nav flex flex-col gap-2 flex-1 max-[992px]:flex-row max-[992px]:overflow-x-auto max-[992px]:pb-2 max-[992px]:gap-1.5 max-[992px]:flex-none">
            <button 
              className={`nav-btn flex items-center gap-3 px-4 py-3.5 bg-transparent border-0 rounded-[16px] text-[var(--text-secondary)] text-[0.95rem] font-medium cursor-pointer text-left transition-all duration-200 hover:bg-[var(--bg-app)] hover:text-[var(--accent)] max-[992px]:px-3.5 max-[992px]:py-2.5 max-[992px]:text-[0.85rem] max-[992px]:rounded-[8px] max-[992px]:whitespace-nowrap ${activeTab === "home" ? "active bg-[var(--accent-light)]! text-[var(--accent)]! font-semibold" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              <Home size={20} />
              <span>홈 / 자기소개</span>
            </button>
            <button 
              className={`nav-btn flex items-center gap-3 px-4 py-3.5 bg-transparent border-0 rounded-[16px] text-[var(--text-secondary)] text-[0.95rem] font-medium cursor-pointer text-left transition-all duration-200 hover:bg-[var(--bg-app)] hover:text-[var(--accent)] max-[992px]:px-3.5 max-[992px]:py-2.5 max-[992px]:text-[0.85rem] max-[992px]:rounded-[8px] max-[992px]:whitespace-nowrap ${activeTab === "academic" ? "active bg-[var(--accent-light)]! text-[var(--accent)]! font-semibold" : ""}`}
              onClick={() => setActiveTab("academic")}
            >
              <Award size={20} />
              <span>교과 / 어학 성취</span>
            </button>
            <button 
              className={`nav-btn flex items-center gap-3 px-4 py-3.5 bg-transparent border-0 rounded-[16px] text-[var(--text-secondary)] text-[0.95rem] font-medium cursor-pointer text-left transition-all duration-200 hover:bg-[var(--bg-app)] hover:text-[var(--accent)] max-[992px]:px-3.5 max-[992px]:py-2.5 max-[992px]:text-[0.85rem] max-[992px]:rounded-[8px] max-[992px]:whitespace-nowrap ${activeTab === "research" ? "active bg-[var(--accent-light)]! text-[var(--accent)]! font-semibold" : ""}`}
              onClick={() => setActiveTab("research")}
            >
              <BookOpen size={20} />
              <span>학술 탐구 보고서</span>
            </button>
            <button 
              className={`nav-btn flex items-center gap-3 px-4 py-3.5 bg-transparent border-0 rounded-[16px] text-[var(--text-secondary)] text-[0.95rem] font-medium cursor-pointer text-left transition-all duration-200 hover:bg-[var(--bg-app)] hover:text-[var(--accent)] max-[992px]:px-3.5 max-[992px]:py-2.5 max-[992px]:text-[0.85rem] max-[992px]:rounded-[8px] max-[992px]:whitespace-nowrap ${activeTab === "activities" ? "active bg-[var(--accent-light)]! text-[var(--accent)]! font-semibold" : ""}`}
              onClick={() => setActiveTab("activities")}
            >
              <Compass size={20} />
              <span>창의적 체험활동</span>
            </button>
            <button 
              className={`nav-btn flex items-center gap-3 px-4 py-3.5 bg-transparent border-0 rounded-[16px] text-[var(--text-secondary)] text-[0.95rem] font-medium cursor-pointer text-left transition-all duration-200 hover:bg-[var(--bg-app)] hover:text-[var(--accent)] max-[992px]:px-3.5 max-[992px]:py-2.5 max-[992px]:text-[0.85rem] max-[992px]:rounded-[8px] max-[992px]:whitespace-nowrap ${activeTab === "reading" ? "active bg-[var(--accent-light)]! text-[var(--accent)]! font-semibold" : ""}`}
              onClick={() => setActiveTab("reading")}
            >
              <Bookmark size={20} />
              <span>서평 및 독서 기록</span>
            </button>
            <button 
              className={`nav-btn flex items-center gap-3 px-4 py-3.5 bg-transparent border-0 rounded-[16px] text-[var(--text-secondary)] text-[0.95rem] font-medium cursor-pointer text-left transition-all duration-200 hover:bg-[var(--bg-app)] hover:text-[var(--accent)] max-[992px]:px-3.5 max-[992px]:py-2.5 max-[992px]:text-[0.85rem] max-[992px]:rounded-[8px] max-[992px]:whitespace-nowrap ${activeTab === "roadmap" ? "active bg-[var(--accent-light)]! text-[var(--accent)]! font-semibold" : ""}`}
              onClick={() => setActiveTab("roadmap")}
            >
              <Milestone size={20} />
              <span>입학 후 로드맵</span>
            </button>
          </nav>

          <div className="sidebar-footer mt-auto border-t border-[var(--border-color)] pt-5 flex flex-col gap-2.5 max-[992px]:flex-row max-[992px]:border-t-0 max-[992px]:pt-2.5 max-[992px]:w-full">
            <button 
              onClick={handlePrint}
              className="pdf-export-btn w-full flex items-center justify-center gap-2.5 p-3 border-0 rounded-[16px] bg-[var(--accent)] text-white text-[0.9rem] font-semibold cursor-pointer shadow-[0_4_12_rgba(138,132,226,0.2)] hover:bg-[var(--accent-hover)] hover:shadow-[0_6_16_rgba(138,132,226,0.3)] transition-all duration-200 max-[992px]:flex-1"
              aria-label="PDF 다운로드"
            >
              <Download size={18} />
              <span>PDF 포트폴리오 저장</span>
            </button>

            <button 
              onClick={toggleTheme}
              className="theme-toggle-btn w-full flex items-center justify-center gap-2.5 p-3 border border-[var(--border-color)] rounded-[16px] bg-[var(--bg-card)] text-[var(--text-secondary)] text-[0.9rem] font-medium cursor-pointer hover:bg-[var(--accent-light)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 max-[992px]:flex-1"
              aria-label="테마 전환"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>{isDarkMode ? "라이트 모드" : "다크 모드"}</span>
            </button>
          </div>
        </aside>

        {/* 메인 콘텐츠 영역 */}
        <main className="main-content flex-1 ml-[280px] p-[60px_80px] min-h-screen transition-all duration-400 max-[1200px]:p-10 max-[992px]:ml-0 max-[992px]:p-[30px_20px] print:ml-0 print:p-0">
          
          {/* 1. 홈 / 자기소개 탭 */}
          <section id="home" className={`tab-content ${activeTab === "home" ? "active block" : "hidden"} print:block print:mb-10 print:break-after-page`}>
            <header className="section-header mb-12 flex justify-between items-start">
              <div>
                <span className="section-tag inline-block text-[0.8rem] font-bold uppercase tracking-wider text-[var(--accent)] mb-2">About Me</span>
                <h1 className="section-title font-serif text-[2.2rem] font-bold text-[var(--text-primary)] leading-[1.3] print:text-[24pt] print:border-b-2 print:border-black print:pb-2">글로벌 리더를 향한 시작</h1>
              </div>
              <button
                onClick={() => setIsEditorOpen(true)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-[10px] bg-[var(--accent-light)] text-[var(--accent)] border border-[rgba(var(--accent-rgb),0.3)] hover:bg-[var(--accent)] hover:text-white transition-all print:hidden"
              >
                <Edit3 size={14} /> 정보 수정
              </button>
            </header>

            <div className="intro-grid grid grid-cols-[1.6fr_1fr] gap-6 mb-6 max-[992px]:grid-cols-1 print:block">
              {/* 비전 카드 */}
              <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[16px] p-8 shadow-[var(--shadow-sm)] hover:translate-y-[-4px] hover:shadow-[var(--shadow-md)] hover:border-[rgba(var(--accent-rgb),0.3)] transition-all duration-400 flex flex-col justify-center bg-linear-to-br bg-gradient-to-br from-[var(--bg-card)] to-[var(--accent-light)] print:border-[#999] print:shadow-none print:bg-white print:mb-4">
                <h2 className="font-serif text-[1.6rem] font-semibold text-[var(--text-primary)] leading-[1.45] mb-5 print:text-[16pt]">
                  {profile.visionQuote}
                </h2>
                <p className="text-[1rem] text-[var(--text-secondary)] leading-[1.7]">
                  {profile.visionDescription}
                </p>
              </div>

              {/* 기본 프로필 카드 */}
              <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[16px] p-8 shadow-[var(--shadow-sm)] hover:translate-y-[-4px] hover:shadow-[var(--shadow-md)] hover:border-[rgba(var(--accent-rgb),0.3)] transition-all duration-400 print:border-[#999] print:shadow-none print:bg-white">
                <h3 className="card-title text-[1.15rem] font-semibold text-[var(--text-primary)] mb-5 flex items-center gap-2">
                  <User className="text-[var(--accent)]" size={22} /> 기본 인적 정보
                </h3>
                <ul className="profile-list list-none flex flex-col gap-4">
                  <li className="text-[0.95rem] text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-3 print:pb-2">
                    <strong className="text-[var(--text-primary)] font-semibold inline-block w-[100px]">소속:</strong> {profile.currentSchool} {profile.grade}
                  </li>
                  <li className="text-[0.95rem] text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-3 print:pb-2">
                    <strong className="text-[var(--text-primary)] font-semibold inline-block w-[100px]">관심 분야:</strong> {profile.interests}
                  </li>
                  <li className="text-[0.95rem] text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)] font-semibold inline-block w-[100px]">외국어 역량:</strong> 영어({profile.englishLevel}), 스페인어({profile.spanishLevel})
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="subsection-title font-serif text-[1.4rem] font-semibold text-[var(--text-primary)] my-12 border-l-4 border-[var(--accent)] pl-3 print:text-[16pt] print:border-l-6 print:border-black">핵심 역량 키워드</h3>
            <div className="card-grid grid grid-cols-3 gap-6 mb-10 max-[640px]:grid-cols-1 print:grid-cols-3">
              <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[16px] p-8 shadow-[var(--shadow-sm)] hover:translate-y-[-4px] hover:shadow-[var(--shadow-md)] hover:border-[rgba(var(--accent-rgb),0.3)] transition-all duration-400 text-center p-[36px_24px] print:border-[#999] print:shadow-none print:bg-white">
                <div className="value-icon w-[60px] h-[60px] rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mx-auto mb-5 shadow-[var(--shadow-sm)] print:border print:border-gray-300">
                  <Languages size={28} />
                </div>
                <h4 className="font-serif text-[1.15rem] font-semibold text-[var(--text-primary)] mb-3">융합적 어학 역량</h4>
                <p className="text-[0.9rem] text-[var(--text-secondary)] leading-[1.6]">다양한 어문 자료를 다국어로 독해하고 분석하며, 문화적 맥락을 깊이 이해하려 노력합니다.</p>
              </div>
              <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[16px] p-8 shadow-[var(--shadow-sm)] hover:translate-y-[-4px] hover:shadow-[var(--shadow-md)] hover:border-[rgba(var(--accent-rgb),0.3)] transition-all duration-400 text-center p-[36px_24px] print:border-[#999] print:shadow-none print:bg-white">
                <div className="value-icon w-[60px] h-[60px] rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mx-auto mb-5 shadow-[var(--shadow-sm)] print:border print:border-gray-300">
                  <SearchCode size={28} />
                </div>
                <h4 className="font-serif text-[1.15rem] font-semibold text-[var(--text-primary)] mb-3">비판적 사회 분석</h4>
                <p className="text-[0.9rem] text-[var(--text-secondary)] leading-[1.6]">사회 현상과 국제 분쟁 등의 의제를 단순화하지 않고 역사적, 경제적 관점에서 분석합니다.</p>
              </div>
              <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[16px] p-8 shadow-[var(--shadow-sm)] hover:translate-y-[-4px] hover:shadow-[var(--shadow-md)] hover:border-[rgba(var(--accent-rgb),0.3)] transition-all duration-400 text-center p-[36px_24px] print:border-[#999] print:shadow-none print:bg-white">
                <div className="value-icon w-[60px] h-[60px] rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mx-auto mb-5 shadow-[var(--shadow-sm)] print:border print:border-gray-300">
                  <MessageSquare size={28} />
                </div>
                <h4 className="font-serif text-[1.15rem] font-semibold text-[var(--text-primary)] mb-3">협동과 포용의 소통</h4>
                <p className="text-[0.9rem] text-[var(--text-secondary)] leading-[1.6]">토론을 통해 타인의 의견을 존중하며 건설적인 대안을 찾아내는 소통 능력을 갖추었습니다.</p>
              </div>
            </div>
          </section>

          {/* 2. 교과 / 어학 성취 탭 */}
          <section id="academic" className={`tab-content ${activeTab === "academic" ? "active block" : "hidden"} print:block print:mb-10 print:break-after-page`}>
            <header className="section-header mb-12">
              <span className="section-tag inline-block text-[0.8rem] font-bold uppercase tracking-wider text-[var(--accent)] mb-2">Academic & Language</span>
              <h1 className="section-title font-serif text-[2.2rem] font-bold text-[var(--text-primary)] leading-[1.3] print:text-[24pt] print:border-b-2 print:border-black print:pb-2">학업 성취 및 어학 역량</h1>
            </header>

            <div className="academic-grid grid grid-cols-[1.4fr_1fr] gap-6 max-[992px]:grid-cols-1 print:block">
              {/* 성적 테이블 */}
              <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[16px] p-8 shadow-[var(--shadow-sm)] hover:translate-y-[-4px] hover:shadow-[var(--shadow-md)] hover:border-[rgba(var(--accent-rgb),0.3)] transition-all duration-400 print:border-[#999] print:shadow-none print:bg-white print:mb-4">
                <h3 className="card-title text-[1.15rem] font-semibold text-[var(--text-primary)] mb-5 flex items-center gap-2">
                  <LineChart className="text-[var(--accent)]" size={22} /> 주요 교과 성적 및 추이
                </h3>
                <div className="table-container overflow-x-auto mt-2.5">
                  <table className="academic-table w-full border-collapse text-left">
                    <thead>
                      <tr>
                        <th className="p-4 border-b border-[var(--border-color)] text-[0.95rem] font-semibold text-[var(--text-secondary)] bg-[var(--bg-app)] print:bg-[#e0e0e0] print:border-b-2 print:border-black">학기</th>
                        <th className="p-4 border-b border-[var(--border-color)] text-[0.95rem] font-semibold text-[var(--text-secondary)] bg-[var(--bg-app)] print:bg-[#e0e0e0] print:border-b-2 print:border-black">영어</th>
                        <th className="p-4 border-b border-[var(--border-color)] text-[0.95rem] font-semibold text-[var(--text-secondary)] bg-[var(--bg-app)] print:bg-[#e0e0e0] print:border-b-2 print:border-black">국어</th>
                        <th className="p-4 border-b border-[var(--border-color)] text-[0.95rem] font-semibold text-[var(--text-secondary)] bg-[var(--bg-app)] print:bg-[#e0e0e0] print:border-b-2 print:border-black">역사/사회</th>
                        <th className="p-4 border-b border-[var(--border-color)] text-[0.95rem] font-semibold text-[var(--text-secondary)] bg-[var(--bg-app)] print:bg-[#e0e0e0] print:border-b-2 print:border-black">성취도</th>
                      </tr>
                    </thead>
                    <tbody>
                      {academicGrades.map((g, i) => (
                        <tr key={i} className="hover:bg-[rgba(var(--accent-rgb),0.02)]">
                          <td className="p-4 border-b border-[var(--border-color)] text-[0.95rem] text-[var(--text-primary)] print:border-b-[#ccc]">{g.term}</td>
                          <td className="p-4 border-b border-[var(--border-color)] text-[0.95rem] text-[var(--text-primary)] print:border-b-[#ccc]">{g.english}</td>
                          <td className="p-4 border-b border-[var(--border-color)] text-[0.95rem] text-[var(--text-primary)] print:border-b-[#ccc]">{g.korean}</td>
                          <td className="p-4 border-b border-[var(--border-color)] text-[0.95rem] text-[var(--text-primary)] print:border-b-[#ccc]">{g.social}</td>
                          <td className="p-4 border-b border-[var(--border-color)] text-[0.95rem] text-[var(--text-primary)] print:border-b-[#ccc]">{g.achievement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[0.8rem] text-[var(--text-muted)] mt-4">* 주요 인문사회 및 어학 교과군 성취도 위주 기재</p>
              </div>

              {/* 어학 카드 */}
              <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[16px] p-8 shadow-[var(--shadow-sm)] hover:translate-y-[-4px] hover:shadow-[var(--shadow-md)] hover:border-[rgba(var(--accent-rgb),0.3)] transition-all duration-400 print:border-[#999] print:shadow-none print:bg-white">
                <h3 className="card-title text-[1.15rem] font-semibold text-[var(--text-primary)] mb-5 flex items-center gap-2">
                  <Globe className="text-[var(--accent)]" size={22} /> 공인 어학 및 교내 어학 활동
                </h3>
                <div className="language-badges flex flex-wrap gap-3 mb-6">
                  <div className="lang-badge flex-1 min-w-[120px] p-4 bg-[var(--accent-light)] rounded-[8px] flex flex-col items-center text-center border border-[rgba(var(--accent-rgb),0.1)] print:bg-[#f0f0f0] print:border-[#ccc]">
                    <span className="text-[0.8rem] uppercase text-[var(--text-muted)] font-semibold mb-1">English</span>
                    <span className="text-[1.05rem] text-[var(--accent)] font-bold">{profile.englishLevel}</span>
                  </div>
                  <div className="lang-badge flex-1 min-w-[120px] p-4 bg-[var(--accent-light)] rounded-[8px] flex flex-col items-center text-center border border-[rgba(var(--accent-rgb),0.1)] print:bg-[#f0f0f0] print:border-[#ccc]">
                    <span className="text-[0.8rem] uppercase text-[var(--text-muted)] font-semibold mb-1">2nd Foreign</span>
                    <span className="text-[1.05rem] text-[var(--accent)] font-bold">{profile.spanishLevel}</span>
                  </div>
                </div>
                <ul className="activity-bullets list-none flex flex-col gap-3">
                  {languageActivities.map(act => (
                    <li key={act.id} className="text-[0.9rem] text-[var(--text-secondary)] leading-[1.5] relative pl-5 before:content-[''] before:absolute before:left-1.5 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--accent)]">
                      {act.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h3 className="subsection-title font-serif text-[1.4rem] font-semibold text-[var(--text-primary)] my-12 border-l-4 border-[var(--accent)] pl-3 print:text-[16pt] print:border-l-6 print:border-black">학업 성취 시각화</h3>
            {/* 차트 컴포넌트 */}
            <div className="print:block">
              <GradeCharts 
                isDarkMode={isDarkMode} 
                academicGrades={academicGrades}
                competencyRadar={competencyRadar}
              />
            </div>
          </section>

          {/* 3. 학술 탐구 보고서 탭 */}
          <section id="research" className={`tab-content ${activeTab === "research" ? "active block" : "hidden"} print:block print:mb-10 print:break-after-page`}>
            <header className="section-header mb-12">
              <span className="section-tag inline-block text-[0.8rem] font-bold uppercase tracking-wider text-[var(--accent)] mb-2">Research Reports</span>
              <h1 className="section-title font-serif text-[2.2rem] font-bold text-[var(--text-primary)] leading-[1.3] print:text-[24pt] print:border-b-2 print:border-black print:pb-2">학술 탐구 보고서</h1>
              <p className="section-subtitle text-[1rem] text-[var(--text-secondary)] mt-2.5 max-w-[700px] leading-[1.6]">
                교과 활동 중 의문점을 가지고 깊이 탐색하여 작성한 소논문 및 연구 보고서입니다. (카드를 클릭하면 초록을 볼 수 있습니다)
              </p>
            </header>

            <div className="card-grid grid grid-cols-2 gap-6 mb-10 max-[640px]:grid-cols-1 print:grid-cols-1">
              {researchReports.map((research) => (
                <div 
                  key={research.id}
                  className="card research-card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[16px] p-8 shadow-[var(--shadow-sm)] hover:translate-y-[-4px] hover:shadow-[var(--shadow-md)] hover:border-[rgba(var(--accent-rgb),0.3)] transition-all duration-400 cursor-pointer flex flex-col h-full print:border-[#999] print:shadow-none print:bg-white print:mb-4"
                  onClick={() => openModal(research)}
                >
                  <span className="research-tag self-start text-[0.75rem] font-semibold px-2.5 py-1 bg-[var(--accent-light)] text-[var(--accent)] rounded-[50px] mb-4 print:border print:border-gray-300">
                    {research.tag}
                  </span>
                  <h3 className="research-card-title font-serif text-[1.25rem] font-semibold text-[var(--text-primary)] leading-[1.45] mb-3 print:text-[14pt]">
                    {research.title}
                  </h3>
                  <p className="research-preview text-[0.9rem] text-[var(--text-secondary)] leading-[1.6] flex-1">
                    {research.preview}
                  </p>
                  <div className="research-footer mt-6 pt-4 border-t border-[var(--border-color)] flex justify-between items-center print:border-t-0">
                    <span className="research-date text-[0.8rem] text-[var(--text-muted)] flex items-center gap-1.5">
                      <Calendar size={14} /> {research.date}
                    </span>
                    <span className="read-more text-[0.85rem] font-semibold text-[var(--accent)] flex items-center gap-1 hover:text-[var(--accent-hover)] hover:translate-x-1 transition-all duration-200 print:hidden">
                      초록 읽기 <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. 창의체험 탭 */}
          <section id="activities" className={`tab-content ${activeTab === "activities" ? "active block" : "hidden"} print:block print:mb-10 print:break-after-page`}>
            <header className="section-header mb-12">
              <span className="section-tag inline-block text-[0.8rem] font-bold uppercase tracking-wider text-[var(--accent)] mb-2">Co-curricular Activities</span>
              <h1 className="section-title font-serif text-[2.2rem] font-bold text-[var(--text-primary)] leading-[1.3] print:text-[24pt] print:border-b-2 print:border-black print:pb-2">창의적 체험활동</h1>
            </header>

            <div className="timeline relative max-w-[800px] mx-auto pl-8 before:content-[''] before:absolute before:left-2 before:top-2.5 before:bottom-2.5 before:w-[2px] before:bg-[var(--border-color)] print:before:bg-[#ccc]">
              {coActivities.map((act) => (
                <div key={act.id} className="timeline-item relative mb-10 last:mb-0">
                  <div className="timeline-dot absolute left-[-32px] top-2.5 w-[18px] h-[18px] rounded-full bg-[var(--bg-app)] border-4 border-[var(--accent)] z-2 hover:bg-[var(--accent)] hover:shadow-[0_0_0_6px_var(--accent-light)] transition-all duration-400 print:border-[#999] print:bg-white" />
                  <div className="timeline-date text-[0.85rem] font-semibold text-[var(--accent)] mb-2">{act.date}</div>
                  <div className="timeline-content card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[16px] p-8 shadow-[var(--shadow-sm)] print:border-[#999] print:shadow-none print:bg-white">
                    <span className="activity-type text-[0.75rem] font-semibold text-[var(--text-muted)] uppercase mb-2 block">{act.type}</span>
                    <h3 className="activity-title font-serif text-[1.2rem] font-semibold text-[var(--text-primary)] mb-3 print:text-[13pt]">{act.title}</h3>
                    <p className="activity-desc text-[0.92rem] text-[var(--text-secondary)] leading-[1.65]">
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. 서평 및 독서 기록 탭 */}
          <section id="reading" className={`tab-content ${activeTab === "reading" ? "active block" : "hidden"} print:block print:mb-10 print:break-after-page`}>
            <header className="section-header mb-12">
              <span className="section-tag inline-block text-[0.8rem] font-bold uppercase tracking-wider text-[var(--accent)] mb-2">Reading Logs</span>
              <h1 className="section-title font-serif text-[2.2rem] font-bold text-[var(--text-primary)] leading-[1.3] print:text-[24pt] print:border-b-2 print:border-black print:pb-2">서평 및 독서 기록</h1>
              <p className="section-subtitle text-[1rem] text-[var(--text-secondary)] mt-2.5 max-w-[700px] leading-[1.6]">
                인문, 사회과학, 문화, 문학 등의 도서를 비판적으로 읽고 세계관을 넓혀 온 흔적입니다.
              </p>
            </header>

            {/* 필터 버튼 */}
            <div className="filter-container flex gap-2.5 mb-8 flex-wrap print:hidden">
              <button 
                className={`filter-btn px-5 py-2.5 border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] rounded-[50px] cursor-pointer text-[0.9rem] font-medium transition-all duration-200 hover:bg-[var(--accent-light)] hover:text-[var(--accent)] hover:border-[var(--accent)] ${bookFilter === "all" ? "active bg-[var(--accent)]! text-white! border-[var(--accent)]!" : ""}`}
                onClick={() => setBookFilter("all")}
              >
                전체보기 ({bookLogs.length})
              </button>
              <button 
                className={`filter-btn px-5 py-2.5 border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] rounded-[50px] cursor-pointer text-[0.9rem] font-medium transition-all duration-200 hover:bg-[var(--accent-light)] hover:text-[var(--accent)] hover:border-[var(--accent)] ${bookFilter === "humanity" ? "active bg-[var(--accent)]! text-white! border-[var(--accent)]!" : ""}`}
                onClick={() => setBookFilter("humanity")}
              >
                인문학 / 철학
              </button>
              <button 
                className={`filter-btn px-5 py-2.5 border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] rounded-[50px] cursor-pointer text-[0.9rem] font-medium transition-all duration-200 hover:bg-[var(--accent-light)] hover:text-[var(--accent)] hover:border-[var(--accent)] ${bookFilter === "society" ? "active bg-[var(--accent)]! text-white! border-[var(--accent)]!" : ""}`}
                onClick={() => setBookFilter("society")}
              >
                사회과학 / 역사
              </button>
              <button 
                className={`filter-btn px-5 py-2.5 border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] rounded-[50px] cursor-pointer text-[0.9rem] font-medium transition-all duration-200 hover:bg-[var(--accent-light)] hover:text-[var(--accent)] hover:border-[var(--accent)] ${bookFilter === "literature" ? "active bg-[var(--accent)]! text-white! border-[var(--accent)]!" : ""}`}
                onClick={() => setBookFilter("literature")}
              >
                문학 / 문화
              </button>
            </div>

            <div className="reading-grid grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 print:grid-cols-1">
              {filteredBooks.map((book) => (
                <div 
                  key={book.id}
                  className="card reading-card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[16px] p-8 shadow-[var(--shadow-sm)] hover:translate-y-[-4px] hover:shadow-[var(--shadow-md)] hover:border-[rgba(var(--accent-rgb),0.3)] transition-all duration-400 flex flex-col print:border-[#999] print:shadow-none print:bg-white print:mb-4"
                >
                  <div className="reading-header border-b border-[var(--border-color)] pb-4 mb-4">
                    <span className={`reading-category inline-block text-[0.75rem] font-semibold px-2 py-1 rounded-[4px] mb-2.5 ${
                      book.category === "humanity" ? "bg-[#f3effc] text-[#6b40e3] dark:bg-[#2b1f54] dark:text-[#a78bfc]" : 
                      book.category === "society" ? "bg-[#eaf8f3] text-[#1a7f64] dark:bg-[#183d33] dark:text-[#5ce4c3]" : 
                      "bg-[#fff4ea] text-[#cf6200] dark:bg-[#422915] dark:text-[#ffaa60]"
                    } print:border print:border-gray-300 print:bg-none print:text-black`}>
                      {book.categoryKo}
                    </span>
                    <h3 className="book-title font-serif text-[1.15rem] font-semibold text-[var(--text-primary)] mb-1 print:text-[12pt]">{book.title}</h3>
                    <p className="book-author text-[0.82rem] text-[var(--text-muted)]">{book.author}</p>
                  </div>
                  <div className="reading-body text-[0.9rem] text-[var(--text-secondary)] leading-[1.6] flex-1">
                    <p>{book.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. 입학 후 로드맵 탭 */}
          <section id="roadmap" className={`tab-content ${activeTab === "roadmap" ? "active block" : "hidden"} print:block print:mb-10`}>
            <header className="section-header mb-12">
              <span className="section-tag inline-block text-[0.8rem] font-bold uppercase tracking-wider text-[var(--accent)] mb-2">Future Roadmap</span>
              <h1 className="section-title font-serif text-[2.2rem] font-bold text-[var(--text-primary)] leading-[1.3] print:text-[24pt] print:border-b-2 print:border-black print:pb-2">입학 후 학업 및 성장 로드맵</h1>
              <p className="section-subtitle text-[1rem] text-[var(--text-secondary)] mt-2.5 max-w-[700px] leading-[1.6]">
                합격 이후 고등학교 생활 3개년 동안의 자기계발 로드맵과 미래의 꿈을 구체화한 타임라인입니다.
              </p>
            </header>

            <div className="roadmap-container grid grid-cols-4 gap-5 mb-10 max-[1200px]:grid-cols-2 max-[640px]:grid-cols-1 print:grid-cols-2 print:gap-4 print:mb-4">
              {roadmapSteps.map((step) => (
                <div 
                  key={step.id}
                  className={`roadmap-card card border rounded-[16px] p-8 shadow-[var(--shadow-sm)] flex flex-col h-full print:border-[#999] print:shadow-none ${
                    step.gradeBadge === "최종 목표" 
                      ? "highlight-card border-[var(--accent)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--accent-light)] print:bg-[#f7f7f7]" 
                      : "border-[var(--border-color)] bg-[var(--bg-card)] print:bg-white"
                  }`}
                >
                  <span className={`roadmap-badge self-start text-[0.75rem] font-bold px-2.5 py-1 rounded-[8px] mb-5 uppercase print:border print:border-gray-300 ${
                    step.gradeBadge === "최종 목표" ? "bg-[var(--accent)] text-white" : "bg-[var(--accent-light)] text-[var(--accent)]"
                  }`}>
                    {step.gradeBadge}
                  </span>
                  <h3 className="roadmap-title font-serif text-[1.1rem] font-semibold text-[var(--text-primary)] mb-3 leading-[1.4] print:text-[11pt]">{step.title}</h3>
                  <p className="roadmap-text text-[0.88rem] text-[var(--text-secondary)] leading-[1.6]">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="subsection-title font-serif text-[1.4rem] font-semibold text-[var(--text-primary)] my-12 border-l-4 border-[var(--accent)] pl-3 print:text-[16pt] print:border-l-6 print:border-black">면접 대비 예상 질문 및 핵심 답변</h3>
            <p className="section-subtitle text-[1rem] text-[var(--text-secondary)] mt-[-10px] mb-8 leading-[1.6]">
              카드를 클릭하면 실제 면접관의 질문에 대비하는 키워드 답변 카드가 뒤집어집니다.
            </p>
            
            {/* 면접 플립 카드 컴포넌트 */}
            <div className="print:block">
              <InterviewCards qnAs={interviewQnAs} />
            </div>
          </section>

        </main>
      </div>

      {/* 탐구 보고서 상세 모달 */}
      <ResearchModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        data={selectedResearch}
      />

      {/* 내 정보 직접 수정 모달 */}
      <PortfolioEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        initialData={portfolioData}
        onSave={handleSavePortfolio}
        onReset={handleResetPortfolio}
      />
    </>
  );
}
