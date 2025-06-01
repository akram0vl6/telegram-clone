import React from 'react'
import SignIn from './sign-in'
import Verify from './verify'
import { useAuth } from '@/hooks/useAuth'

const StateAuth = () => {
  const { step } = useAuth((state) => state)
  return (
    <div>
        {step === 'login' ? <SignIn /> : null}
        {step === 'verify' ? <Verify /> : null}
        {/* <SignUp /> */}
        {/* <ForgotPassword /> */}
    </div>
  )
}

export default StateAuth