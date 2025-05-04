import SectionBanner from '@common/components/SectionBanner'
import React from 'react'
import Features from './components/Features'
import Tests from './components/Tests'
import Infography from '@common/components/Infography'

const featureData = [
    {
        id:1,
        title: 'Certified <br/>Quality',
        icon: 'quality',
        certificates:[
            {
                id:1,
                name: 'certificate-7'
            },
            {
                id:2,
                name: 'ceretificate-11'
            },
            {
                id:3,
                name: 'certificate-9'
            },
            {
                id:4,
                name:'nabl'
            }
        ],
        desc:'To ensure our fabrics meet certified standards, we conduct extensive testing verified by the NABL independent lab. This process guarantees quality and performance, ensuring our fabrics maintain their excellence through repeated use.'
    },
    {
        id:2,
        title: 'Safe & <br/> Non-Toxic',
        icon: 'non-toxic',
        certificates:[
            {
                id:1,
                name: 'certificate-3'
            },
            {
                id:2,
                name: 'certificate-4'
            }
        ],
        desc:'Our commitment to the OEKO-TEX 100 Standard ensures our fabrics are free from toxic or harmful substances. They are eco-friendly and significantly reduce environmental impact. Additionally, they are also safe to use.'
    },
    {
        id:3,
        title: 'Sustainable <br/> Management <br/> Practices',
        icon: 'sustainably',
        certificates:[
            {
                id:1,
                name: 'ceretificate-11'
            },
            {
                id:2,
                name: 'certificate-1'
            },
            {
                id:3,
                name:'certificate-2',
            },
            {
                id:4,
                name:'organic',
            }
        ],
        desc:'Our dedication to the environment is reflected in our use of sustainable materials. We practice responsible production techniques, and adhere to rigorous environmental management practices.'
    },
    {
        id:4,
        title: 'Social <br/> Responsibility',
        icon: 'social',
        certificates:[
            {
                id:1,
                name: 'certificate-9'
            },
            {
                id:2,
                name: 'certificate-8'
            }
        ],
        desc:'We embrace social responsibility by following ethical practices, maintaining health and safety standards. We also produce fabrics that reduce resource consumption, pollution, and promote sustainability.'
    },
    {
        id:5,
        title: 'Washable & <br/> Resilient',
        icon: 'washable',
        certificates:[
            {
                id:1,
                name: 'nabl'
            }
        ],
        desc:'To ensure our fabrics are both washable and durable, we perform comprehensive tests for pilling resistance, color fastness, lightfastness, abrasion & shrinkage. Our focus on longevity and consistent performance ensures that our fabrics remain high-quality and durable with ongoing use.'
    },
    {
        id:6,
        title: 'Exceptional <br/> Touch',
        icon: 'touch',
        certificates:null,
        desc:'Our meticulous attention to detail guarantees that each fabric not only meets high standards but also offers an exceptional touch and a luxurious feel.'
    }
]

const testData = [
    {
        id:1,
        title: 'martindale abrasion resistance test',
        desc:'The Martindale Abrasion Resistance Test ensures our fabrics stand the test of time. By measuring how well it withstands wear and tear from everyday rubbing and abrasion, we guarantee durability and longevity. Meeting the stringent ISO 12947-2 standard, our fabrics retain their elegance and strength, ensuring your upholstery and drapery look stunning and stay resilient, even after years.',
        imgId:'martindale-abrasion-resistance-test',
        moreInfo:null,
        dataList:null
    },
    {
        id:2,
        title: 'PILLING resistance test',
        desc:'Pilling happens when fabric fibers tangle into small, unsightly balls. Our fabrics, tested for high pilling resistance according to the ISO 12945-2 standard, stay smooth and pristine for longer. This ensures that your upholstery and drapery not only look beautiful but are also durable over time.',
        imgId:'pilling-resistance-test',
        moreInfo:null,
        dataList:null
    },
    {
        id:3,
        title: 'COLOR FASTNESS TEST',
        desc:'At Sansaar, we ensure your fabrics remain vibrant under any conditions. Our Color Fastness Tests measure resistance to sunlight, guaranteeing fabrics won’t fade even in bright environments. Rubbing fastness tests assess color retention during everyday use, ensuring your upholstery and drapery maintain their rich hues and elegant appearance.',
        imgId:'color-fastness-test',
        moreInfo:null,
        dataList:null
    },
    {
        id:4,
        title: 'WASHING FASTNESS TEST',
        desc:'Our Wash Fastness Testing evaluates how fabrics withstand fading during household washing procedures. Adhering to the ISO 105-C06 standard ensures accurate and reliable results, guaranteeing that your fabrics retain their vibrant colors wash after wash.',
        imgId:'washing-fastness-test',
        moreInfo:null,
        dataList:null
    },
    {
        id:5,
        title: 'SHRINKAGE TEST',
        desc:'At Sansaar, we meticulously assess how our fabrics respond to washing and cleaning through our Shrinkage Resistance Test. Following the ISO 5077 standard ensures our results are precise and reliable, ensuring your fabrics maintain their perfect fit wash after wash.',
        imgId:'shrinkage-test',
        moreInfo:null,
        dataList:null
    },
    {
        id:6,
        title: 'TEAR STRENGTH TEST',
        desc:'We conduct thorough evaluations to determine how effectively our fabrics withstand tearing. A crucial consideration for home fabrics exposed to frequent use and handling. Following the stringent ISO 13937-3 standard in our testing protocols ensures that we deliver precise and dependable results, ensuring durability and longevity in every fabric we offer.',
        imgId:'tear-strength-test',
        moreInfo:null,
        dataList:null
    },
    {
        id:7,
        title: 'SEAM SLIPPAGE TEST',
        desc:'Our Seam Slippage Test evaluates how effectively threads in woven fabrics hold together at sewn seams to prevent slipping. Adherence to the ISO 13936-2 standard ensures precise and reliable results.',
        imgId:'seam-slippage-test',
        moreInfo:null,
        dataList:null
    },
    {
        id:8,
        title: 'FR TEST',
        desc:'Our Flame Retardancy (FR) test assesses how well fabrics resist catching and spreading fire, ensuring draperies and curtains meet stringent safety standards for both residential and commercial spaces. Sansaar adheres to the NFPA 701 test criteria, which evaluate the fabric’s flammability when exposed to specific ignition sources.',
        imgId:'fr-test',
        moreInfo:null,
        dataList:null
    },
    {
        id:9,
        title: 'STAIN RELEASE TEST',
        desc:'At Sansaar, we provide premium fabrics designed for easy maintenance, durability against spills and stains, and high-performance quality. Using a modified AATCC standard testing method, our fabrics undergo rigorous testing that includes repeated machine washing after exposure to various stains such as food, liquids, makeup, and mud. This meticulous process guarantees that our fabrics uphold their exceptional quality and resilience over time, ensuring lasting elegance and ease of care in every setting.',
        imgId:'stain-release-test',
        moreInfo: 'Fabrics That Outlast Life’s Little Accidents, like spilling...',
        dataList: [
            {
                id: 1,
                name: 'Mud'
            },
            {
                id: 2,
                name: 'Ketchup'
            },
            {
                id: 3,
                name: 'Mayonnaise'
            },
            {
                id: 4,
                name: 'Chocolate'
            },
            {
                id: 5,
                name: 'Foundation'
            },
            {
                id: 6,
                name: 'Lipstick'
            },
            {
                id: 7,
                name: 'Oil'
            },
            {
                id: 8,
                name: 'Mascara'
            },
            {
                id: 9,
                name: 'Coffee'
            },
            {
                id: 10,
                name: 'Red wine'
            },
            {
                id: 11,
                name: 'Petroleum Jelly'
            },
            {
                id: 12,
                name: 'Mustard'
            },
            {
                id: 13,
                name: 'Ink'
            },
            {
                id: 14,
                name: 'Yogurt'
            },
            {
                id: 15,
                name: 'Red fruits'
            },
            {
                id: 16,
                name: 'Turmeric'
            },
            {
                id: 17,
                name: 'Silly putty'
            },
            {
                id: 18,
                name: 'Gravy'
            },
        ]
    },
    {
        id:10,
        title: 'LIGHT BLOCKING PERFORMANCE TEST',
        desc:'At Sansaar, our room darkening fabrics are meticulously tested using the AATCC 203 method. This test utilizes spectrophotometry to measure the light-blocking properties of our window covering fabrics. As a result ensuring our curtains effectively block all types of light from entering the room as desired.',
        imgId:'light-blocking-performance-test',
        moreInfo:null,
        dataList:null
    }
]

function QualityStandards() {
  return (
    <>
        <div className='bs-section cm-no-padding bs-section--typ-grey bs-section--pg-title'>
            <div className='bs-section__section-head'>
                <h1 className='bs-section__title'>quality standards</h1>
            </div>
        </div>
        <div className='bs-section cm-no-padding'>
            <div className='bs-section__section-cont'>
                <SectionBanner
                    imageUrl="quality-standards.jpg"
                    title="elegance that lasts forever"
                    desc="Every fabric we create undergoes rigorous testing in top-tier NABL-certified labs, ensuring unmatched durability and performance. Our commitment to ethical manufacturing and proactive environmental measures means you can trust our fabrics to be as durable as they are sustainable."
                    noHover={true}
                    view="sm"
                />
            </div>
        </div>
        <div className='bs-section bs-section--typ-grey bs-section--typ-features'>
            <div className='bs-section__section-cont'>
                <Features data={featureData}/>
            </div>
        </div>
        <div className='bs-section cm-no-padding'>
            <div className='bs-section__section-cont'>
                <Tests data={testData}/>
            </div>
        </div>
        <div className='bs-section cm-no-padding'>
            <div className='bs-section__section-cont'>
                <Infography
                    title="experience the future with our robotic warehouse"
                    imageUrl="quality-standards-video-poster.jpg"
                    desc="At Sansaar, we lead with unwavering ethical standards. From fair labor practices and transparent supply chains to environmental care and community support, every aspect of our operations reflects our commitment to integrity. By integrating these principles into our ethos, we ensure that our products not only meet the highest standards of quality but also contribute positively to society and the environment."
                    viewInModal={true}  
                    type="vertical"
                    videoUrl = "https://res.cloudinary.com/dci1aiukm/video/upload/v1725264916/Upload_20240902-052832.mp4"
                    videoPosterImg="https://res.cloudinary.com/dci1aiukm/image/upload/w_300,h_200,c_fill,q_auto,f_jpg/v1724226761/quality-standards-video-poster.jpg"
                />
            </div>
        </div>
    </>
  )
}

export default QualityStandards