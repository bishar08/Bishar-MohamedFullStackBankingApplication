function Login() {
  const [show, setShow] = React.useState(true)
  const [status, setStatus] = React.useState('')

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const emailinput = document.getElementById('emailinput')
  const passwordinput = document.getElementById('passwordinput')

  const header = 'Login to an existing account'
  const headerSuccess = 'Welcome to your Bad Bank account'

  const ctx = React.useContext(UserContext)

  function firebaseAuthentication() {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailinput.value, passwordinput.value)
      .then((user) => {
        setShow(false);
        setStatus(true);
        ctx.user.email = emailinput.value;
      })
      .catch((e) => console.log(e.message))
  }

  return (
    <Card
      bgcolor="secondary"
      header={show ? <>{header}</> : <>{headerSuccess}</>}
      status={status}
      body={
        show ? (
         <>
           Login Email
            <br />
            <input
              type="input"
              className="form-control"
              id="emailinput"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value)
              }}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="passwordinput"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value)
              }}
            />
            <br />
            <input
                type="submit"
                className="btn btn-light text-black-100"
                onClick={firebaseAuthentication}
                value="Login with email and password"
                id="firebase-submit-button"
            />
            <br />
            {/* <input
                type="submit"
                className="btn btn-light text-black-100"
                onClick={googleLogin}
                value="Login with your Google account"
                id="google-submit-button"
            /> */}
         </>
        ) : (
          <h5>Success</h5>
          <button type="submit" className="btn btn-light">
            Welcome Back!
          </button>
        )
      }
    />
  )
}

// function LoginMsg(props){
//   return(<>
//     <h5>Success</h5>
//     <button type="submit"
//       className="btn btn-light"
//       onClick={() => props.setShow(true)}>
//         Authenticate again
//     </button>
//   </>);
// }

