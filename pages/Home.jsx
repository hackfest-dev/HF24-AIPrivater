import React, { useTransition } from "react";
import img1 from "../assets/images/img01.jpg";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import { Link } from "react-router-dom";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import About from "../components/About";
import ServicesList from "../components/Services/ServicesList";
import img5 from "../assets/images/chatbot.png";
import { useTranslation } from "react-i18next";
import DoctorList from "../components/DoctorList";
// import

const Home = () => {
	const { t } = useTranslation();

	return (
		<>
			<>
				<section className="hero_section pt-[60px] 2xl:h-[800px] ">
					<div className="container">
						<div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
							<div>
								<div className="lg:w-[570px]">
									<h1 className={`text-[36px] ${t==='kn'? "text-[35px]":"leading-[26px]"} text-head font-[800] md:text-[36px] md:leading-[70px]`}>
										{t("Welcome")}
									</h1>
									<p className="text_para">{t("greeting")}</p>
									<button className="btn"> {t("Button1")}</button>
								</div>

								<div className="mt-[30px] lg:mt-[30px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
									<div>
										<h2 className="text-[36px] lg:mt-[54px] lg:text-[44px] lg:leading-[54px] font-[700] text-headC">
											3+
										</h2>
										<span className="w-[100px] h-2 bg-YelC rounded-full block mt-[-14px]" />
										<p className="text_para ">{t("Lang")}</p>
									</div>

									<div>
										<h2 className="text-[36px] lg:mt-[54px] lg:text-[44px] lg:leading-[54px] font-[700] text-headC">
											300+
										</h2>
										<span className="w-[100px] h-2 bg-purC rounded-full block mt-[-14px]" />
										<p className="text_para">{t("Loca")}</p>
									</div>

									<div>
										<h2 className="text-[36px] lg:mt-[54px] lg:text-[44px] lg:leading-[54px] font-[700] text-headC">
											100%
										</h2>
										<span className="w-[100px] h-2 bg-iris rounded-full block mt-[-14px]" />
										<p className="text_para ">{t("Sat")}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<About />
				<section>
					<div className="container">
						<div className="lg:w-[470px] mx-auto">
							<h1 className="heading text-center">
								Lorem ipsum dolor sit amet.
							</h1>
							<p className="text_para text-center">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
								quis sequi explicabo nisi numquam voluptatem.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
							<div className="py-[30px] px-5">
								<div className="flex items-center justify-center">
									<img src={img1} className="" alt="" />
								</div>
								<div className="mt-[30px]">
									<h2 className="text-[26px] leading-9 font-[700] text-headC text-center">
										{t("DOC")}
									</h2>
									<p className="text-[16px] leading-7 text-textC font-[400] mt-4 text-center">
										{t("doctor")}
									</p>
									<Link
										to="/doctors"
										className="w-[44px] h-[44px] rounded-full border mt-[30px] border-solid border-[#181A1E] mx-auto flex justify-center items-center group hover:bg-priC hover:border-none"
									>
										<FaArrowRight className="group-hover:text-white w-5 h-6" />
									</Link>
								</div>
							</div>

							<div className="py-[30px] px-5">
								<div className="flex items-center justify-center">
									<img src={img2} className="" alt="" />
								</div>
								<div className="mt-[30px]">
									<h2 className="text-[26px] leading-9 font-[700] text-headC text-center">
										{t("Medical")}
									</h2>
									<p className="text-[16px] leading-7 text-textC font-[400] mt-4 text-center">
										{t("Report")}
									</p>
									<Link
										to="/medical"
										className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mx-auto flex justify-center items-center group hover:bg-priC hover:border-none mt-[30px]"
									>
										<FaArrowRight className="group-hover:text-white w-5 h-6" />
									</Link>
								</div>
							</div>

							<div className="py-[30px] px-5">
								<div className="flex items-center justify-center">
									<img src={img3} className="" alt="" />
								</div>
								<div className="mt-[30px]">
									<h2 className="text-[26px] leading-9 font-[700] text-headC text-center">
										{t("chat")}
									</h2>
									<p className="text-[16px] leading-7 text-textC font-[400] mt-4 text-center">
									{	t("ch")}
									</p>
									<Link
										to="/chatbot"
										className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mx-auto flex justify-center items-center group hover:bg-priC hover:border-none mt-[30px]"
									>
										<FaArrowRight className="group-hover:text-white w-5 h-6" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section>
					<div className="container">
						<div className="xl:w-[470px] mx-auto">
							<h2 className="heading text-center">{t("serve")}</h2>
							<p className="text_para text-center">
								{t("ser")}
							</p>
						</div>
						<ServicesList />
					</div>
				</section>

				<section>
					<div className="container">
						<div className="flex items-center justify-between flex-col lg:flex-row">
							<div className="xl:w-[670px]">
								<h2 className="heading">
									{t('get')}								</h2>
								<ul className="pl-4">
									<li className="text_para">{t('well')}</li>
									<li className="text_para">{t('2')}</li>
									<li className="text_para">{t('3')}</li>
								</ul>
								<Link to="/Chatbot">
									<button className="btn">Chat Bot</button>
								</Link>
							</div>
							<div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
								<img src={img5} className="w-3/4" alt="" />
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className="container">
						<div className="xl:w-[470px] mx-auto">
							<h2 className="heading text-center">Our Great Doctors</h2>
							<p className="text_para text-center">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
								iusto reiciendis tenetur. Mollitia, ea ab?
							</p>
						</div>
						<DoctorList />
						<Link to="/doctors">
									<button className="btn">More</button>
								</Link>
					</div>
				</section>
			
			</>
		</>
	);
};

export default Home;
