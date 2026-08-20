import React from 'react'

const HeaderBox = ({ type, title, subtext, user }: HeaderBoxProps) => {
    return (
        <div className='header-box'>
            <div className='header-box-title'>
                {title}
                {type === 'greeting' && <span className='text-bankGradient'>&nbsp;{user}</span>}
            </div>
            <div className='header-box-subtext'>{subtext}</div>
        </div>
    )
}

export default HeaderBox