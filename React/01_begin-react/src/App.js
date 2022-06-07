import React, {useState} from 'react';
import './css/Hello.min.css';

function App() {

  //input에서 value를 담기 위한 state 생성
  const [account, setAccount] = useState({
    id: "",
    password: "",
  });

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  const onChangeAccount = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const LoginCheck = ()=>{
    if( account.id === "test" && account.password === "1234"){
      alert("로그인 성공")
    }else{
      alert("로그인 실패")
    }
  }

  return (
    <div>
      <div className="container">
        <input id="id" name ="id" placeholder="아이디" onChange={onChangeAccount}/>
        <input id="id" name ="password"type="password" placeholder="비밀번호" onChange={onChangeAccount}/>
        <button onClick={LoginCheck}>로그인</button>
      </div>
    </div>
  );
}

export default App;
