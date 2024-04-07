import { Link, useNavigate } from "react-router-dom";
import img6 from "../assets/images/img6.gif"; 
import img7 from "../assets/images/img6.png";
import { useState } from "react";
import  uploadCloud  from "../utils/uploadCloud";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Signup = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewURL, setPreviewURL] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const [FormData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		photo: selectedFile,
		gender: "male",
		role: "patient",
	});
	const handleFileInputchange = async e => {

		const file = e.target.files[0];
		const data = await uploadCloud(file);
		setPreviewURL(data.url);
		setSelectedFile(data.url);
		setFormData({ ...FormData, photo: data.url });
		console.log(data.url);

	};
	const handleInputChange = async e => {
		setFormData({
			...FormData,
			[e.target.name]: e.target.value,
		});
	
	};

	const submitHandler = async event => {
		console.log(FormData);
		event.preventDefault();
		setLoading(true);

		try {
			const res =await fetch(`${BASE_URL}/auth/register`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(FormData),
			});
			const { message } = await res.json();
			if (!res.ok) {
				throw new Error(message);
			}
			setLoading(false);
			toast.success(message);
			navigate("/login");
		} catch (err) {
			toast.error(err.message);
			setLoading(false);
		}
	};

	return (
		<section>
			<div className="max-w-[1170px] mx-auto">
				<div className="grid gird-cols-1 lg:grid-cols-2">
					<div className="hidden lg:block bg-priC rounded-l-lg">
						<figure className="rounded-l-lg">
							<img src={img6} alt="" className="w-full rounded-l-lg" />
						</figure>
					</div>
					<div className="rounded-l-lg lg:pl-16 py-10">
						<h3 className="text-head text-[22px] leading-9 font-bold mb-10 ">
							Create an <span className="text-priC "> account</span>
						</h3>
						<form onSubmit={submitHandler}>
							<div className="mb-5">
								<input
									type="text"
									placeholder="Enter Your Full Name"
									name="name"
									value={FormData.name}
									onChange={handleInputChange}
									required
									className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-priC text-[16px] leading-7 text-head placeholder:text-textC rounded-md cursor-pointer"
								/>
							</div>
							<div className="mb-5">
								<input
									type="email"
									placeholder="Enter Your Email"
									name="email"
									value={FormData.email}
									onChange={handleInputChange}
									required
									className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-priC text-[16px] leading-7 text-head placeholder:text-textC rounded-md cursor-pointer"
								/>
							</div>

							<div className="mb-5">
								<input
									type="password"
									placeholder="Enter Your Password"
									name="password"
									value={FormData.password}
									onChange={handleInputChange}
									required
									className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-priC text-[16px] leading-7 text-head placeholder:text-textC rounded-md cursor-pointer"
								/>
							</div>

							<div className="mb-5 items-center flex justify-between">
								<label
									htmlFor=" "
									className="text-head font-bold text-[16px] leading-7"
								>
									Are you a:
									<select
										className="text-head font-semibold text-[15px] leading-7 px-4"
										name="role"
										value={FormData.role}
										onChange={handleInputChange}
									>
										<option value="patient">Patient</option>
										<option value="doctor">Doctor</option>
									</select>
								</label>

								<label
									htmlFor=" "
									className="text-head font-bold text-[16px] leading-7"
								>
									Gender:
									<select
										className="text-head font-semibold text-[15px] leading-7 px-4"
										name="Gender"
										value={FormData.gender}
										onChange={handleInputChange}
									>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="otherrs">Others</option>
									</select>
								</label>
							</div>
							<div className="mb-5 flex items-center gap-3">
								{selectedFile && <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-priC flex items-center justify-center">
									<img src={previewURL} alt="" className="w-full rounded-full" />
								</figure>}
								<div className="relative w-[130px] h-[50px]">
									<input
										type="file"
										name="photo"
										id="customFile"
										accept=".jpeg, .png"
										onChange={handleFileInputchange}
										className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
									/>
									<label
										htmlFor="customFile"
										className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-head font-semibold rounded-lg truncate cursor-pointer"
									>
										Upload Picture
									</label>
								</div>
							</div>

							<div className="mt-7">
								<button
								disabled={loading && true}
									type="submit"
									className="w-full bg-priC text-white text-[18px] leading-[30px] rounded-lg py-3 px-4"
								>
									{loading? <HashLoader size={35} color="#ffffff" />:'Sign Up'}
								</button>
							</div>
							<p className="mt-5 text-head text-center cursor-pointer">
								Already have an account?
								<Link to="/login" className="text-priC font-medium ml-1">
									Login
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Signup;
