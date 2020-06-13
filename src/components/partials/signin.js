import React from 'react'
import {Redirect } from 'react-router-dom'


function SignIn(props) {
  return (
    <div>{props.status?"":<Redirect to="/" />}https://drive.google.com/drive/folders/1QW4AtGeLV3WfQQBXy3ECO0MHXRaw2MjF?usp=sharing</div>
  )
}

export default SignIn
