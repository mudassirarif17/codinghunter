import React, { useState } from 'react'
import styles from '@/styles/Contact.module.css'


const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [desc, setDesc] = useState('');
  const changeHandler = (e) => {
    // alert();
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    else if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    else if (e.target.name === "phone") {
      setPhone(e.target.value);
    }
    else if (e.target.name === "desc") {
      setDesc(e.target.value);
    }
  }
  const submitHandler = (e) => {
    // alert();
    e.preventDefault();
    const data = {name , email , phone , desc};

    fetch('http://localhost:3000/api/postcontact', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
        setName('');
        setEmail('');
        setPhone('');
        setDesc('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }
  return (
    <div className={ styles.container }>
      <h1 className={ styles.center }>Contact Us</h1>
      <form className={ styles.formStyle } onSubmit={ submitHandler }>
        <div>
          <label htmlFor="">Enter Your Name</label>
          <br />
          <input className={styles.inputStyle} type="text" name="name" id="name" value={ name } onChange={ changeHandler } />
        </div>
        <div>
          <label htmlFor="">Enter Your Email</label>
          <br />
          <input className={styles.inputStyle} type="email" name="email" id="email" value={ email } required onChange={ changeHandler } />
        </div>
        <div>
          <label htmlFor="">Enter Your Phone</label>
          <br />
          <input className={styles.inputStyle} type="phone" name="phone" id="phone" value={ phone } onChange={ changeHandler } />
        </div>
        <div>
          <label htmlFor="">Ellaborate Your Concern</label>
          <br />
          <textarea className={styles.inputStyle} name="desc" id="" cols="30" rows="7" value={ desc } onChange={ changeHandler } />
        </div>
        <div>
          <button className={styles.btn} type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Contact
