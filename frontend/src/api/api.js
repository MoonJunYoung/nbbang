import Cookies from "js-cookie";
import axios from "axios";

export let Token = () => Cookies.get("authToken");
const axiosData = () =>
  axios.create({
    baseURL: "https://nbbang.shop/test-api/",
    headers: {
      Authorization: Token(),
    },
  });

// signd

export const postSignInData = (data) => {
  return axiosData().post("/user/sign-in", data);
};

export const postSignUpData = (data) => {
  return axiosData().post("/user/sign-up", data);
};

// user

export const getUserData = (query) => {
  return axiosData().get(query);
};

//meeting

export const getMeetingData = (query) => {
  return axiosData().get(query);
};

export const postMeetingrData = (query) => {
  return axiosData().post(query);
};

export const deleteMeetingData = (meetingId) => {
  return axiosData().delete(`/meeting/${meetingId}`);
};

//meeting Fix

export const PutMeetingNameData = (meetingId, data) => {
  return axiosData().put(`meeting/${meetingId}`, data);
};

export const GetMeetingNameData = (meetingId) => {
  return axiosData().get(`meeting/${meetingId}`);
};

// member

export const getMemberData = (meetingId) => {
  return axiosData().get(`/meeting/${meetingId}/member`);
};

export const postMemberData = (meetingId, data) => {
  return axiosData().post(`/meeting/${meetingId}/member`, data);
};

export const deleteMemberData = (meetingId, memberId) => {
  return axiosData().delete(`/meeting/${meetingId}/member/${memberId}`);
};

//memnber fix

export const PutMemberNameData = (meetingId, Id, data) => {
  return axiosData().put(`meeting/${meetingId}/member/${Id}`, data);
};

//payment

export const getPaymentData = (meetingId) => {
  return axiosData().get(`meeting/${meetingId}/payment`);
};

export const postPaymentData = (meetingId, data) => {
  return axiosData().post(`meeting/${meetingId}/payment`, data);
};

export const deletePaymentData = (meetingId, paymentId) => {
  return axiosData().delete(`/meeting/${meetingId}/payment/${paymentId}`);
};

export const putPaymentData = (meetingId, paymentId, data) => {
  return axiosData().put(`/meeting/${meetingId}/payment/${paymentId}`, data);
};

//Billing

export const getBillingData = (meetingId) => {
  return axiosData().get(`/meeting/${meetingId}/billing`);
};

//BillingResult

export const getBillingResultText = (uuid) => {
  return axiosData().get(`/share/text?uuid=${uuid}`);
};

export const getBillingResultLink = (uuid) => {
  return axiosData().get(`/share/link?uuid=${uuid}`);
};

export const getBillingResultPage = (uuid) => {
  return axiosData().get(`/share/page?uuid=${uuid}`);
};

export const putBillingTossBank = (meetingId, data) => {
  return axiosData().put(`/meeting/${meetingId}`, data);
};

export const putBillingFixTossBank = (data) => {
  return axiosData().put("/user", data);
};

//Deposit

export const PatchBillingUserKaKaoDeposit = (data) => {
  return axiosData().patch(`user/kakao-deposit-link`, data);
};

export const PatchBillingMeetingKakaoDeposit = (meetingId, data) => {
  return axiosData().put(`meeting/${meetingId}/bank-account`, data);
};

export const PatchBillingUserTossDeposit = (data) => {
  return axiosData().patch(`user/bank-account`, data);
};
export const PatchBillingMeetingTossDeposit = (meetingId, data) => {
  return axiosData().put(`meeting/${meetingId}/kakao-deposit-link`, data);
};
