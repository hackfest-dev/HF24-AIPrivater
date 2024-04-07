import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
	const [FormData, setFormData] = useState({
		email: "",
		password: "",
	});
	const handleInputChange = (e) => {
		setFormData({
			...FormData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<section>
			<div className="px-5 lg:px-0">
				<div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
					<h3 className="text-head text-[22px] leading-9 font-bold mb-10">
						Hello!<span className="text-priC ">Welcome</span> Back
					</h3>
					<form className=" py-4 md:py-0">
						<div className="mb-5">
							<input
								type="email"
								placeholder="Enter Your Email"
								name="Email"
								value={FormData.email}
								onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-priC text-[16px] leading-7 text-head placeholder:text-textC rounded-md cursor-pointer"
							/> 
						</div>

            <div className="mb-5">
							<input
								type="password"
								placeholder="Enter Your password"
								name="password"
								value={FormData.password}
								onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-priC text-[16px] leading-7 text-head placeholder:text-textC rounded-md cursor-pointer"
							/> 
						</div>

            <div className="mt-7">
            <button type="submit" className="w-full bg-priC text-white text-[18px] leading-[30px] rounded-lg py-3 px-4">
            Login
            </button>
            </div>
            <p className="mt-5 text-head text-center cursor-pointer">
              don&apos;t have an account?
              <Link to='/register' className="text-priC font-medium ml-1">
              Register
              </Link>
            </p>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
