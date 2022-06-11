import React from 'react';
import useInput from './UseCustom';

const UseCustomAct = () => {
    const [state, onChange] = useInput({
        name:'',
        nickname: ""
    });

    const {name, nickname} = state;

    return (
        <div className="container">
            <p className="title">useCustom</p>
            <div>
                <input name="name"value={name} onChange={onChange} />
                <input name="nickname" value={nickname} onChange={onChange} />
            </div>
            <div>
                <div>
                    <b>이름:</b>{name}
                </div>
                <div>
                    <b>닉네임:</b>{nickname}
                </div>
            </div>
        </div>
    );
};

export default UseCustomAct;