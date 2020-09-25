import React, { useState } from 'react';
import DrawableCanvas from './DrawableCanvas';

function Canvas() {

    const [remarks, setRemarks] = useState([]);

    const saveRemark = (newRemark) => {
        console.log(remarks);
        setRemarks([ ...remarks , newRemark]);
    }

    return(
        <div>
            <DrawableCanvas remarks={remarks} saveFunction={saveRemark}/>
        </div>
    );
}

export default Canvas;