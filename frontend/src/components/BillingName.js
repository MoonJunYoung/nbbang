import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GetMeetingNameData } from "../api/api";
import Nav from "./Nav";
import BillingNameModal from "./Modal/BillingNameModal";

const BillngNameContainer = styled.div`
  max-width: 670px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavContainer = styled.div`
  background-color: white;
  height: 60px;
  border-bottom: 1px solid #e1e1e1a8;
  box-shadow: 0px 2px 4px 0px #d9d9d980;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MeetingSeting = styled.div`
  box-shadow: 0px 2px 3px #c3a99759;
  border-radius: 12px;
  border: 1px solid #e6e6e666;
  margin-bottom: 10px;
  padding: 0px 5px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Meetings = styled.div`
  border-left: 1px solid #e6e6e666;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const MeetingData = styled.span``;

const BillingName = ({ meetingName, setMeetingName }) => {
  // const [meetingName, setMeetingName] = useState([]);
  const { meetingId } = useParams();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!openModal) {
      const handleGetData = async () => {
        try {
          const responseGetData = await GetMeetingNameData(meetingId);
          setMeetingName(responseGetData.data);
        } catch (error) {
          console.log("Api 데이터 불러오기 실패");
        }
      };
      handleGetData();
    }
  }, [openModal]);

  const handleClick = () => {
    setOpenModal(true);
  };

  return (
    <BillngNameContainer>
      <NavContainer>
        <Nav />
        <MeetingSeting onClick={handleClick}>
          <Meetings>
            <MeetingData>{meetingName.name}</MeetingData>
            <MeetingData>{meetingName.date}</MeetingData>
          </Meetings>
        </MeetingSeting>
        {openModal && (
          <BillingNameModal
            setOpenModal={setOpenModal}
            MainMeetingId={meetingName?.id}
            MainMeetingName={meetingName?.name}
          />
        )}
      </NavContainer>
    </BillngNameContainer>
  );
};

export default BillingName;
