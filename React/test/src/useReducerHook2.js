import React, {useReducer} from 'react';

function reducer(state, action) {
    return {
        ...state,
        [action.name]: action.value
    }
}


const useReducerHook2 = () => {
    const [state, dispatch] =useReducer(reducer, {
        name:'',
        nickname: ""
    });

    const {name, nickname} = state;
    const onChange= e=>{
        dispatch(e.target);
    }

    
    return (
        <div className="container">
            <div>
                <input value={name} onChange={onChange} />
                <input value={nickname} onChange={onChange} />
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

export default useReducerHook2;