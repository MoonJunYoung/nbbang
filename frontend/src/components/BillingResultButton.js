// import styled from "styled-components";
// import { getBillingResultText } from "../api/api";
// import React from "react";

// const ButtonBox = styled.div`
//   display: "flex";
//   justify-content: center;
//   align-items: center;
// `;

// const Button = styled.button`
//   width: 200px;
//   height: 30px;
//   border: 1px solid skyblue;
//   background-color: lightskyblue;
//   border-radius: 10px;
//   color: white;
//   cursor: pointer;
//   &:hover {
//     border: 3px solid skyblue;
//     transition: all 0.2s;
//     transform: scale(1.1);
//     font-weight: 600;
//     background-color: lightskyblue;
//   }
// `;

// const BillingResultButton = ({ meetingName }) => {
//   const getApiDataCopy = async () => {
//     try {
//       const response = await getBillingResultText(meetingName);
//       if (response.status === 200) {
//         const billingResult = response.data;
//         await navigator.clipboard.writeText(billingResult);
//         alert("텍스트가 클립보드에 복사되었습니다.");
//       }
//     } catch (error) {
//       console.log("Api 데이터 불러오기 실패");
//     }
//   };

//   const getApiDataShare = async () => {
//     try {
//       const response = await getBillingResultText(meetingName);
//       if (response.status === 200) {
//         const billingResult = response.data;
//         if (navigator.share) {
//           await navigator.share({
//             text: billingResult,
//           });
//         } else {
//           alert(
//             "Web Share API를 지원하지 않는 브라우저이므로 텍스트를 복사합니다."
//           );
//           getApiDataCopy();
//         }
//       }
//     } catch (error) {
//       console.error("공유 실패:", error);
//     }
//   };
//   const isMobile =
//     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//       navigator.userAgent
//     );

//   return (
//     <ButtonBox>
//       {isMobile ? (
//         <Button onClick={getApiDataShare}>텍스트로 공유하기</Button>
//       ) : (
//         <Button onClick={getApiDataCopy}>텍스트로 복사하기</Button>
//       )}
//     </ButtonBox>
//   );
// };

// export default BillingResultButton;
