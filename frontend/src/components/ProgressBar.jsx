import React from 'react';

const ProgressBar = (props) => {


        const startingSavingsWidth = props.curSavings * props.width
        const newSavingsWidth = props.newSavings * props.width
        
        console.log(startingSavingsWidth, newSavingsWidth, props.width, props.curSavings, props.newSavings)
        return (
            <div className="progress-bar grid">
                <div className='z-50 border-black border-2 col-start-1 row-start-1 rounded-full'
                style={{ width: `${props.width}px` }}>

                </div>

                <div className='z-20 h-[20px] bg-primary col-start-1 row-start-1 rounded-full'
                style={{ width: `${startingSavingsWidth}px` }}>

                </div>

                <div className=' z-10 h-[20px] bg-tertiary col-start-1 row-start-1 rounded-full'
                style={{ width: `${newSavingsWidth}px` }}>

                </div>

                {/* Border  */}
            </div>
        );
    }


export default ProgressBar;
