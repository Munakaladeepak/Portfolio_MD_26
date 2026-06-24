import Navbar from './components/Navbar'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Footer from './components/Footer'
import Feedback from './components/Feedback'
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
      <Feedback />
      <br/>
      <Footer />
    </div>
    
    </>
  )
}

export default App
