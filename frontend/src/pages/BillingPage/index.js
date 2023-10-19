import React, { useState } from 'react'
import BillingMember from '../../components/BillingMember'
import BillingName from '../../components/BillingName'
import BillingPayment from '../../components/BillingPayment'
import Nav from '../../components/Nav'


const BillingPage = () => {
  const [member, setMember] = useState([]);
  return (
    <div>
      <Nav />
      <BillingName />
      <BillingMember member={member} setMember={setMember} />
      <BillingPayment member={member}/>
    </div>
  )
}

export default BillingPage