import React, { useEffect } from "react";
import styled from "styled-components";

const KakaoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const KakaoShareBox = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #ffeb3c;
  width: 200px;
  margin-bottom: 80px;
  img {
    width: 35px;
  }
  span {
    padding: 10px;
  }
`;

const KakaoShare = ({ meetingName }) => {
  useEffect(() => {
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
    const meetingUrl = `https://nbbang.shop/share?meeting=${meetingName.uuid}`;

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "Nbbang",
        description: "#모임 #좋은자리 #좋은사람 #좋은조도 #좋은습도",
        imageUrl: "",
        link: {
          webUrl: meetingUrl,
          mobileWebUrl: meetingUrl,
        },
      },
      buttons: [
        {
          title: "정산 내역 확인하러가기",
          link: {
            webUrl: meetingUrl,
            mobileWebUrl: meetingUrl,
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
