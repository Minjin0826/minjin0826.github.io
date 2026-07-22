"use client";

import React, { useState } from "react";
import { Rotate3d } from "lucide-react";
import { InterviewQnA } from "../types/portfolio";

interface InterviewCardsProps {
  qnAs: InterviewQnA[];
}

export default function InterviewCards({ qnAs }: InterviewCardsProps) {
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-10 print:block">
      {qnAs.map(card => {
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
