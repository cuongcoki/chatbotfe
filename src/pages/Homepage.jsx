import { useRef } from "react";
import styles from "../style";
import Chat from "../components/Chat";
import Chathistory from "../components/Chathistory";
import Inforexam from "../components/Inforexam";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import background from "../assets/image/bg3dmath.png";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const Homepage = () => {
  const container = useRef();
  const navbar = useRef();
  const chatHistory = useRef();
  const chat = useRef();
  const infoExam = useRef();
  const footer = useRef();

  useGSAP(() => {
    gsap.from([navbar.current, chatHistory.current, chat.current, infoExam.current, footer.current], {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
    });
  }, [container]);

  return (
<div
  style={{ backgroundImage: `url(${background})` }}
  ref={container}
  className="w-full flex items-center justify-center min-h-screen"
>
  {/* <div className="h-10 w-10 bg-black">

  </div> */}

   <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
    <div ref={navbar} className="w-full mb-4">
      <Navbar />
    </div>

    <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4">
      <div className="w-full lg:w-1/4 mb-4 lg:mb-0 order-2 lg:order-1" ref={chatHistory}>
        <Chathistory />
      </div>

      <div className="w-full lg:w-2/4 mb-4 lg:mb-0 order-1 lg:order-2" ref={chat}>
        <Chat />
      </div>

      <div className="w-full lg:w-1/4 order-3" ref={infoExam}>
        <Inforexam />
      </div>
    </div>

    <div ref={footer} className="w-full mt-8">
      <Footer />
    </div>
  </div>
</div>
  );
};

export default Homepage;


