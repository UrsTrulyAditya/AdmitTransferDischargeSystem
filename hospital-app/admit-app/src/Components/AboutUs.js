import React from 'react';
// import './aboutus.css';

const AboutUs = () => {
  return (
    <section id="about" className="about py">
      <div className="about-inner">
        <div className="container grid">
          <div className="about-left text-center">
            <div className="section-head">
              <h2>About Us</h2>
              <div className="border-line"></div>
            </div>
            <p className="text text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae molestias delectus facilis, temporibus eum consectetur, a debitis exercitationem quae distinctio aliquid ea ipsam vitae esse amet soluta maxime dolorem? Inventore ut maiores illo ipsum nisi, nulla eligendi unde reiciendis quod voluptas velit sit voluptate perferendis cum pariatur molestiae tenetur repellat!</p>
            <a href="#" className="btn btn-white">Learn More</a>
          </div>
          <div className="about-right flex">
            <div className="img">
              <img src="images/about-img.png" alt="about us" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
