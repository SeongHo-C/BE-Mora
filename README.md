<div align="center">

<!-- logo -->
<img src="https://github.com/SeongHo-C/BE-Mora/assets/83394485/dc79e88b-af52-492d-9a36-3814ba135437">


### 모여라레이서 (Moyeora-Racer)  
[<img src="https://img.shields.io/badge/프로젝트 기간-2023.05.29~2023.06.16-D6C9FF?style=flat&logoColor=white" />]()
<br />
[🧑🏻‍💻 사이트 바로가기](http://www.moyeora-racer.com/) 
</div> 

## 소개
<b>”저희는 엘리스 교육생 및 수료생들을 위한 커뮤니티 사이트를 구현합니다.”</b>

<br />

### 🧐 기획 의도
1. 레이서 전용 커뮤니티로 레이서들의 적극적 정보 공유와 소통 도움<br />
2. 캘린더와 알림으로 중요 일정 리마인드<br />
3. 커피챗을 통해 후배 기수는 선배 기수에게 개발 및 취업 정보 습득<br />
4. 커피챗을 통해 선배 기수는 멘토링 경험 습득과 친목 도모

<br />

## 📝 기능 정리

### 사용자 - 필수기능
• 비회원일 경우: 메뉴 접근 불가, 메뉴 접근시 로그인 창으로 이동
<br />
• 로그인 페이지: 로그인을 통해 레이서 전용 커뮤니티 이용하기
<br />
• 퀴즈 페이지: 레이서 전용 퀴즈로 회원가입 전 레이서 여부 판별하기
<br />
• 회원가입 페이지: Gmail, 비밀번호 양식 검증하기
<br />
• 마이 페이지: 사용자 정보 수정, 탈퇴 / 스킬, 경력, 교육, 링크 추가, 수정, 삭제 / 내 게시물 확인하기
<br />
• 메인 페이지: keyframe animation, 인기 게시글 조회
<br />
• 커뮤니티 페이지(토끼굴): 카테고리별 전체 게시글 및 추천 게시글 조회, 게시글 필터링 조회, 카테고리별 게시글 검색 및 검색결과 조회
<br />
• 게시글 등록 페이지: 카테고리 선택, 제목과 내용 및 이미지 등록, 이미지 미리보기 및 삭제
<br />
• 게시글 상세 페이지: 게시글 상세 조회, 게시글 수정 및 삭제, 좋아요 등록 및 취소, 댓글 등록 및 조회, 댓글 수정 및 삭제
<br />
• 공지사항, 일정 페이지: 엘리스 트랙의 공지사항과 전체 일정(캘린더) 조회
<br />
• 오픈프로필 페이지: 이용자의 오픈프로필을 올리기 내리기 가능, 다른 이용자가 올린 오픈프로필을 볼 수 있으며 이용자는 다른 이용자에게 커피챗 전송(이메일 전송)
<br />
• 전체 검색 페이지: 모든 카테고리 통합으로 전체 검색
<br />
• 알림모달: 중요 일정 1시간 전,  이용자가 올린 게시글에 댓글 달릴 경우 헤더에 알림이오며 알림 온 상세 내용은 알림 모달창에서 확인
<br />
<br />

### 관리자 - 필수기능
• 로그인/회원가입 페이지: 관리자 로그인/회원가입
<br />
• 게시물 관리 페이지: 게시물 검색, 조회, 삭제 / 게시물 댓글 삭제
<br />
• 사용자 관리 페이지: 사용자 검색, 조회, 등록, 수정, 삭제
<br />
• 공지사항 관리 페이지: 공지사항 검색, 조회, 등록, 수정, 삭제
<br />
• 일정 관리 페이지: 일정 검색, 조회, 등록, 수정, 삭제
<br />
• 트랙 관리 페이지: 트랙 검색, 조회, 등록, 수정, 삭제
<br />
<br />

## API 명세서
https://documenter.getpostman.com/view/27753347/2s93z9a1sW

<br />

## 🔗 프로젝트 구조

### Service Architecture
<img width="2733" alt="서비스 아키텍처" src="https://github.com/SeongHo-C/BE-Mora/assets/83394485/5949f4fb-e17d-4bf8-8eb9-b08fde7f6329">

<br />

### Service Flow
<img width="3112" alt="서비스 플로우" src="https://github.com/SeongHo-C/BE-Mora/assets/83394485/80980ff3-b000-401e-9c79-95ed5236b51f">

<br />

### Git Flow
<img width="2542" alt="깃 플로우" src="https://github.com/SeongHo-C/BE-Mora/assets/83394485/ad58e0e4-e414-40f3-929b-0121b82025bc">

<br />

## ⚙ 기술 스택
### Front-end
<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/React.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/ReactQuery.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/StyledComponents.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/JWT.png?raw=true" width="80">
</div>

### Back-end
<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/NodeJS.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/ExpressJS.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Mysql.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Sequelize.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/AWSEC2.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/AWSRDS.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Nginx.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/PM2.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/JWT.png?raw=true" width="80">
</div>

### Tools
<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Github.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/GitLab.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Notion.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Discord.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Figma.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Postman.png?raw=true" width="80">
</div>

<br />

## 💜 프로젝트 회고

<br />

## 😎 프로젝트 팀원

|Frontend|Frontend|Frontend|Frontend|Backend|Backend|Backend|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| ![](https://github.com/ziuss76.png?size=120)| ![](https://github.com/David9191.png?size=120) | ![](https://github.com/yvnji.png?size=120) | ![](https://github.com/zhal7779.png?size=120) | ![](https://github.com/SeongHo-C.png?size=120) | ![](https://github.com/JeomRyeKim.png?size=120) | ![](https://github.com/pisces330.png?size=120) | 
|[김지우](https://github.com/ziuss76)|[임지성](https://github.com/David9191)|[김윤지](https://github.com/yvnji)|[이민영](https://github.com/zhal7779)|[이성호](https://github.com/SeongHo-C)|[이혜정](https://github.com/JeomRyeKim)|[연정환](https://github.com/pisces330)|

