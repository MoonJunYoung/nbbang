## Nbbang 

<p align="center">
  <img src="https://github.com/moonjunyoung/nbbang/assets/117567934/33e361d7-466a-4142-b98d-011f225e2083" alt="nbbang_Logo">
</p>

  
## Link
  
> __서비스 주소__ : [https://nbbang.life/](https://nbbang.life/)

<br/>

## 개발 멤버

> __백엔드 엔지니어__ : [문준영](https://github.com/moonjunyoung)<br/>
> __프론트엔드 엔지니어__ : [김우혁](https://github.com/WooHyucks)

<br/>

## 프로젝트 소개

**모두가 편리하게 사용할 수 있는 정산 앱**
<br/>
<br/>
  모임에서 정산할 항목이 복잡한 경우의 사용하기 좋은 앱이며 모임의 참석한 멤버들이 총무에게 <br/>
  편하게 돈을 보낼 수 있는 시스템이 구축되어 있습니다!
<br/>
<br/>
[상세 설명 보러가기](https://github.com/moonjunyoung/nbbang/blob/master/README.md)


<br/>

## 시작 가이드

**Requirements**
<br/>
<br/>
for building and running the application you need
 - [Node.js](https://nodejs.org/en)
 - [Npm](https://www.npmjs.com/)
<br/>

**Installation**
<br/>
```bash
$ git clone https://github.com/moonjunyoung/nbbang.git
$ cd frontend
```

**Frontend**
<br/>
```bash
$ cd frontend
$ npm install
```


<br/>

## Stacks🚀

**Environment**
<br/>
<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<br/>
<br/>
**Config**
<br/>
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
<br/>
<br/>
**Development**
<br/>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
![React](https://img.shields.io/badge/react-444444?style=for-the-badge&logo=react)
<br/>
<br/>

## 화면 구성🖥️
| 로그인 페이지 | 메인 페이지 | 
|:---:|:---:
|<img width="360" alt="로그인 페이지" src="https://github.com/moonjunyoung/nbbang/assets/117567934/80d6a0b9-7326-4da9-a1a9-726f17871131"> |<img width="360" alt="메인페이지" src="https://github.com/moonjunyoung/nbbang/assets/117567934/480422cd-1e41-4ed3-b53f-8054139275d6">
| 상세 페이지1 | 상세 페이지2 | 
|<img width="360" alt="상세페이지1" src="https://github.com/moonjunyoung/nbbang/assets/117567934/7270b180-e4bd-45a4-8aec-5733c6aec121"> |<img width="360" alt="상세페이지2" src="https://github.com/moonjunyoung/nbbang/assets/117567934/21cb2e8e-adc2-4820-8999-25fca1261bf5">
| 공유페이지 |  | 
|<img width="277" alt="공유페이지" src="https://github.com/moonjunyoung/nbbang/assets/117567934/7e7100ae-eb68-40c3-8408-68f24c69b18a">
|| 


## 주요 기능📦

**⭐️로그인 기능**
 - 회원가입 기능과 소셜 로그인 기능을 통해 로그인이 가능 합니다.(구글,네이버,카카오)
 - 로그인 성공시 토큰을 발급 받아 쿠키에 저장하고 메인페이지로 리디렉션 됩니다.(쿠키 기한은 30일)

**⭐️메인 페이지**
 - 상단 오른쪽에 로그아웃 버튼으로 로그아웃을 진행할 수 있습니다. (쿠키 삭제)
 - 모임 추가하기를 통해 정산페이지로 이동할 수 있습니다.(React-Router-Dom)
 - 모임 추가 후 더 보기 아이콘을 통해 이름 수정,날짜 수정,모임 삭제 기능을 사용할 수 있습니다.

**⭐️정산 페이지**
 - 상단 오른쪽에 모임 정보가 있는 요소를 클릭하면 모달이 열리며 모임명과 모임 날짜를 다시 수정할 수 있습니다.
 - 멤버 추가하기를 통해 멤버를 추가할 수 있으며 첫 번째 추가된 멤버가 총무로 지정됩니다.
 - 총무 변경 시 멤버 이름을 클릭하여 모달이 열린 후 체크박스를 통해 변경이 가능합니다.
 - 멤버를 등록 후 결제내역을 추가할 수 있으며 추가 시 결제한 사람(드롭박스)과 참석한 멤버(체크박스)를 선택할 수 있습니다.
 - 결제 내역 추가를 진행하면 결제 내역과 정산 내역이 생성되며 결제 내역을 선택하여 수정이 가능합니다.(선택 시 모달이 열리며 결제 장소, 금액, 결제자, 멤버를 수정할 수 있습니다.)
 - 모든 정보의 입력이 완료되면 카카오톡 공유하기와 링크 복사하기(모바일에서는 링크 공유하기)를 통해 정산 결과를 공유할 수 있습니다.
 - 모바일에서는 카카오 송금, 토스 송금이 지원되며, 카카오 ID 와 토스 계좌를 등록하면 총무의 계좌 or 카카오톡으로 송금을 받을 수 있습니다.

**⭐️공유 페이지**
 - 정산의 모든 정보가 표시되며 멤버들은 정보를 수정할 수 없습니다.
 - 총무가 카카오 ID, 토스 계좌 등록을 하였을 시 멤버들은 카카오 입금, 토스 입금을 통해 원 클릭 입금이 가능해집니다. (모바일 한정)







