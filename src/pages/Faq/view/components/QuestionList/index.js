import React from 'react'

function QuestionList({data}) {
  return (
    <div className='bs-question-list'>
        <ul className='bs-question-list__list-wrap'>
            {data.map((item, index) => {
                return (
                    <li className='bs-question-list__list-item' key={index}>
                        <label className='bs-question-list__question'>{item.question}</label>
                        <div className='bs-question-list__answer-wrap' dangerouslySetInnerHTML={{__html: item.answer}}></div>
                        {item?.features ? (
                            <div className="bs-question-list__feature lyt-features">
                                {item?.features?.map((ele, index) => {
                                    return (
                                    <div className='mod-icon-info' key={index}>
                                        <div className='mod-icon-info__icon-wrap'>
                                            <span className={`icon icon-${ele.icon}`}></span>
                                        </div>
                                        <div className='mod-icon-info__info-wrap'>
                                            <p className='mod-icon-info__desc' dangerouslySetInnerHTML={{__html: ele.title}}></p>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        ): null}
                        {item.meta && <p className='bs-question-list__meta-info'>{item.meta}</p>}
                        {item.info && (
                            <ul className='bs-question-list__table-list'>
                                {item?.info?.map((ele, index) => {
                                    return (
                                        <li className='bs-question-list__table-row' key={index}>
                                            <div className='bs-question-list__table-item'>
                                                <div className='bs-question-list__table-title-wrap'>
                                                    <h3 className='bs-question-list__table-title'>{ele.label}</h3>
                                                </div>
                                                <div className='bs-question-list__table-info-wrap'>
                                                    <p className='bs-question-list__table-info'>{ele.desc}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                        
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default QuestionList