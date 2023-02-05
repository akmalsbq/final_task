import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Dashboard.module.css";
import logo from "../assets/logo.svg";
import home from "../assets/home.svg";
import homeactive from "../assets/homeactive.svg";
import calendar from "../assets/calendar.svg";
import logout from "../assets/logout.svg";
import Link from 'next/link';
import homegray from "../assets/homegray.svg";
import homeblue from "../assets/homeblue.svg";
import homemain from "../assets/homemain.svg";
import calgray from "../assets/calgray.svg";
import calblue from "../assets/calblue.svg";
import dronegray from "../assets/dronegray.svg";
import droneblue from "../assets/droneblue.svg";
import { Input, Checkbox, Layout, Menu, theme } from "antd";

export default function DashboardActivity() {
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <Image src={logo} alt="logo" />
            <h1 className={styles.label}> Menu </h1>
            <Link href="/home">
                <button className={styles.button}>
                    <Image src={homegray} alt="homegray"/>
                    <h3 className={styles.buttonlabel}> Beranda </h3>
                </button>
            </Link>

            <Link href="/activity">
                <button className={styles.buttonActive}>
                    <Image src={calblue} alt="calblue"/>
                    <h3 className={styles.buttonlabel}> Aktivitas </h3>
                </button>
            </Link>
            
            <Link href="/drone">
                <button className={styles.button}>
                    <Image src={dronegray} alt="dronegray"/>
                    <h3 className={styles.buttonlabel}> Statistik drone </h3>
                </button>
            </Link>

            <button className={styles.buttonLogout}>
                <Image src={logout} alt="logout"/>
                <h3 className={styles.buttonlabel}> Keluar akun </h3>
            </button>
        </div>
        <div className={styles.section}>
            <h1 className={styles.title}> Selamat datang, John Doe </h1>
            <p className={styles.info}> Lama tidak bertermu, yuk pantau serangan burung yang datang ke area <br/> persawahanmu </p>
        </div>

    </div>
  );
}
