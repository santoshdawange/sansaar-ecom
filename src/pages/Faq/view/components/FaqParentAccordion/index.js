import { useState, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import QuestionList from '../QuestionList';

function FaqParentAccordion() {

    const panel1Ref = useRef(null);
    const panel2Ref = useRef(null);
    const panel3Ref = useRef(null);
    const panel4Ref = useRef(null);

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel, panelRef) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        // if (isExpanded && panelRef.current) {
        //     // panelRef.current.scrollTo({ behavior: 'smooth', block: 'start' });
        //     window.scrollTo(0,500);
        // }
        setTimeout(() => {
            window.scroll({
                top: panelRef.current?.offsetTop - (document.querySelector('.bs-header').clientHeight + 50),
                behavior: 'smooth'
            }) 
        }, 500)
    };

    const companyQueries = [
        {
            id: 1,
            question: 'Where does Sansaar get its name from?',
            answer: "<p>The name Sansaar, which means 'world,' embodies our commitment to a global perspective and eco-friendly sophistication. Sansaar is a new brand from <br/> the house of D'Decor Exports Pvt Ltd, which offers premium, sustainable home decor fabrics. For further details, please visit our journey page.</p>",
            features: null,
            meta: null,
            info: null
        },
        {
            id: 2,
            question: 'Where is Sansaar located?',
            answer: "<p>Sansaar is headquartered in Mumbai, Maharashtra, India. For further details, please visit our contact us page.</p>",
            features: null,
            meta: null,
            info: null
        },
        {
            id: 3,
            question: 'What does live consciously mean?',
            answer: '<p>Sansaar embodies the ethos where every action reflects our interconnectedness with the planet. For Sansaar, living consciously translates to offering <br/> products that promote sustainability, ethical practices, and well-being. By providing clear, accessible information on sustainable <br/> practices, illustrating how small changes in consumption can have significant positive impacts on our planet. We empower individuals to make informed <br/> choices that collectively contribute to a more sustainable future for all.</p><p>Our goal is to inspire consumers to integrate sustainability seamlessly into their daily lives, showing that stylish and durable home furnishings can also be <br/> environmentally responsible choices.</p>',
            features: null,
            meta: null,
            info: null
        },
        {
            id: 4,
            question: 'What sustainable practices does Sansaar follow?',
            answer: '<p>Sansaar exemplifies sustainability by meticulously crafting collections that blend minimalistic design with global aesthetics and eco-friendly practices.</p>',
            features: null,
            meta: null,
            info: null
        },
        {
            id: 5,
            question: 'Why should I choose Sansaar for my home fabrics?',
            answer: "<p>At the core of Sansaar's fabric are six key elements</p>",
            features: [
                {
                    id: 1,
                    icon: 'quality',
                    title: 'Certified <br/> Quality'
                },
                {
                    id: 2,
                    icon: 'non-toxic',
                    title: 'Safe & <br/> Non-Toxic'
                },
                {
                    id: 3,
                    icon: 'sustainably',
                    title: 'Sustainable <br/>Management <br/>Practices'
                },
                {
                    id: 4,
                    icon: 'social',
                    title: 'Social <br/> Responsibility'
                },
                {
                    id: 5,
                    icon: 'washable',
                    title: 'Washable & <br/> Resilient'
                },
                {
                    id: 6,
                    icon: 'touch',
                    title: 'Exceptional <br/> Touch'
                }
            ],
            meta: 'We are dedicated to creating home furnishing fabrics that perfectly blend luxury and sustainability.',
            info: null
        },
        {
            id: 6,
            question: 'How does Sansaar ensure high-quality standards?',
            answer: '<p>At Sansaar, we prioritize delivering premium-quality fabrics. To ensure their excellence, our fabrics undergo a series of performance tests - </p>',
            features: null,
            meta: null,
            info: [
                {
                    id: 1,
                    label: 'Martindale Abrasion Resistance',
                    desc: 'This test measures how well the fabric withstands wear and tear from rubbing and abrasion. High Martindale abrasion resistance, following the ISO 12947-2 standard.'
                },
                {
                    id: 2,
                    label: 'Pilling Resistance:',
                    desc: 'Pilling occurs when fabric fibers tangle into small balls or pills. Fabrics with high pilling resistance, following the ISO 12945-2 standard, stay smooth longer, ensuring durability.'
                },
                {
                    id: 3,
                    label: 'Color Fastness Tests (to light/to rubbing)',
                    desc: 'These tests evaluate how well fabrics retain color under stress. Light fastness tests (ISO 105-B02) (ISO 105-X12) measure resistance to sunlight, while rubbing fastness tests gauge color retention during use.'
                },
                {
                    id: 4,
                    label: 'Washing Fastness',
                    desc: 'The test determines how well colors in fabrics resist fading during normal washing procedures used for household items. To ensure accurate results, we follow the ISO 105-C06 standard.'
                },
                {
                    id: 5,
                    label: 'Fabric Shrinkage',
                    desc: 'The test measures the extent to which the fabric may shrink after washing or cleaning. For accurate results, we follow the ISO 5077 standard.'
                },
                {
                    id: 6,
                    label: 'Tear Strength',
                    desc: "Evaluates the fabric's resistance to tearing, which is crucial for home fabrics subjected to regular use and handling. For accurate results, we follow the ISO 13937-3 standard."
                },
                {
                    id: 7,
                    label: 'Seam Slippage',
                    desc: 'The test determines how well threads in woven fabrics hold together at sewn seams to prevent slipping. For accurate results, we follow the ISO 13936-2 standard.'
                },
                {
                    id: 8,
                    label: 'FR Test',
                    desc: "We follow the NFPA 701 test criteria, which measure the fabric's flammability when exposed to specific ignition sources."
                },
                {
                    id: 9,
                    label: 'Test for Light -Blocking Drapes',
                    desc: 'At Sansaar, our room darkening fabrics undergo the AATCC 2023 test. This test method measures the light-blocking properties of window covering fabrics.'
                }
            ]
        },
    ]

    const privacyPolicyData = [
        {
            id: 1,
            question: 'How do I remove my name from your mailing list?',
            answer: '<p>You can email us at <a href="mailto:contact@sansaar.co.in">contact@sansaar.co.in</a></p>',
            features: null,
            meta: null,
            info: null
        },
        {
            id: 2,
            question: 'Will you share my information with others?',
            answer: '<p>To learn more, please read our <a href="#">Terms and Conditions</a></p>',
            features: null,
            meta: null,
            info: null
        },
    ]

    const fabricAndTechnicalData = [
        {
            id: 1,
            question: 'What is martindale abrasion test?',
            answer: "<p>This test measures how well the fabric withstands wear and tear from rubbing and abrasion. High martindale abrasion resistance, following the ISO 12947-2 <br/> standard, ensures that upholstery and drapery maintain their appearance and durability over time, even with daily use.</p>",
            features: null,
            meta: null,
            info: null
        },
        {
            id: 2,
            question: 'What does it mean for fabric to be fire retardant?',
            answer: "<p>The FR (Fire Retardancy) test evaluates the fabric's resistance to catching and spreading fire. This ensures that draperies and curtains meet safety <br/> standards and provide fire protection in homes and commercial spaces. We meet the NFPA 701 test criteria, which measure the fabric's flammability when <br/> exposed to specific ignition sources.</p>",
            features: null,
            meta: null,
            info: null
        },
        {
            id: 3,
            question: 'Why opt for wide width fabric when choosing curtains?',
            answer: '<p>Wide width fabrics are chosen for curtains because they provide a seamless appearance with minimal interruptions from seams. This results in a more <br/> elegant and polished look in your living space.</p>',
            features: null,
            meta: null,
            info: null
        },
        {
            id: 4,
            question: 'What does the term railroad mean in a fabric?',
            answer: '<p>When a fabric is railroaded, it means that the pattern or design runs horizontally across the width of the fabric, rather than vertically from top to bottom. <br/> Railroaded fabric allows for seamless application across wide spaces without the need for vertical seams. </p><p>This orientation can be advantageous in reducing fabric waste and achieving a continuous pattern or design, especially for curtains where a horizontal <br/> pattern or design is desired.</p>',
            features: null,
            meta: null,
            info: null
        },
    ]

    const orderAndPrimaryData = [
        {
            id: 1,
            question: 'How can I buy Sansaar products?',
            answer: "<p>Sansaar fabrics are available at all D'Decor exclusive stores and other leading home furnishing stores.<br/>For further details, please visit our <a href='/contact-us'>contact us</a> page.</p>",
            features: null,
            meta: null,
            info: null
        },
        {
            id: 2,
            question: 'Whom should I contact if I have queries regarding my order?',
            answer: '<p>You can contact the retailer for order related details.</p>',
            features: null,
            meta: null,
            info: null
        },
        {
            id: 3,
            question: 'How do I find out prices?',
            answer: '<p>The price of each fabric is mentioned on our collections listing page.</p>',
            features: null,
            meta: null,
            info: null
        },
        {
            id: 4,
            question: 'How do I apply for a dealership account?',
            answer: '<p>You can connect with our head office via <a href="/contact-us">contact us</a> page.</p>',
            features: null,
            meta: null,
            info: null
        },
        {
            id: 5,
            question: 'How do I contact customer service?',
            answer: '<p>Please refer our <a href="/contact-us">contact us</a> page.</p>',
            features: null,
            meta: null,
            info: null
        },
    ]

    return (
        <div className='bs-accordion'>
            <Accordion ref={panel1Ref} expanded={expanded === 'panel1'} onChange={handleChange('panel1', panel1Ref)} className='bs-accordion__item'>
                <AccordionSummary
                    expandIcon={<span className='bs-accordion__icon icon icon-down'></span>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className='bs-accordion__item-title-wrap'
                >
                    <h3 className='bs-accordion__title'>Company Queries</h3>
                </AccordionSummary>
                <AccordionDetails className='bs-accordion__item-cont-wrap'>
                    <QuestionList data={companyQueries} />
                </AccordionDetails>
            </Accordion>
            <Accordion ref={panel2Ref} expanded={expanded === 'panel2'} onChange={handleChange('panel2', panel2Ref)} className='bs-accordion__item'>
                <AccordionSummary
                    expandIcon={<span className='bs-accordion__icon icon icon-down'></span>}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                    className='bs-accordion__item-title-wrap'
                >
                    <h3 className='bs-accordion__title'>Orders and Payment Queries</h3>
                </AccordionSummary>
                <AccordionDetails className='bs-accordion__item-cont-wrap'>
                    <QuestionList data={orderAndPrimaryData} />
                </AccordionDetails>
            </Accordion>
            <Accordion ref={panel3Ref} expanded={expanded === 'panel3'} onChange={handleChange('panel3', panel3Ref)} className='bs-accordion__item'>
                <AccordionSummary
                    expandIcon={<span className='bs-accordion__icon icon icon-down'></span>}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                    className='bs-accordion__item-title-wrap'
                >
                    <h3 className='bs-accordion__title'>Fabric Technical Queries</h3>
                </AccordionSummary>
                <AccordionDetails className='bs-accordion__item-cont-wrap'>
                    <QuestionList data={fabricAndTechnicalData} />
                </AccordionDetails>
            </Accordion>
            <Accordion ref={panel4Ref} expanded={expanded === 'panel4'} onChange={handleChange('panel4', panel4Ref)} className='bs-accordion__item'>
                <AccordionSummary
                    expandIcon={<span className='bs-accordion__icon icon icon-down'></span>}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                    className='bs-accordion__item-title-wrap'
                >
                    <h3 className='bs-accordion__title'>Privacy Policy</h3>
                </AccordionSummary>
                <AccordionDetails className='bs-accordion__item-cont-wrap'>
                    <QuestionList data={privacyPolicyData} />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default FaqParentAccordion