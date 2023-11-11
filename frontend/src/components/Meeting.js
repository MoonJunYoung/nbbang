import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getMeetingData,
  postMeetingrData,
  deleteMeetingData,
} from "../api/api";
import Cookies from 'js-cookie';


const MainContainer = styled.div`
  position: relative;
`

const MeetingContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
  }
`;

const LogOut = styled.div`
  position: absolute; 
  right: 0;
  top: -80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px;
  cursor: pointer;
  span {
    margin-left: 5px;
    font-size: 14px;
    font-weight: 600;
  }
  img {
    display: block;
    width: 30px;
    height: 25px;
    border-radius: 15px;
  }
`;

const MeetingAddButton = styled.button`
  cursor: pointer;
  border-radius: 20px;
  height: 30px;
  border: none;
  font-weight: 600;
  color: lightslategray;
  background-color: #cce5ff;
  &:hover {
    color: black;
    transition: all 0.2s;
    transform: scale(1.05);
  }
`;

const Billing = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 3px solid #cce5ff;
  height: 170px;
  border-radius: 15px;
  &:hover {
    transition: all 0.2s;
    transform: scale(1.05);
  }
`;

const BillingDate = styled.p`
  font-size: 16px;
`;

const BillingName = styled.p`
  font-size: 14px;
`;

const BillingDeleteButton = styled.button`
  right: 10px;
  cursor: pointer;
  background-color: #cce5ff;
  margin-top: 15px;
  border-radius: 5px;
  border: none;
  height: 20px;
  &:hover {
    transition: all 0.2s;
    transform: scale(1.05);
    font-weight: 600;
  }
`;

const UserId = styled.p`
  font-size: 16px;
`;

export const truncate = (str, n) => {
  return str?.length > n ? str.substring(0, n) + "..." : str;
};

const Meeting = ({ user }) => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try {
      const responseGetData = await getMeetingData("meeting");
      setMeetings(responseGetData.data);
    } catch (error) {
      console.log("Api 데이터 불러오기 실패");
    }
  };

  const handleAddBilling = async () => {
    try {
      const response = await postMeetingrData("meeting");
      if (response.status === 201) {
        handleGetData();
        const responseHeaders = response.headers.get("Location");
        navigate(`/${responseHeaders}`);
      }
    } catch (error) {
      console.log("Api 데이터 보내기 실패");
    }
  };

  const handelDeleteBilling = async (meetingid) => {
    try {
      await deleteMeetingData(meetingid);
      setMeetings(meetings.filter((data) => data.id !== meetingid));
    } catch (error) {
      console.log("Api 데이터 삭제 실패");
    }
  };

  const handleLogOut = () =>{
    Cookies.remove("authToken");
    navigate("/signd");
  }

  return (
    <MainContainer>
      <LogOut onClick={handleLogOut}>
        <img 
            alt='logOut'
            src='/images/Logout.png'
            onClick={() => (window.location.href = "/")} 
          />
         <span>로그아웃</span>
      </LogOut>
      <UserId>{user.name}🧑🏻‍💻 님의 정산 내역입니다.</UserId>
      <Link>
        <MeetingAddButton onClick={handleAddBilling}>
          모임 추가하기
        </MeetingAddButton>
      </Link>
      <MeetingContainer>
        {meetings.map((data) => (
          <Link 
            key={data.id}
            to={`meeting/${data.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Billing key={data.id}>
              <BillingDate>{data.date}</BillingDate>
              <BillingName>{truncate(data.name, 15)}</BillingName>
              <BillingDeleteButton
                onClick={(e) => {
                  e.preventDefault();
                  handelDeleteBilling(data.id);
                }}
              >
                모임삭제하기
              </BillingDeleteButton>
            </Billing>
          </Link>
        ))}
      </MeetingContainer>
    </MainContainer>
  );
};

export default Meeting;
