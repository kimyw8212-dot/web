# CoAsia Landing Page

Figma 시안(`node-id=1-2`)을 기반으로 구현한 Next.js + Tailwind 랜딩 페이지입니다.

## 실행 방법

Node.js 18+와 npm이 설치되어 있어야 합니다.

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다.

## 구조

- `src/components/layout` — Header, Footer
- `src/components/sections` — Hero, Intro, Technology, Business, Value, Partners, News
- `src/components/ui` — 버튼, 카드, 스텝 인디케이터 등
- `src/lib/content.ts` — 텍스트·섹션 데이터
- `public/images` — Figma에서 내려받은 이미지 에셋

## 반응형

- 모바일: 햄버거 메뉴, 세로 스택, Business 카드 가로 스크롤
- 태블릿/데스크톱: 그리드·2열 News·4열 Value pillars
