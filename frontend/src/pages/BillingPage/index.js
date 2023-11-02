import React, { useState } from 'react'
import Billing from '../../components/Billing'
import BillingMember from '../../components/BillingMember'
import BillingName from '../../components/BillingName'
import BillingPayment from '../../components/BillingPayment'
import BillingResultButton from '../../components/BillingResultButton'
import Nav from '../../components/Nav'


const BillingPage = () => {
  const [member, setMember] = useState([]);
  const [payment, setPayment] = useState([])

  return (
    <div>
      <Nav />
      {/* <BillingName /> */}
      <BillingMember member={member} setMember={setMember} />
      <BillingPayment member={member} payment={payment} setPayment={setPayment} />
      <Billing  payment={payment}/>
    </div>
  )
}

export default BillingPage