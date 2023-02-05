
import Image from "next/image";
import styles from "../styles/Home.module.css";
import logo from "../assets/logo.svg";
import { Input, Form, Checkbox, Carousel } from "antd";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseSDK"

export default function Home() {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () =>{
    try{
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword,
      );
      console.log(user);
    } catch(error){
      console.log(error.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.firstSection}>
        <Image src={logo} alt="logo" />
        <h1 className={styles.title}>Selamat datang,</h1>
        <p className={styles.info}>
          Silahkan masukkan username dan password anda
        </p>
        <Form>
          <h3 className={styles.label}>Nama Pengguna</h3>
          <Form.Item name="email">
            <Input
              size="large"
              title="Nama Pengguna"
              type="text"
              placeholder="Masukkan nama pengguna"
              onChange={(event) =>{
                setLoginEmail(event.target.value);
              }}>
            </Input>
          </Form.Item>
          <h3 className={styles.label}>Password</h3>
          <Form.Item name={"password"}>
            <Input.Password
              size="large"
              placeholder="Masukkan password"
              onChange={(event) =>{
                setLoginPassword(event.target.value);
              }}
            />
          </Form.Item>
          <button className={styles.buttonLogin} onClick={login}> Masuk</button>
        </Form>
      </div>
      <div className={styles.secondSection}>
        <div className={styles.description}>
          <Carousel autoplay>
              <div>
                <h3 className={styles.label}> Memudahkan anda dalam mengusir burung </h3>
                <p className={styles.info}>Hanya dengan satu kali konfigurasi, drone akan <br /> mengelilingi area persawahan anda</p>
              </div>
              <div>
                <h3 className={styles.label}> Kendalikan area persawahan dengan cukup luas </h3>
                <p className={styles.info}>Anda dapat mengusir hama burung pada cakupan <br/> area yang luas</p>
              </div>
              <div>
                <h3 className={styles.label}> Panen tepat waktu! </h3>
                <p className={styles.info}> Waktu anda tidak terbuang hanya untuk mengusir <br/> burung. Tepat waktu saat panen! </p>
              </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
