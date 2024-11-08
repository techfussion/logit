import React from "react";
import Button from "../components/Button";

const Login: React.FC = () => {
    return (
        <main className="flex justify-center mb-5">
            <div>
                <h2 className="text-2xl leading-loose">Welcome back!</h2>
                <p className="text-sm text-textGray1 mb-6">Log in to your account to view your logs.</p>
                <form className="flex flex-col">
                    <input type="email" id="email" name="email" placeholder="you@example.com" className="bg-customGray1 text-xs p-2 rounded mb-2"/>
                    <input type="password" id="password" name="password" placeholder="********" className="bg-customGray1 text-xs p-2 rounded mb-2"/>
                    <p className="ml-auto text-xs text-textBlue1 mb-2">Forgot password?</p>
                    <Button text="Login" onClick={() => {}} type="submit"/>
                </form>
                <hr className="my-4 w-11/12 mx-auto bg-customGray1"/>
                <div>
                    <div className="flex justify-center my-1 gap-5">
                        <Button text="Google" outline onClick={() => {}} />
                        <Button text="Facebook" outline onClick={() => {}} />
                    </div>
                </div>
            </div>
            <p className="text-xs text-textGray2 absolute bottom-2">&copy; Logit. All rights reserved</p>
        </main>
    )
}

export default Login;