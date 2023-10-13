import React from 'react'
import BillingMember from '../../components/BillingMember'
import BillingName from '../../components/BillingName'
import Nav from '../../components/Nav'

const BillingPage = () => {
  return (
    <div>
      <Nav />
      <BillingName />
      <BillingMember />
    </div>
  )
}

export default BillingPage