import ChatBody from "@/components/ChatBody";
import ChatHeader from "@/components/ChatHeader";
import ChatInfo from "@/components/ChatInfo";
import ChatTextarea from "@/components/ChatTextarea";

export default function Home() {
	return (
		<main className="min-h-screen p-5 max-w-[700px] mx-auto">
			<h1 className="uppercase text-2xl mb-7 text-center">Chat room</h1>
			<ChatHeader />
			<ChatBody />
			<ChatInfo />
			<ChatTextarea />
		</main>
	);
}
