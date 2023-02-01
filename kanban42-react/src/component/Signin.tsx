// import * as React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import LoginGithub from 'react-login-github';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { api } from '../api';
import { fetchUser, login, onLoadMain } from '../store/action';

export default function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSuccess = async (response: any) => {
        const oauthServer = Object.keys(response);
        var server;
        var authToken;
        if (oauthServer.includes('code')) {
            server = 'github';
            authToken = response.code;
        } else {
            server = 'google';
            authToken = response.credential;
        }
        const res = await api.login(server, authToken);
        if (res.status === 200) {
            localStorage.setItem('loggedIn', JSON.stringify(res.data));
            dispatch(await login(res.data));
            console.log('login success');
            navigate('/');
        }
    }

    const onFailure = () => {
        console.log('Log in fail');
    }

    const memberLogin = async () => {
        const email = (document.getElementById('login-email') as HTMLInputElement).value;
        const password = (document.getElementById('login-password') as HTMLInputElement).value;
        const res = await api.memberLogin( { email, password } );
        console.log(res);
        dispatch(await login(res.data));
        navigate('/');
    }
    
    return (
        <div className="login-box">
            <NavLink to='/'><img alt="Trello" className="trello-main-logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"></img></NavLink>
            <section className="inner-section">
                <div className="section-wrapper quick-switch">
                    <div className="login-password-container">
                        <div className="login-methods hide-when-two-factor">
                            <div className="login-oauth-container">
                                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
                                    <GoogleLogin
                                        auto_select={false}
                                        useOneTap={false}
                                        width='100%'
                                        onSuccess={onSuccess}
                                        onError={onFailure} />
                                </GoogleOAuthProvider>
                                <LoginGithub clientId={process.env.REACT_APP_GITHUB_CLIENT_ID!}
                                    onSuccess={onSuccess}
                                    onError={onFailure} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="member-login">
                <input type="text" id="login-email"/>
                <input type="text" id="login-password"/>
                <button onClick={memberLogin}>LOG IN</button>
            </div>
        </div>
    )
}
