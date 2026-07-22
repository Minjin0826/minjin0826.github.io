"use client";

import React from "react";
import { Line, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";

// Chart.js 필수 구성 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

interface GradeChartsProps {
  isDarkMode: boolean;
}

export default function GradeCharts({ isDarkMode }: GradeChartsProps) {
  // 테마별 색상 설정
  const textColor = isDarkMode ? "#e6e8f2" : "#2d3142";
  const gridColor = isDarkMode ? "#262733" : "#e6e8f2";

  // 1. 라인 차트 설정 (주요 과목 점수 추이)
  const lineData = {
    labels: ["2학년 1학기", "2학년 2학기", "3학년 1학기"],
    datasets: [
      {
        label: "영어",
        data: [96, 98, 100],
        borderColor: "#8a84e2",
        backgroundColor: "rgba(138, 132, 226, 0.1)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "국어",
        data: [92, 95, 98],
        borderColor: "#5ce4c3",
        backgroundColor: "rgba(92, 228, 195, 0.1)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "역사/사회",
        data: [94, 94, 97],
        borderColor: "#ffaa60",
        backgroundColor: "rgba(255, 170, 96, 0.1)",
        tension: 0.3,
        fill: true,
      }
    ]
  };

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
          font: { family: "'Pretendard', sans-serif" }
        }
      }
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { 
          color: textColor,
          font: { family: "'Pretendard', sans-serif" }
        }
      },
      y: {
        min: 80,
        max: 100,
        grid: { color: gridColor },
        ticks: { 
          color: textColor,
          font: { family: "'Pretendard', sans-serif" }
        }
      }
    }
  };

  // 2. 레이더 차트 설정 (핵심 역량 분석)
  const radarData = {
    labels: ["어학독해", "문학소양", "비판독해", "언어소통", "논리토론", "사회분석"],
    datasets: [{
      label: "내 역량 지수",
      data: [95, 88, 92, 90, 94, 86],
      backgroundColor: "rgba(138, 132, 226, 0.2)",
      borderColor: "#8a84e2",
      pointBackgroundColor: "#8a84e2",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#8a84e2"
    }]
  };

  const radarOptions: ChartOptions<"radar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      r: {
        grid: { color: gridColor },
        angleLines: { color: gridColor },
        pointLabels: {
          color: textColor,
          font: { 
            family: "'Pretendard', sans-serif",
            size: 11, 
            weight: 600 
          }
        },
        ticks: {
          display: false,
          stepSize: 20
        },
        min: 0,
        max: 100
      }
    }
  };

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      
      {/* 꺾은선 차트 카드 */}
      <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[16px] p-6 shadow-[var(--shadow-sm)] hover:translate-y-[-4px] hover:shadow-[var(--shadow-md)] hover:border-[rgba(var(--accent-rgb),0.3)] transition-all duration-400">
        <h4 className="text-[1.15rem] font-semibold text-[var(--text-primary)] mb-5 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] inline-block"></span>
          학기별 주요 과목 점수 추이
        </h4>
        <div className="relative w-full h-[250px]">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* 레이더 차트 카드 */}
      <div className="card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[16px] p-6 shadow-[var(--shadow-sm)] hover:translate-y-[-4px] hover:shadow-[var(--shadow-md)] hover:border-[rgba(var(--accent-rgb),0.3)] transition-all duration-400">
        <h4 className="text-[1.15rem] font-semibold text-[var(--text-primary)] mb-5 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] inline-block"></span>
          인문사회/어학 핵심 역량 방사형 분석
        </h4>
        <div className="relative w-full h-[250px]">
          <Radar data={radarData} options={radarOptions} />
        </div>
      </div>

    </div>
  );
}
