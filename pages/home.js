import Image from "next/image";
import styles from "../styles/Dashboard.module.css";
import logo from "../assets/logo.svg";
import logout from "../assets/logout.svg";
import Link from 'next/link';
import homemain from "../assets/homemain.svg";
import calgray from "../assets/calgray.svg";
import dronegray from "../assets/dronegray.svg";
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Table } from 'antd';
import { columns, data } from "../services/Table";
import { Card, Col, Row, Statistic } from 'antd';
import { ClockCircleFilled, SoundFilled } from '@ant-design/icons';
import user from "../assets/user.svg";
import firebaseApp from "../services/firebaseSDK";
import { getDatabase, ref, child, get} from 'firebase/database'
import { db } from "../services/firebaseSDK";
import { collection,getDocs } from "firebase/firestore"
import { Bar,Line, Scatter, Bubble } from "react-chartjs-2";

export default function DashboardHome() {

        //Firebase Realtime Database
        const [snapshot, setSnapshot]= useState(false)
        const error = useRef(null)

        const getValue = async () =>{
            try{
                const realdata = getDatabase(firebaseApp)
                const rootReference = ref(realdata)
                const dbAlt = await get(child(rootReference, 'realtime'))
                const dbValue = dbAlt.val()
                setSnapshot([dbValue]);
                console.log(dbValue)
            } catch (getError){
                error.current = getError.message
            }
        }
        
        const data = Object.values(snapshot)

        useEffect(() => {
           getValue() 
        },[])


        //Firestore
        const [fireData, setFireData] = useState([]);
        const getData = async () =>{
            const databaseRef = await getDocs (collection(db, 'droneResult'))
            .then((response) =>{
                setFireData(response.docs.map((data) =>{
                    return {...data.data(), id:data.id}
                }))
            })
        }
        useEffect(()=>{
            getData()
        },[])


        //Modals Setup
        const [open, setOpen] = useState(false);
        const [confirmLoading, setConfirmLoading] = useState(false);
        const [modalText, setModalText] = useState('Apakah anda yakin untuk keluar akun?');
        const showModal = () => {
          setOpen(true);
        };
        const handleOk = () => {
          setModalText('Akun anda akan keluar dalam beberapa detik');
          setConfirmLoading(true);
          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
          }, 2000);
          location.href="localhost:3000"
        };
        const handleCancel = () => {
          console.log('Clicked cancel button');
          setOpen(false);
        };

  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>

            <Image src={logo} alt="logo" />
            <h1 className={styles.label}> Menu </h1>
            <Link href="/home">
                <button className={styles.buttonActive}>
                    <Image src={homemain} alt="homemain"/>
                    <h3 className={styles.buttonlabel}>  Beranda </h3>
                </button>
            </Link>

            <Link href="/activity"> 
                <button className={styles.button}>
                    <Image src={calgray} alt="calgray"/>
                    <h3 className={styles.buttonlabel}>   Aktivitas  </h3>
                </button>
            </Link>

            <Link href="/drone"> 
                <button className={styles.button}>
                    <Image src={dronegray} alt="dronegray"/>
                    <h3 className={styles.buttonlabel}> Statistik drone </h3>
                </button>
            </Link>
            <div className={styles.account}>
                <div className={styles.logindex}>
                    <Image src={user} alt="user"/>
                    <p className={styles.caption}>Anda masuk sebagai</p>
                </div>
                <h3 className={styles.emailuser}> johndoe@gmail.com </h3>
            </div>
            <button className={styles.buttonLogout} onClick={showModal} type="primary" >
                <Image src={logout} alt="logout"/>
                <h3 className={styles.buttonlabel}> Keluar akun </h3>
                <Modal
                    title="Keluar akun"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>{modalText}</p>
                </Modal>
            </button>

        </div>
        <div className={styles.section}>
        <div className="site-card-wrapper">
            <h3 className={styles.subtitle}> Aktivitas hari ini </h3>
            <Row gutter={24}>
                <Col span={7}>
                    <Card 
                        bordered={false}
                        style={{
                         backgroundColor: '#ffef9f',
                         paddingRight: '0px'
                    }}>
                    <h3 className={styles.cardtitle}> Altitude </h3>
                    {data.map((item) => {
                        return(
                            <div key={item.altitude}>
                                <h1 className={styles.cardinfo}> {item.altitude} mdpl </h1>
                            </div>
                        )
                    })}
                    </Card>
                </Col>
                <Col span={7}>
                    <Card 
                    bordered={false}
                    style={{
                        backgroundColor: '#c1fba4',
                    }}
                    >
                    <h3 className={styles.cardtitle}> Baterai </h3>
                    {data.map((item) => {
                        return(
                            <div key={item.baterai}>
                                <h1 className={styles.cardinfo}> {item.baterai} % </h1>
                            </div>
                        )
                    })}
                    </Card>
                </Col>
                <Col span={7}>
                    <Card 
                        bordered={false}
                        style={{
                            backgroundColor: '#ffd6e0',
                        }}
                    >
                    <h3 className={styles.cardtitle}> Status </h3>
                    {data.map((item) => {
                        return(
                            <div key={item.status}>
                                <h1 className={styles.cardinfo}> {item.status}</h1>
                            </div>
                        )
                    })}
                    </Card>
                </Col>
            </Row>
        </div>
        <h3 className={styles.subtitle}> Baru baru ini </h3>
        <Table
            columns={columns}
            dataSource={fireData}
        />
        </div>

    </div>
  );
}
