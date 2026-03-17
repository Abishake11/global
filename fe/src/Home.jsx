import '../src/Home.css'

import banimg from "../src/assets/banner.jpg";
import icseimg from "../src/assets/icseimg.jpg";  
import cbseimg from "../src/assets/cbse.jpg";
import matric from "../src/assets/matric.jpg";
import state from "../src/assets/stated.jpg"
import { Link } from "react-router-dom";



function Home() {
   return (
      <>
         {/* banner section */}
         <section className='banner space'>
            <div className="container">
               <div className="row">
                  {/* left side */}
                  <div className="col-md-6">
                     <h1 className='fade-in'>Expert Tutors. Quality Learning. Anytime, Anywhere.</h1>
                     <img src={banimg} alt="" width="90%" className='banimg' />
                  </div>

                  {/* right side */}
                  <div className="col-md-6 fade-in">
                       <h3>Personalized 1-on-1 & Group Classes for All Students</h3>
                      <ul>
                        <li>Daily Live Classes</li>
                        <li>1-to-1 Mentorship Sessions</li>
                        <li>Doubt-Clearing Sessions</li>
                        <li>Recorded Lectures Access</li>
                      </ul>
                     <div className="d-flex gap-3 mt-4 mx-3">
                         <Link className="btn-course" to="/signup">
                            Join Now
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Icse section */}
         <section className='icse space'>
            <div className="container">
               <div className='row'>
                  <div className='col-md-6'>
                     <div className='left-icse'>
                        <h2>1.ICSE (Indian Certification of Secondary Education)</h2>
                        <p>* Conducted by the <b>Council for the Indian School Certificate Examinations (CISCE).</b></p>
                        <p>* Focuses on <b>in-depth knowledge</b>, especially in English, Science, and Arts.</p>
                        <p>* Encourages <b>practical learning, projects, and skill development.</b></p>
                        <p>* Useful for students aiming for higher studies abroad as it is recognized internationally.</p>
                     </div>
                  </div>
                  <div className='col-md-6'>
                     <div className='right-icse'>
                        <img src={icseimg} alt="ICSE" width="100%" className='ims' />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* CBSE Section */}
         <section className='cbse space'>
            <div className='container'>
               <div className='row'>
                  <div className='col-md-6'>
                     <div className='left-cbse'>
                        <img src={cbseimg} alt="" width="100%" className='ims' />
                     </div>
                  </div>
                  <div className='col-md-6'>
                     <div className='right-cbse'>
                        <h2>2.CBSE(Central Board of Secondary Education)</h2>
                        <p>* Conducted by the <b>Government of India (National level).</b></p>
                        <p>*Popular across India, with a syllabus that is <b>balanced and concept-focused.</b> </p>
                        <p>* More emphasis on <b>Maths and Science</b>, making it easier for competitive exams like <b>NEET, JEE, UPSC.</b></p>
                        <p>* Follows <b>NCERT books</b>, which are simple and standardized.</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Maticulation section*/}
         <section className='matric space'>
            <div className="container">
               <div className='row'>
                  <div className='col-md-6'>
                     <div className='left-matric'>
                        <h2>3.Matriculation</h2>
                        <p>* Mainly followed in <b>Tamilnadu and Some other States.</b></p>
                        <p>* Gives Importance to <b>English language and rote learning.</b></p>
                        <p>* The Syllabus is somewhat similar to state board but slightly more <b>English-Medium Oriented.</b></p>
                        <p>* Students are shifted to <b>State Board Syllabus</b> in higher Secondary(11th & 12th)</p>
                     </div>
                  </div>
                  <div className='col-md-6'>
                     <div className='right-matric'>
                        <img src={matric} alt="ICSE" width="100%" className='ims' />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* State Board Section */}
         <section className='sboard space'>
            <div className='container'>
               <div className='row'>
                  <div className='col-md-6'>
                     <div className='left-sboard'>
                        <img src={state} alt="" width="100%" className='ims' />
                     </div>
                  </div>
                  <div className='col-md-6'>
                     <div className='right-sboard'>
                        <h2>4.State Board</h2>
                        <p>* Conducted seperated by each <b>State Government's Eduaction Board.</b></p>
                        <p>* Syllabus may vary from state to state.</p>
                        <p>* Focuses on <b>Local Culture , Regional language, and State Priorities.</b></p>
                        <p>* Comparatively <b>Less Pressure</b>, easier for scoring marks.</p>
                        <p>* Helpful for Students preparing for <b>State-level exams.</b></p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}
export default Home;