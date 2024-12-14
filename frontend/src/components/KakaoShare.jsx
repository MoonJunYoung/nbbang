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
  border-radius: 100%;
  width: 40px;
  height: 40px;
  img {
    width: 30px;
  }
`;

const KakaoIcon = styled.img`
  width: 50px;
`;

const KakaoShare = ({ meetingName }) => {
  useEffect(() => {
    initKakao();
  }, [meetingName]);

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
      installTalk: true,
    });
  };

  return (
    <KakaoContainer>
      <KakaoShareBox className="share-node" onClick={shareKakao}>
        <KakaoIcon src="/images/kakao.png" alt="카카오톡 공유" />
      </KakaoShareBox>
    </KakaoContainer>
  );
};

export default KakaoShare;
