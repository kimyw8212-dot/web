"use client";

import { useRef, useState } from "react";
import {
  getContentMotionStyle,
  getSectionVisibility,
  useSectionScrollProgress,
} from "@/hooks/useSectionScrollProgress";
import { ModelViewer } from "@/components/about/ModelViewer";
import { PillArrowButton } from "@/components/ui/PillArrowButton";
import { scrollToSection } from "@/lib/scroll";

/** Figma 03_CONNECTIVITY 등 기술 소개 섹션 공통 레이아웃 (1920 기준) */
const FIGMA = {
  labelLeft: 105,
  labelTop: 176,
  stepSize: 48,
  titleSize: 64,
  titleGap: 19,
  groupRight: 46,
  groupBottom: 151,
  groupGap: 30,
  descSize: 32,
} as const;

type ModelBox = {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
};

type Rotation = {
  x: number;
  y: number;
};

type TechShowcaseSectionProps = {
  id: string;
  step: string;
  title: string;
  description: string[];
  model: string;
  modelBox: ModelBox;
  /** 피그마 목업의 구도를 반영한 모델 초기 회전값 (degrees) */
  initialRotation?: Rotation;
  nextSectionId?: string;
};

export function TechShowcaseSection({
  id,
  step,
  title,
  description,
  model,
  modelBox,
  initialRotation = { x: 0, y: 0 },
  nextSectionId,
}: TechShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionScrollProgress(sectionRef);
  const contentStyle = getContentMotionStyle(progress);
  const sectionFade = getSectionVisibility(progress);

  const ROTATE_SENSITIVITY = 0.4;
  const MAX_TILT = 40;

  const [rotateX, setRotateX] = useState(initialRotation.x);
  const [rotateY, setRotateY] = useState(initialRotation.y);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    setRotateY((prev) => prev + dx * ROTATE_SENSITIVITY);
    setRotateX((prev) => clamp(prev - dy * ROTATE_SENSITIVITY, -MAX_TILT, MAX_TILT));
    dragRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className="snap-section relative z-10 h-[100dvh] shrink-0 overflow-hidden bg-black text-white"
      style={{ opacity: sectionFade }}
    >
      <div className="relative mx-auto h-full w-full max-w-[1920px]" style={contentStyle}>
        <div
          className="absolute"
          style={{
            left: `clamp(1.5rem, ${(FIGMA.labelLeft / 1920) * 100}vw, ${FIGMA.labelLeft}px)`,
            top: `clamp(1.5rem, ${(FIGMA.labelTop / 1920) * 100}vw, ${FIGMA.labelTop}px)`,
          }}
        >
          <p style={{ fontSize: `clamp(1.25rem, ${(FIGMA.stepSize / 1920) * 100}vw, ${FIGMA.stepSize}px)` }}>
            {step}
          </p>
          <p
            className="font-bold"
            style={{
              marginTop: `clamp(0.5rem, ${(FIGMA.titleGap / 1920) * 100}vw, ${FIGMA.titleGap}px)`,
              fontSize: `clamp(1.75rem, ${(FIGMA.titleSize / 1920) * 100}vw, ${FIGMA.titleSize}px)`,
            }}
          >
            {title}
          </p>
        </div>

        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 touch-none select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{
            left: `${(modelBox.centerX / 1920) * 100}%`,
            top: `${(modelBox.centerY / 1080) * 100}%`,
            width: `clamp(220px, ${(modelBox.width / 1920) * 100}vw, ${modelBox.width}px)`,
            aspectRatio: `${modelBox.width} / ${modelBox.height}`,
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <ModelViewer
            src={model}
            rotation={[
              (rotateX * Math.PI) / 180,
              (rotateY * Math.PI) / 180,
              0,
            ]}
          />
        </div>

        <div
          className="absolute flex flex-col items-end"
          style={{
            right: `clamp(1.5rem, ${(FIGMA.groupRight / 1920) * 100}vw, ${FIGMA.groupRight}px)`,
            bottom: `clamp(1.5rem, ${(FIGMA.groupBottom / 1920) * 100}vw, ${FIGMA.groupBottom}px)`,
            gap: `clamp(1rem, ${(FIGMA.groupGap / 1920) * 100}vw, ${FIGMA.groupGap}px)`,
          }}
        >
          <PillArrowButton onClick={() => nextSectionId && scrollToSection(nextSectionId)} />
          <div
            className="text-right font-normal leading-normal"
            style={{ fontSize: `clamp(1rem, ${(FIGMA.descSize / 1920) * 100}vw, ${FIGMA.descSize}px)` }}
          >
            {description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
