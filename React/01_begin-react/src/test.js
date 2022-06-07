import React from 'react';

function Test() {
    const loginYn = "Y";
    return (
        <div>
            {(() => {
                if(loginYn === "Y"){
                    return (<div>GodDaeHee 입니다.</div>)
                }else{
                    return (<div>비회원 입니다.</div>)
                }
            })()
            }
        </div>
    );
}

export default Test;