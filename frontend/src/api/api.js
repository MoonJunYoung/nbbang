import Cookies from 'js-cookie';
import axios from 'axios';

export let Token = () => Cookies.get('authToken');
const axiosData = () => axios.create({
  baseURL: "http://15.164.99.251/api/",
  headers: {
    'Authorization': Token()
  },
}
)

// signd

export const postSigndData = (api, data) => {
  return axiosData().post(api, data);
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

export const PutMeetingNameData = (meetingId , data) => {
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

export const PutMemberNameData = (meetingId , Id, data) => {
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

export const getBillingResult = (meetingId) => {
  return axiosData().get(`meeting/${meetingId}/billing/share`)
}