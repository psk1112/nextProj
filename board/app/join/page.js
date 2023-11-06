'use client'
import { useState } from "react";

export default function Join() {
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('/api/join/new', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
          window.location.href = '/list';
      } else if (response.status === 400) {
        const data = await response.json();
        setIdError(data.idError || '');
        setPasswordError(data.passwordError || '');
      }
    } catch (error) {
      console.error('클라이언트 측 에러:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">이름: </label>
        <input type="text" name="name" id="name" />
        <label htmlFor="email">아이디: </label>
        <input type="text" name="email" id="email" />
        <p className="errorMessage" style={{color: 'red'}}>{idError}</p>
        <label htmlFor="password">비밀번호: </label>
        <input type="password" name="password" id="password" />
        <p className="errorMessage" style={{color: 'red'}}>{passwordError}</p>
        <button type="submit">가입요청</button>
      </form>
    </div>
  )
}