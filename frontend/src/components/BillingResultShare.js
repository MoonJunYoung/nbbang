import styled from "styled-components";
import React from "react";

const ShareButton = styled.div`
  display: "flex";
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 200px;
  font-size: 13px;
  height: 35px;
  border: 1px solid skyblue;
  background-color: lightskyblue;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  margin: 30px 0 35px 0;
`;

const BillingResultShare = ({ meetingName }) => {
  const getApiDataCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingName.share_link);
      alert("텍스트가 클립보드에 복사되었습니다.");
    } catch (error) {
      console.error("클립보드 복사 실패");
    }
  };

  const getApiDataShare = async () => {
    try {
      if (window.navigator.share) {
        await window.navigator.share({
          text: meetingName.share_link,
        });
      } else if (
        window.ReactNativeWebView &&
        window.ReactNativeWebView.postMessage
      ) {
        const message = {
          type: "share",
          content: meetingName.share_link,
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      } else {
        alert(
          "Web Share API를 지원하지 않는 브라우저이므로 텍스트를 복사합니다."
        );
        getApiDataCopy();
      }
    } catch (error) {
      console.error("공유 API 호출 실패");
    }
  };

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return (
    <ShareButton>
      {isMobile ? (
        <Button onClick={getApiDataShare}>링크 공유하기</Button>
      ) : (
        <Button onClick={getApiDataCopy}>링크 복사하기</Button>
      )}
    </ShareButton>
  );
};

export default BillingResultShare;
