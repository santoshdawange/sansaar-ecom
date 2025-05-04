import React from 'react';
import SectionBanner from '../../../common/components/SectionBanner';
import Infography from '../../../common/components/Infography';
import Profile from './components/Profile';


function OurJourney() {
  return (
    <>
        <div className='bs-section bs-section--typ-element'>
            <div className='bs-section__section-cont'>
                <Infography
                    imageUrl="d1_djk3ng.jpg"
                    titleBreak="message"
                    title="from our directors"
                    quote={true}
                    desc="Sansaar is a tribute to the enduring bond between humanity and the natural world, reminding us that true beauty lies in living consciously and sustainably."
                    author="Sanjana & Sarah Arora"
                />
            </div>
        </div>
        <div className='bs-section cm-no-padding bs-section--typ-grey'>
            <div className='bs-section__section-cont'>
                <Infography
                    imageUrl="about-sansaar.jpg"
                    title="about sansaar"
                    desc="Welcome to Sansaar, where luxury meets consciousness. Founded by the house of D’Decor, Sansaar means ‘world’. It reflects our global outlook and dedication to eco-friendly sophistication. Every fabric within every home decor collection is meticulously crafted, blending minimalistic design with sustainable practices."
                    desc2="Sansaar is for those who choose to care for the planet, for their family, and for the legacy they leave behind. We inspire mindful living and elevate everyday spaces with fabrics that are both timeless and responsibly made. Live consciously with Sansaar."
                    reverse={true}
                    variant="no-space"
                />
            </div>
        </div>
        <div className='bs-section lyt-directors'>
            <div className='bs-section__section-head lyt-directors__title-wrap'>
                <h2 className='bs-section__title lyt-directors__title'>meet the architects of sansaar</h2>
                <label className='mod-label'>Board of Directors</label>
            </div>
            <div className='bs-section__section-cont lyt-directors__cont-wrap'>
                <ul className='lyt-directors__list-wrap'>
                    <li className='lyt-directors__list-item'>
                        <Profile
                            imageUrl='Sanjay-Arora.jpg'
                            name="Sanjay Arora"
                            designation="Managing Director"
                        />
                    </li>
                    <li className='lyt-directors__list-item'>
                        <Profile
                            imageUrl='Ina-Arora.jpg'
                            name="Ina Arora"
                            designation="director - product development"
                        />
                    </li>
                    <li className='lyt-directors__list-item'>
                        <Profile
                            imageUrl='Sanjana-Arora.jpg'
                            name="Sanjana Arora"
                            designation="Business Head"
                        />
                    </li>
                    <li className='lyt-directors__list-item'>
                        <Profile
                            imageUrl='Sarah-Arora.jpg'
                            name="Sarah Arora"
                            designation="Creative Director"
                        />
                    </li>
                </ul>
            </div>
        </div>
        <div className='bs-section cm-no-padding bs-section--typ-grey cm-separator'>
            <div className='bs-section__section-cont'>
                <SectionBanner
                    imageUrl="section-bannner-2.jpg"
                    title="our legacy" 
                    desc="As a D'Decor brand, Sansaar upholds the legacy of excellence established since 1999, renowned globally for its quality and innovation in curtain and upholstery fabrics. This tradition of pioneering designs seamlessly extends to Sansaar, ensuring a conscious future where style and sustainability go hand in hand."
                />
            </div>
        </div>
        <div className='bs-section bs-section--typ-element bs-section--sec-mission'>
            <div className='bs-section__section-cont'>
                <Infography
                    imageUrl="home-2.jpg"
                    title="mission"
                    desc="At Sansaar, our mission is to meticulously craft home decor fabrics that epitomize the seamless fusion of luxury and sustainability."
                    desc2="Through our fabrics, we’re dedicated to preserving our planet. Right from sourcing recycled materials to energy efficient production."
                    reverse={true}
                />
            </div>
        </div>
        <div className='bs-section bs-section--typ-grey'>
            <div className='bs-section__section-cont'>
                <Infography
                    imageUrl="poster_jv6s9m.webp"
                    desc="Living consciously invites us to consider the impact of our choices, from the fabrics we choose to the values they represent in our homes."
                    type="sm"
                    viewInModal={true}  
                    quote={true}
                    videoUrl = "https://res.cloudinary.com/dci1aiukm/video/upload/v1724218448/brand.mp4"
                    videoPosterImg="https://res.cloudinary.com/dci1aiukm/image/upload/w_300,h_200,c_fill,q_auto,f_jpg/v1724226761/poster.webp"
                />
            </div>
        </div>
    </>
  )
}

export default OurJourney