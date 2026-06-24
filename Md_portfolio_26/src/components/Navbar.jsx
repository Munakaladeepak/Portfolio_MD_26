import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  return (
    <>
    <div className="Nav w-full  bg-white shadow-md z-10 flex flex-row gap-4 items-baseline justify-between font-semibold p-4" id="Nav">
      <div className="logo text-4xl font-semibold md:px-5 italic">
        Deepak
      </div>
      <div className="Nav-items hidden md:flex flex-row gap-9 font-semibold text-lg text-decoration-none list-none">
        <a href="#about"><li>About</li> </a>
        <a href="#skills"><li>Skills</li></a>
        <a href="#resume"><li>Projects</li></a>
        <a href="#resume"><li>Linkedin</li></a>
        <a href="#contact"><li>Contact</li></a>
      </div>
      <button className="button px-6 py-3 rounded-lg text-lg md:hidden" id="Button">
        <IoMdMenu />
      </button>
      <button className="hidden button px-6 py-3 rounded-lg text-lg md:flex " id="Button">
        Github
      </button>
    </div>
    </>
  )
}


export default Navbar


