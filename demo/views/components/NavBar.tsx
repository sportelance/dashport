// on load, check if user is logged in
  // if they aren't, load  the login button
  // if they are, load a logout button and a button that routes to the protected page


import { React } from '../../deps.ts';

const NavBar = () => {
  const [clicked, setClick] = (React as any).useState(false)
  const [loggedIn, setLogin] = (React as any).useState(false)
  const [loginData, setLoginData] = (React as any).useState(['','']);
  // const [password, setPassword] = (React as any).useState('');

  const openLogin = () => {
    if (clicked === false) {
      setClick(true)
    } else {
      setClick(false)
    }
  }

  const setUserLogin = () => {
    if(!loggedIn) setLogin(true);
    else setLogin(false);
  } 

  const test = () => {
    if (!loggedIn) {
      setLogin(true)
    } else if(loggedIn) {
      setLogin(false)
    }
  }

  const inputgetter = (event:any) => {
    console.log(loginData)
    const oldLoginData = loginData;
    if (event.target.id === 'username') oldLoginData[0] = event.target.value;
    if (event.target.id === 'password') oldLoginData[1] = event.target.value;
    return setLoginData(oldLoginData);
  }

  const localSignUp = () => {
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: loginData[0],
        password: loginData[1]
      })
    };
    console.log('sending user data');
    fetch(`http://localhost:3000/signup`, postOptions)
    .then( data => data.json())
    .then (parsed => setLogin(parsed));
  };

  const localLogin = () => {
    // if (!user || !pass ) {
      // console.log(document.querySelector('#username').nodeValue);
    //   document.querySelector('#password').classList.toggle('error');
    //   return console.log('error')
    // }
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: loginData[0],
        password: loginData[1]
      })
    };
    console.log('abouttofetch');
    fetch(`http://localhost:3000/local`, postOptions)
    .then( data => data.json())
    .then (parsed => setLogin(parsed));
      // .catch((error) => console.log('error: ', error));
  };
  
  if (!loggedIn) {
    return (
      <div>
          <button onClick={setUserLogin} className='button'>Change Page View</button>
          <button onClick={openLogin} id='loginButton'>Login/Sign In Options</button>
          {clicked && (
            <div>
            <form id='form'>
              <div id='userForm'>
                <input id='username' onChange={inputgetter} placeholder='Username'/>
              </div>
              <div id='passForm'>
                <input type='password' id='password' onChange={inputgetter} placeholder='Password'/>
              </div>
              <button type='button' onClick={localLogin} id='login'>Login</button>
              <button type='button' onClick={localSignUp} id='signIn'>Sign Up</button>
            </form>
              <span>
                  <a href="/test">
                    <img id='googleIcon'
                      src="https://i.imgur.com/PHJ6j1E.png"
                    ></img>
                  </a>
              </span>
            </div>
          )}
      </div>
    )
  } else {
    return (
      <div>
          <button onClick={setUserLogin} className='button'>Change Page View</button>
          <button onClick={openLogin} className='button'>Log Out</button>
          <button>Redirect to Protected Page</button>
      </div>
    )
  }
}

export default NavBar;
