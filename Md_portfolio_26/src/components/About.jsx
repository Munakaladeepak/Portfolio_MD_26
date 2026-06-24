
import img from "../images/Aboutsectio.png"
const About = () => {
  return (
    <>
    <div className="flex flex-col md:flex-row gap-5 items-center justify-around p-4" id="about">
            <div className="flex w-1/2" id="About-img">
                <img src={img} alt="About" className="w-full h-full object-contain" />
            </div>


            <div className="flex w-full flex-col gap-4 items-start justify-center md:w-1/2 p-3 md:p-5" id="About-content">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-left">About Me</h1>
                <p className="text-lg md:text-lg text-left" style={{color:"var(--color-text)"}}>I'm Deepak, a passionate Full Stack Web Developer who loves building clean, performant, and beautiful web applications. I enjoy turning complex problems into simple, elegant solutions.</p>
                <p className="text-lg md:text-lg text-left" style={{color:"var(--color-text)"}}>With a strong foundation in the MERN stack and a keen eye for design, I focus on writing clean code and crafting seamless user experiences..</p>
               
                <div class="h-0.5 w-full bg-gray-500 my-4"></div>




                <div className="flex flex-row gap-3 items-center justify-evenly w-full" id="About-skills">
                    <p className="text-lg md:text-2xl text-left " style={{color:"var(--color-muted)"}}>
                       <p className="text-2xl md:text-5xl" style={{color:"var(--color-accent)"}}>7+</p>  
                         Projects   
                    </p>
                    
                    <div class="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-200 opacity-100"></div>
                    <p className="text-xs md:text-lg text-left" style={{color:"var(--color-muted)"}}>
                       <p className="text-lg md:text-2xl" style={{color:"var(--color-accent)"}}>FULLSTACK </p>  
                         Expertise   
                    </p>
                    <div class="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-200 opacity-100"></div>
                    <p className="text-xs md:text-lg text-left " style={{color:"var(--color-muted)"}}>
                       <p className="text-lg md:text-2xl" style={{color:"var(--color-accent)"}}>Clean code</p>  
                         Advocate   
                    </p>
                    <div class="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-200 opacity-100"></div>
                    <p className="text-xs md:text-lg text-left" style={{color:"var(--color-muted)"}}>
                       <p className="text-lg md:text-2xl" style={{color:"var(--color-accent)"}}>Open to </p>  
                         oppurtunities   
                    </p>
                    <div class="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-200 opacity-100"></div>
                    
                   
                    

                </div>

            </div>
            
    
    
    
    </div> 
            
    
    </>
  )
}

export default About