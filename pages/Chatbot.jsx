import { useTranslation } from "react-i18next";
import img6 from "../assets/images/chatbot.png";
import { useState } from "react";
import img7 from "../assets/images/img6.png";

import { translateText } from "./index2.js";

const Dashboard = () => {
	// Allow requests from localhost:5173

	// Other server configurations and routes

	const { t } = useTranslation();
	const [languageCode, setLanguageCode] = useState(1);
	const [botAnswer, setBotAnswer] = useState("");
	const [input, setInput] = useState("");
	const [query, setQuery] = useState(input);
	// const [message , setMessage] = useState(t("prompt"));
	const [chatLog, setChatLog] = useState([
		{ user: "gpt", message: t("prompt") },
	]);

	function clearChat() {
		setChatLog([]);
	}

	async function getChat(e) {
		e.preventDefault();
		// await setChatLog([...chatLog,  { user: "me", message: input }]);
		let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
		setInput("");
		setChatLog(chatLogNew);
		let u = t;

		let requestData = {
			article_hi: input,
			language: u,
		};
		if (u === "En") {
			requestData = {
				article_hi: input,
				language: t("1"),
			};
		}
		if (u === "hi") {
			requestData = {
				article_hi: input,
				language: t("1"),
			};
		} else {
			requestData = {
				article_hi: input,
				language: t("1"),
			};
		}

		const url = "https://dd66-115-243-167-82.ngrok-free.app/translate";
		try {
			// Sending POST request to the endpoint
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});

			// Checking if the request was successful
			if (response.ok) {
				const responseData = await response.json();
				console.log("Bot:", responseData.bot_answer);
				setChatLog([
					...chatLogNew,
					{ user: "gpt", message: responseData.bot_answer },
				]);
			} else {
				console.error("Error:", response.statusText);
			}
		} catch (error) {
			console.error("Error:", error.message);
		}
	}

	return (
		<>
		<section className="bg-[#fff9ea]">
      <div className='container text-center'>
        <h2 className='heading'>
       {t("heading2")}
        </h2>
      </div>
    </section>
			<section>
				<div className="text-center mt-[-80px] flex lg:w-full  bg-[#282c34] text-white top-0 bottom-0 left-0 right-0 h-[80vh]">
					<aside className="lg:w-[240px] w-[120px]  p-[10px] bg-[#202123]">
						<div
							className="p-[12px] text-left rounded-md hover:bg-[rgba(255,255,255,0.1)] cursor-pointer transition-all"
							onClick={clearChat}
						>
							<span className="pl-[6px] pr-[12px]">+</span>
							New chat
						</div>
					</aside>
					<section className="flex-1 bg-[rgb(52,53,65)] relative">
						<div className="p-[24px] text-left">
							{chatLog.map((message, index) => (
								<ChatMessage key={index} message={message} />
							))}
						</div>
						<div className=" p-[24px] absolute bottom-0 left-0 right-0">
							<form onSubmit={getChat}>
								<input
									className="bg-[#40414f] p-[12px] w-[90%] rounded-md border-none m-[12px] outline-none shadow-[0_0_8px_0_rgba(0,0,0,0.25)]text-white font-[1.25em]"
									rows={1}
									value={input}
									onChange={(e) => setInput(e.target.value)}
								></input>
							</form>
						</div>
					</section>
				</div>
			</section>
		</>
	);
};
const ChatMessage = ({ message }) => {
	return (
		<div className="chat-message bg-[#444654]">
			<div className="chat-message-center max-width-[640px] flex ml-auto mr-auto pl-[24px] pr-[24px] p-[12px]">
				{message.user === "gpt"}
				<div className="avatar rounded-[50%] w-[40px] h-[40px] bg-[#0da37f] ">
					{message.user == "gpt" ? (
						<img src={img6} />
					) : (
						<img
							src={img7}
							className="w-[35px] h-[35px] ml-1 items-center justify-between"
						/>
					)}
				</div>
				<p className="md:ml-10">{message.message}</p>

				<div className="message pl-[40px] pr-[40px] "></div>
			</div>
		</div>
	);
};
export default Dashboard;
