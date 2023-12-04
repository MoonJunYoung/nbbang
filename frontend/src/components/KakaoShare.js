import React, { useEffect } from "react";
import styled from "styled-components";

const KakaoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const KakaoShareBox = styled.div`
  display: flex;
  font-size: 13px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #ffeb3c;
  width: 200px;
  height: 35px;
  margin-top: 70px;
  img {
    width: 35px;
  }
  span {
    padding: 10px;
  }
`;

const KakaoShare = ({ meetingName, handleMeetingGetData }) => {
  useEffect(() => {
    handleMeetingGetData();
    initKakao();
  }, []);

  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init("904f6d1fcb87f1741d5c8cfad188ffc2");
      }
    }
  };

  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "Nbbang",
        description: `${meetingName.name}의 정산결과 입니다.`,
        imageUrl: "",
        link: {
          webUrl: meetingName.share_link,
          mobileWebUrl: meetingName.share_link,
        },
      },
      buttons: [
        {
          title: "정산 내역 확인하러가기",
          link: {
            webUrl: meetingName.share_link,
            mobileWebUrl: meetingName.share_link,
          },
        },
      ],
    });
  };

  return (
    <KakaoContainer>
      <KakaoShareBox className="share-node" onClick={shareKakao}>
        <img src="/images/kakao.png" alt="카카오톡 공유" />
        <span>카카오톡으로 공유하기</span>
      </KakaoShareBox>
    </KakaoContainer>
  );
};

export default KakaoShare;
