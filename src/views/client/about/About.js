import React from 'react'
import "./about.css";

const About = () => {
  return (
    <div className='about-container'>
      <div className='about-information'>
        <h3>
          Information
        </h3>
        <section className='about-paragrap'>
        The Posada Real is one of the most important components of the wider service industry, 
        catering for customers who require overnight accommodation. It is closely associated with the travel industry 
        and the hospitality industry, although there are notable differences in scope. In this article, you will learn 
        more about the hotel industry, 
        its links to those other service industry sectors, and the range of hotel and guest accommodation types that exist
        <ul style={{marginTop:'20px'}}>
          <li>Phone: 313329804</li>
          <li>Street: Av Basilio Vadillo #59</li>
        </ul>
        </section>
        
      </div>
      <div className='about-map'>
        <h3>
          Map
        </h3>
        <section>
        <div class="mapouter">
          <div class="gmap_canvas"><iframe width="500" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=basilio%20vadillo%2059%20armeria&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
              </iframe>
              <a href="https://www.embedgooglemap.net/blog/divi-discount-code-elegant-themes-coupon/">
              </a>
              <br/>
              <a href="https://www.embedgooglemap.net">google maps on my website</a>
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}

export default About