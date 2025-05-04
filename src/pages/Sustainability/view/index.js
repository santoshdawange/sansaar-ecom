import SectionBanner from '@common/components/SectionBanner';
import React from 'react'
import Challenge from './components/Challenge';
import IconText from '@common/components/IconText';
import Goals from './components/Goals';
import FootPrint from './components/FootPrint';
import Certifications from './components/Certifications';

const footPrintData = [
    {
        id:1,
        title: 'optimized <br/> energy efficiency',
        info: 'Installation of air pre-heaters and economizers for enhanced boiler performance.',
        imgId: 'energy-efficiency.jpg'
    },
    {
        id:2,
        title: 'emission reduction',
        info: 'Implemented Electrostatic Precipitators (ESP) and wet scrubbers to significantly <br/> lower SOx and NOx emissions.',
        imgId: 'emmision-reduction.jpg'
    },
    {
        id:3,
        title: '5-star rating',
        info: 'Awarded a 5-star rating by the State Pollution Control Board for our unwavering <br/> commitment to environmental stewardship.',
        imgId: 'rating.png'
    }
]

const certificateData = [
    {
        id: 1,
        title: '<b>Oeko-Tex: Made in Green</b> is a traceable product label for all kinds of',
        info: [
            {
                id: 1,
                text: 'textiles and leather products that have been manufactured in environmentally friendly facilities under safe and socially responsible working conditions.'
            },
            {
                id: 2,
                text: 'Products adorned with this label signify a commitment to sustainability, transparency and responsible production processes.'
            }
        ],
        imgId: 'certificate-1.png',
        orderXs : 1
    },
    {
        id: 2,
        title: '<b>GRS ( Global Recycled Standard)</b> is a standard of verification for companies to determine the recycled content of their fabrics. It ensures that social and environmental criteria are met throughout the supply chain.',
        info: [
            {
                id: 1,
                text: 'GRS helps consumer make more informed choices and supports the transition to a more circular and sustainable economy.'
            }
        ],
        imgId: 'certificate-2.png',
        orderXs : 3
    },
    {
        id: 3,
        title: '<b>Oeko-Tex: Standard 100</b>  is one of the worlds best-known labels for textiles tested for harmful substances.',
        info: [
            {
                id: 1,
                text: 'It stands for customer confidence and high product safety.'
            }
        ],
        imgId: 'certificate-3.png',
        orderXs : 2
    },
    {
        id: 4,
        title: '<b>Eco Friendly Fabrics</b> are those that have minimal negative impact on the environment throughout their life cycle.',
        info: [
            {
                id: 1,
                text: 'These fabrics help reduce resource consumption, minimize pollution, and promote sustainable practices in the textile industry.'
            }
        ],
        imgId: 'certificate-4.png',
        orderXs : 6
    },
    {
        id: 5,
        title: '<b>OCS ( Organic Content Standard )</b> is a certification awarded to goods that are guaranteed as containing organic content such as organic cotton.',
        info: [
            {
                id: 1,
                text: 'Each party involved in the chain of production, from yarn supply through to finished goods, is closely audited, and controlled to ensure the item contains genuine organic content.'
            }
        ],
        imgId: 'certificate-5.png',
        orderXs : 4
    },
    {
        id: 6,
        title: '<b>Better Cotton</b> is a global not-for-profit organisation that promotes sustainable cotton production.',
        info: [
            {
                id: 1,
                text: 'The Better Cotton Standard System (BCSS) is a holistic approach to sustainable cotton production which covers all three pillars of sustainability: environmental, social and economic.'
            }
        ],
        imgId: 'certificate-6.png',
        orderXs : 5
    },
    {
        id: 7,
        title: '<b>ISO 9001:2015</b> is a globally recognized standard for quality management.',
        info: [
            {
                id: 1,
                text: 'It helps organizations to improve their performance, meet customer expectations and demonstrate their commitment to quality.'
            }
        ],
        imgId: 'certificate-7.png',
        orderXs : 7
    },
    {
        id: 8,
        title: '<b>SMETA ( Sedex Members Ethical Trade Audit)</b> is an audit, that helps prioritise the standards of labour, health and safety, environmental performance, and ethics within a workplace. The SMETA audit is designed to help protect workers from unsafe conditions, overwork, discrimination, low pay, and forced labour.',
        info: [
            {
                id: 1,
                text: ''
            }
        ],
        imgId: 'certificate-8.png',
        orderXs : 10
    },
    {
        id: 9,
        title: '<b>ISO 14001:2015</b> establishes the criteria for an environmental management system and can be certified.',
        info: [
            {
                id: 1,
                text: 'It provides assurance that the environmental impact of operations is being measured and improved.'
            }
        ],
        imgId: 'certificate-9.png',
        orderXs : 8
    },
    {
        id: 10,
        title: '<b>WCA ( Workplace Conditions Assessment )</b> program provides a powerful, web-based solution for companies seeking to improve workplace conditions efficiently and in accordance with widely accepted industry standards and best practices.',
        info: [
            {
                id: 1,
                text: ''
            }
        ],
        imgId: 'certificate-10.png',
        orderXs : 11
    },
    {
        id: 11,
        title: '<b>ISO 45001:2018</b> is an international standard that specifies requirements for an occupational health and safety (OH&S) management system. It provides a framework for organizations to manage risks and improve OH&S performance.',
        info: [
            {
                id: 1,
                text: ''
            }
        ],
        imgId: 'ceretificate-11.png',
        orderXs : 9
    },
]

function Sustainability() {
  return (
    <>
        <div className='bs-section cm-no-padding'>
            <div className='bs-section__section-cont'>
                <SectionBanner
                    imageUrl="sustainability-banner.jpg"
                    title="BEYOND BEAUTY: THE NEW STANDARD IN SUSTAINABILITY"
                    desc="At Sansaar, sustainability is more than a vision; it's the heart of everything we do. Our designs integrate timeless elegance with conscious choices, from ethically sourcing materials to setting a new standard for eco-friendly production. Each fabric epitomizes luxurious beauty and our dedication to a hopeful future. Join us as we pave the way towards a more responsible and beautiful world."
                    noHover={true}
                />
            </div>
        </div>
        <div className='bs-section bs-section--typ-grey bs-section--typ-challenge'>
            <div className='bs-section__section-cont'>
                <Challenge/>
            </div>
            <p className='bs-section__note'>Sources: UNEP, Global Fashion Agenda, Ellen MacArthur Foundation, Science Advances</p>
        </div>
        <div className='bs-section lyt-initiatives'>
            <div className='bs-section__section-head lyt-initiatives__head'>
                <h2 className='bs-section__title lyt-initiatives__title'>LESS IS ALWAYS MORE</h2>
                <p className='bs-section__desc lyt-initiatives__desc'>Our sustainable initiatives ensure every fabric at Sansaar reflects our commitment to elegance and environmental responsibility by using minimal resources.</p>
            </div>
            <div className='bs-section__section-cont lyt-initiatives__body'>
                <div className='lyt-initiatives__info-wrap'>
                    <h3 className='lyt-initiatives__info-title'>Less Water</h3>
                    <ul className='lyt-initiatives__info-list'>
                        <li className='lyt-initiatives__info-item'>
                            <IconText icon="drop" title="50% of water consumption is recycled & reused with effluent treatment & water recycling plan"/>
                        </li>
                        <li className='lyt-initiatives__info-item'>
                            <IconText icon="water-harvest" title="Commitment to <br/> rain water harvesting"/>
                        </li>
                    </ul>
                </div>
                <div className='lyt-initiatives__info-wrap lyt-initiatives__info-wrap--typ-lg'>
                    <h3 className='lyt-initiatives__info-title'>Less Energy</h3>
                    <ul className='lyt-initiatives__info-list'>
                        <li className='lyt-initiatives__info-item'>
                            <IconText icon="solar" title="Installed 3.15 MW rooftop solar panels replacing 8-9% of our electricity consumption with sustainable energy"/>
                        </li>
                        <li className='lyt-initiatives__info-item'>
                            <IconText icon="energy" title="7-8% of renewable energy <br/> sourced through our solar plant"/>
                        </li>
                        <li className='lyt-initiatives__info-item'>
                            <IconText icon="gases" title="5% reduction in greenhouse gases <br/> through solar power generation"/>
                        </li>
                        <li className='lyt-initiatives__info-item'>
                            <IconText icon="power-station" title="Revolutionized power conservation <br/> through LED lightings"/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='bs-section'>
            <div className='bs-section__section-head'>
                <h2 className='bs-section__title'>GOALS FOR <span className='cm-font-number'>2025</span></h2>
            </div>
            <div className='bs-section__section-cont'>
                <Goals/>
            </div>
        </div>
        <div className='bs-section bs-section--typ-element bs-section--typ-footprint'>
            <div className='bs-section__section-head'>
                <h2 className='bs-section__title'>ELEVATING ELEGANCE, LOWERING FOOTPRINT</h2>
            </div>
            <div className='bs-section__section-cont'>
                <FootPrint data={footPrintData}/>
            </div>
        </div>
        <div className='bs-section bs-section--typ-element bs-section--typ-element--typ-lg'>
            <div className='bs-section__section-head'>
                <h2 className='bs-section__title'>certifications</h2>
                <p className='bs-section__desc'>Sansaar exemplifies excellence through extensive certifications across our state-of-the-art manufacturing facilities, recognized by industry-leading agencies. These certifications underscore our unwavering dedication to meticulous practices, from premium infrastructure and select raw materials to exacting processes.</p>
            </div>
            <div className='bs-section__section-cont'>
                <Certifications data={certificateData}/>
            </div>
        </div>
    
    </>
  )
}

export default Sustainability