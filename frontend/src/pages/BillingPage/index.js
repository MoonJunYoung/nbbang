import React, { useState } from "react";
import Billing from "../../components/Billing";
import BillingMember from "../../components/BillingMember";
import BillingName from "../../components/BillingName";
import BillingPayment from "../../components/BillingPayment";

const BillingPage = () => {
  const [member, setMember] = useState([]);
  const [payment, setPayment] = useState([]);

  return (
    <div>
      <BillingName />
      <BillingMember member={member} setMember={setMember} />
      <BillingPayment
        member={member}
        payment={payment}
        setPayment={setPayment}
      />
      <Billing member={member} payment={payment} />
    </div>
  );
};

export default BillingPage;
