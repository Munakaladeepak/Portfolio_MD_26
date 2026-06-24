import Navbar from './components/Navbar'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
function App() {

  return (
    <>
    <div className="body w-full flex flex-col " id="body">
      <Navbar />
      <br />
      <Hero />
      <br />
      <About />
      <br />
      <Skills />
      <br />
      <Projects />
      <br/>
    </div>
    
    </>
  )
}

export default App
