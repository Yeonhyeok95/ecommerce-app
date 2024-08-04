"use client";

import Input from "@/components/Input";

const SignInPage = () => {
  return (
    <div className="auth-card">
      <div className="auth-card-box">
        <div className="auth-card-top">
          <div className="auth-card-title-box">
            <div className="auth-card-title">{"Login"}</div>
          </div>
          <Input
            inputValue="Email"
            type="text"
            placeholder="email@email.com"
            error={error}
            value={email}
            onChange={onEmailChangeHandler}
            onKeyDown={onEmailKeyDownHandler}
          />
          <Input
            ref={passwordRef}
            inputValue="Password"
            type={passwordType}
            placeholder="password"
            error={error}
            value={password}
            onChange={onPasswordChangeHandler}
            onKeyDown={onPasswordKeyDownHandler}
            icon={passwordButtonIcon}
            onButtonClick={onPasswordButtonClickHandler}
          />
        </div>
        <div className="auth-card-bottom">
          {error && (
            <div className="auth-sign-in-error-box">
              <div className="auth-sign-in-error-msg">
                {
                  "Email or Password is incorrect.\nCheck your Email or Password."
                }
              </div>
            </div>
          )}
          <div
            className="black-large-full-button"
            onClick={onSignInButtonClickHandler}
          >
            {"Login"}
          </div>
          <div className="auth-description-box">
            <div className="auth-description">
              {"New here?"}
              <span
                className="auth-description-link"
                onClick={onSignUpLinkClickHandler}
              >
                {" Sign Up"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
