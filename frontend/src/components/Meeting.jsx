import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserSettingModal from "./Modal/UserSettingModal";
import styled from "styled-components";
import {
  getMeetingData,
  postMeetingrData,
  deleteMeetingData,
  GetMeetingNameData,
} from "../api/api";
import Cookies from "js-cookie";
import BillingNameModal from "./Modal/BillingNameModal";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

const Container = styled.div`
  padding: 0 20px;
  height: 100vh;
  background: #FFFFFF;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Header = styled(motion.header)`
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled(motion.h1)`
  font-size: 24px;
  font-weight: 700;
  color: #191F28;
  letter-spacing: -0.3px;
`;

const SettingButton = styled(motion.button)`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: none;
  background: #F9FAFB;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MeetingList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
`;

const MeetingCard = styled(motion(Link))`
  padding: 20px;
  background: #FFFFFF;
  border-radius: 24px;
  border: 1px solid #F2F4F6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const MeetingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const MeetingDate = styled.span`
  font-size: 14px;
  color: #8B95A1;
  font-weight: 500;
`;

const MeetingName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #191F28;
  letter-spacing: -0.3px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background: #F9FAFB;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const AddButton = styled(motion.button)`
  position: fixed;
  bottom: 32px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: calc(100% - 40px);
  max-width: 420px;
  height: 56px;
  border-radius: 30px;
  border: none;
  background: linear-gradient(91.49deg, #3182F6 0%, #4F9BFF 100%);
  color: white;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: -0.3px;
  box-shadow: 0 8px 16px rgba(49, 130, 246, 0.24);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyState = styled(motion.div)`
  margin-top: 40%;
  text-align: center;
  color: #8B95A1;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.3px;
  line-height: 1.6;
`;

export const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

const Meeting = ({ user }) => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const [openUserSettingModal, setUserSettingModal] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);

  const handleGetData = async () => {
    try {
      const responseGetData = await getMeetingData("meeting");
      setMeetings(responseGetData.data);
    } catch (error) {
      console.log("Api 데이터 불러오기 실패");
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    if (!openMenuModal) {
      handleGetData();
    }
  }, [openMenuModal]);

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

  return (
    <Container>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <UserName>{user.name}님의 모임 👋</UserName>
        <SettingButton 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setUserSettingModal(true)}
        >
          <img src="/images/Setting.png" alt="설정" width="24" onClick={() => setUserSettingModal(true)} />
        </SettingButton>
        {openUserSettingModal && <UserSettingModal setUserSettingModal={setUserSettingModal} />}
      </Header>

      <MeetingList
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence>
          {meetings.length > 0 ? (
            meetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                to={`meeting/${meeting.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <MeetingInfo>
                  <MeetingDate>{meeting.date}</MeetingDate>
                  <MeetingName>{truncate(meeting.name, 13)}</MeetingName>
                </MeetingInfo>
                <ActionButtons>
                  <IconButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenMenuModal(true);
                      setSelectedMeetingId(meeting.id);
                    }}
                  >
                    <AiOutlineEdit size={20} />
                  </IconButton>
                  <IconButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handelDeleteBilling(meeting.id);
                    }}
                  >
                    <RiDeleteBinLine size={20} />
                  </IconButton>
                </ActionButtons>
              </MeetingCard>
            ))
          ) : (
            <EmptyState
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>아직 등록된 모임이 없어요</p>
              <p>새로운 모임을 시작해보세요 ✨</p>
            </EmptyState>
          )}
        </AnimatePresence>
      </MeetingList>

      {openMenuModal && selectedMeetingId && (
        <BillingNameModal
          setOpenMenuModal={setOpenMenuModal}
          MainMeetingId={selectedMeetingId}
          MainMeetingName={meetings.find(m => m.id === selectedMeetingId)?.name}
        />
      )}

      <AddButton
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddBilling}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        새로운 모임 만들기
      </AddButton>
    </Container>
  );
};

export default Meeting;
