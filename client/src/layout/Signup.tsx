import React from "react";
import Button from "../components/Button";

const Signup: React.FC = () => {
    return (
        <main className="flex justify-center">
            <div>
                <h2 className="text-2xl leading-loose">Welcome!</h2>
                <p className="text-sm text-textGray1 mb-6">Create a logit account to experience a seamless electronic log book system.</p>
                <form className="flex flex-col">
                    <input type="email" id="email" name="email" placeholder="you@example.com" className="bg-customGray1 text-xs p-2 rounded mb-2"/>
                    <input type="text" id="username" name="username" placeholder="username" className="bg-customGray1 text-xs p-2 rounded mb-2"/>
                    <input type="password" id="password" name="password" placeholder="********" className="bg-customGray1 text-xs p-2 rounded mb-2"/>
                    <Button text="Signup" onClick={() => {}} type="submit"/>
                </form>
                <hr className="my-4 w-11/12 mx-auto bg-customGray1"/>
                <div>
                    <div className="flex justify-center my-2 gap-5">
                        <Button text="Google" outline onClick={() => {}} />
                        <Button text="Facebook" outline onClick={() => {}} />
                    </div>
                </div>
            </div>
            <p className="text-xs text-textGray2 absolute bottom-1">&copy; Logit. All rights reserved</p>
        </main>
    )
}

export default Signup;