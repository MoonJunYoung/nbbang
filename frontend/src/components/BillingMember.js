import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getMemberData,
  postMemberData,
  deleteMemberData,
  getPaymentData,
} from "../api/api";
import BillingInputBox from "./BillingInputBox";
import BillingMemberFix from "./Modal/BillingMemberFixModal";
import { truncate } from "./Meeting";

const BillingMemberContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  position: relative;
  animation: fadeOut 400ms;
  @keyframes fadeOut {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const BillingAddMember = styled.button`
  color: white;
  margin-top: 10px;
  border: 1px solid lightgray;
  font-weight: 600;
  width: 160px;
  height: 30px;
  cursor: pointer;

  &:not(:disabled) {
    background-color: #0066ffd4;
    border: 1px solid lightgray;
    border-bottom: 1px solid #e1e1e1a8;
    box-shadow: 3px 4px 4px 0px #c6c6c666;
    color: white;
    cursor: pointer;
  }

  &:disabled {
    background-color: #d3d3d3;
    color: white;
  }
`;

const MemberContainer = styled.div`
  display: grid;
  width: 475px;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  margin: 30px 30px 20px 30px;
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    width: 250px;
    gap: 6px;
  }
`;

const Leader = styled.span`
  font-weight: bold;
  font-weight: 600;
  color: black;
  font-size: 14px;
`;

const MemberList = styled.div`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  padding: 10px;
  background-color: white;
  box-shadow: 0px 2px 3px #c3a99759;
  border: 1px solid #e6e6e666;
`;

const Members = styled.span`
  font-size: 13px;
  color: black;
  padding: 10px;
`;

const MemberDelete = styled.span`
  color: black;
  cursor: pointer;
`;

const BillingMemberTopLine = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: absolute;
  top: 0px;
  z-index: 3;
  background-color: white;
`;

const BillingMemberLine = styled.div`
  border: 1px solid silver;
  border-radius: 30px;
  margin-top: 10px;
  width: 90%;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BillingMemberTopLineComent = styled.span`
  margin: 0 10px;
  font-size: 14px;
  color: silver;
  font-weight: 800;
`;

const MemberFixComent = styled.div`
  span {
    font-size: 13px;
    color: silver;
    font-weight: 700;
  }
  margin-bottom: 15px;
`;

const BillingMember = ({ member, setMember }) => {
  const { meetingId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [memberSelected, setMemberSelected] = useState({});

  const [notAllow, setNotAllow] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleGetData = async () => {
    try {
      const responseGetData = await getMemberData(meetingId);
      setMember(responseGetData.data);
    } catch (error) {
      console.log("Api 데이터 불러오기 실패");
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const leaderValue = member.length === 0 ? true : false;
      const updatedFormData = {
        name: formData.name,
        leader: leaderValue,
      };
      const response = await postMemberData(meetingId, updatedFormData);
      if (response.status === 201) {
        setFormData({ name: "" });
        handleGetData();
      }
    } catch (error) {
      console.log("Api 데이터 수정 실패");
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await deleteMemberData(meetingId, memberId);
      setMember(member.filter((data) => data.id !== memberId));
    } catch (error) {
      console.log("Api 데이터 삭제 실패");
      if (
        error.response.data.detail === "the leader member cannot be deleted."
      ) {
        alert("총무인 멤버는 삭제할수 없습니다.");
      }
      if (
        error.response.data.detail ===
        "it is not possible to delete the member you want to delete because it is included in the payment."
      ) {
        alert("결제내역의 포함 된 멤버는 삭제 할 수 없습니다.");
      }
    }
  };

  const handleClick = (selectedMember) => {
    setMemberSelected(selectedMember);
    setOpenModal(true);
  };

  useEffect(() => {
    if (formData.name.length > 0) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [formData.name]);

  return (
    <BillingMemberContainer>
      <BillingMemberTopLine>
        <BillingMemberTopLineComent>
          모임에 참석한 멤버들은 누구인가요?
        </BillingMemberTopLineComent>
      </BillingMemberTopLine>
      <BillingMemberLine>
        <FormContainer onSubmit={handleAddMember}>
          <BillingInputBox
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="멤버추가하기"
            maxLength="22"
          />
          <BillingAddMember type="submit" disabled={notAllow}>
            멤버 추가하기
          </BillingAddMember>
        </FormContainer>
        <MemberContainer>
          {member.map((data) => (
            <MemberList key={data.id}>
              {data.leader === true && <Leader>총무</Leader>}
              <Members onClick={() => handleClick(data)}>
                {truncate(data.name, 5)}
              </Members>
              <MemberDelete
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteMember(data.id);
                }}
              >
                X
              </MemberDelete>
            </MemberList>
          ))}
        </MemberContainer>
        <MemberFixComent>
          <span>멤버를 선택하면 수정이 가능해요!☝🏻</span>
        </MemberFixComent>
      </BillingMemberLine>
      {openModal && (
        <BillingMemberFix
          {...memberSelected}
          setOpenModal={setOpenModal}
          handleGetData={handleGetData}
          meetingId={meetingId}
        />
      )}
    </BillingMemberContainer>
  );
};

export default BillingMember;
