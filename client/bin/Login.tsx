import React from "react";
// import Button from "../components/Button";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
    return (
        <main className="flex justify-center items-center h-screen">
            <div className="w-4/12">
                <h2 className="text-2xl leading-loose">Welcome back!</h2>
                <p className="text-sm text-textGray1 mb-8">Log in to your account to view your logs.</p>
                <form className="flex flex-col">
                    <input type="email" id="email" name="email" placeholder="you@example.com" className="bg-customGray1 text-xs p-2 rounded mb-3"/>
                    <input type="password" id="password" name="password" placeholder="********" className="bg-customGray1 text-xs p-2 rounded mb-3"/>
                    <p className="ml-auto text-xs text-textBlue1 mb-3">Forgot password?</p>
                    {/* <Button text="Login" onClick={() => {}} type="submit"/> */}
                </form>
                <hr className="my-6 w-11/12 mx-auto bg-customGray1"/>
                <div>
                    <div className="flex justify-center my-2 gap-5">
                        {/* <Button text="Google" outline onClick={() => {}} /> */}
                        {/* <Button text="Facebook" outline onClick={() => {}} /> */}
                    </div>
                    <p className="text-xs text-textGray1 my-5 mx-auto w-max">Don't have an account? <Link className="text-xs text-textBlue1" to='/signup'>Sign Up</Link></p>
                </div>
            </div>
            <p className="text-xs text-textGray2 absolute bottom-1">&copy; Logit. All rights reserved</p>
        </main>
    )
}

export default Login;