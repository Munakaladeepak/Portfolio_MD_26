import img from "../images/Herosec-img.png"
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
const Hero = () => {
  return (
    <>
    <div className="Hero w-full flex flex-col-reverse md:flex-row gap-4 items-center justify-between align-baseline md:px-9 font-semibold" id="Hero">
      <div className="content flex flex-col items-stretch px-9 justify-center align-baseline w-full md:w-1/2 gap-4 p-4" id="Hero-Content">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-left">Crafting Digital <br /> Experiences</h1>
        <p className="text-lg md:text-3xl  text-left" style={{color:"var(--color-accent)"}}>
          FULL STACK DEVELEOPER 
        </p>
        <p className="text-lg md:text-2xl text-left" style={{color:"var(--color-text)"}}>
          I build modern, responsive, and scalable web applications that bring ideas to life and deliver meaningful impact.
        </p>
        <div className="buttons flex flex-row gap-2">
          <button className="px-3 py-1.5 text-sm md:px-6 md:py-3 rounded-lg text-lg mr-4" style={{backgroundColor:"var(--color-accent)",color:"white"}}>
           View projects 
          </button>
          <button className="px-3 text-sm py-1.5 text-md:px-6 md:py-3 rounded-lg md:text-lg mr-4" style={{border:"2px solid var(--color-accent)",color:"var(--color-accent)",backgroundColor:"transparent"}}>
           View projects 
          </button>
        </div>

        <div className="icons flex flex-row gap-4 mt-4 algin-baseline">
          <a href="#" className="text-3xl md:text-4xl mr-4" style={{color:"var(--color-text)"}}><FaGithub /></a>
          <a href="#" className="text-3xl md:text-4xl mr-4" style={{color:"var(--color-text)"}}><FaLinkedin /></a>
          <a href="#" className="text-3xl md:text-4xl mr-4" style={{color:"var(--color-text)"}}><IoIosMail /></a>
          
        </div>
      </div>
      <div id="imgsec" className="w-full md:w-1/2 h-64 md:h-auto">
        <img src={img} alt="Hero Image" className="w-full h-full object-contain" />
      </div>
    </div>
    </>
  )
}


export default Hero