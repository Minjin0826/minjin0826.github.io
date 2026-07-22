"use client";

import React, { useState } from "react";
import { Rotate3d } from "lucide-react";

interface QuestionCard {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const interviewData: QuestionCard[] = [
  {
    id: 1,
    category: "Q1. 지원 동기",
    question: "외국어고 / 국제고를 선택한 결정적인 계기는?",
    answer: "중학교 시절 다문화 멘토링과 영자 신문반 활동을 통해 언어가 단순한 소통 도구가 아닌 문화를 잇는 매개체임을 깨달았습니다. 외고/국제고의 특화된 인문·사회과학 융합 커리큘럼을 통해 글로벌 의제를 깊이 탐구하고 싶어 지원했습니다."
  },
  {
    id: 2,
    category: "Q2. 자기주도학습",
    question: "본인만의 자기주도학습 노하우는 무엇인가요?",
    answer: "'탐구 연계식 학습법'입니다. 교과 시간에 의문이 생긴 주제(예: 인공지능과 정보 민주주의)에 대해 교재에 머무르지 않고 관련 전문 서적을 찾아 독서하고 소논문 형식의 보고서를 작성하며 깊이 있게 확장해 나갔습니다."
  },
  {
    id: 3,
    category: "Q3. 인성 및 소통",
    question: "동아리나 교내 갈등 상황을 극복한 사례가 있나요?",
    answer: "영자 신문반 부장으로 특집 기사 번역 중 발생한 번역 의견 차이를 해결한 경험이 있습니다. 다수결 대신 각 주장의 사전적 맥락과 문화를 비교하는 대조 표를 작성하여 부원들을 설득했고, 전원 합의를 도출해 소통과 리더십을 발휘했습니다."
  }
];

export default function InterviewCards() {
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-10 print:block">
      {interviewData.map(card => {
        const isFlipped = !!flippedCards[card.id];
        
        return (
          <div 
            key={card.id} 
            className="perspective-1000 h-[220px] cursor-pointer print:h-auto print:mb-4"
            onClick={() => toggleFlip(card.id)}
          >
            <div 
              className={`relative w-full h-full text-center transition-transform duration-600 preserve-3d print:transform-none print:h-auto ${
                isFlipped ? "rotate-y-180 flipped" : ""
              }`}
            >
              
              {/* 앞면 카드 */}
              <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col justify-between p-6 border border-[var(--border-color)] bg-[var(--bg-card)] rounded-[16px] shadow-[var(--shadow-sm)] hover:translate-y-[-4px] hover:shadow-[var(--shadow-md)] hover:border-[rgba(var(--accent-rgb),0.3)] transition-all duration-400 text-left print:relative print:block print:border-[#999] print:shadow-none print:bg-white print:mb-2 print:h-auto">
                <span className="self-start text-[0.72rem] font-bold text-[var(--accent)] uppercase bg-[var(--bg-app)] px-2 py-1 rounded-[4px] print:bg-none print:border print:border-gray-400">
                  {card.category}
                </span>
                <h4 className="font-serif text-[1.1rem] font-semibold text-[var(--text-primary)] leading-[1.45] flex-1 flex items-center print:block print:my-2">
                  {card.question}
                </h4>
                <div className="text-[0.75rem] text-[var(--text-muted)] flex items-center gap-1.5 mt-2.5 print:hidden">
                  <Rotate3d size={14} className="text-[var(--accent)]" />
                  클릭해서 답변 보기
                </div>
              </div>

              {/* 뒷면 카드 */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col justify-between p-6 border border-[rgba(var(--accent-rgb),0.3)] bg-[var(--accent-light)] rounded-[16px] text-left print:relative print:transform-none print:block print:border-[#999] print:bg-[#f7f7f7] print:h-auto">
                <h4 className="text-[0.95rem] font-bold text-[var(--accent)] mb-2">
                  [답변 핵심 전략]
                </h4>
                <p className="text-[0.85rem] leading-relaxed text-[var(--text-primary)] flex-1 print:block">
                  {card.answer}
                </p>
                <div className="text-[0.75rem] text-[var(--text-muted)] flex items-center gap-1.5 mt-2.5 print:hidden">
                  <Rotate3d size={14} className="text-[var(--accent)]" />
                  클릭해서 질문 보기
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
