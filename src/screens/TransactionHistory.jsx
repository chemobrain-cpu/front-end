import React, { useState,useEffect } from 'react';
import styles from './TransactionHistory.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { fetchTransfersAccount,fetchDeposits } from '../store/action/userAppStorage';
import Loader from '../components/Modal/LoadingModal';
import Modal from '../components/Modal/Modal';
import FormModal from '../components/Modal/FormModal';



function TransactionHistory() {
    let [isSpend, setIsSpend] = useState(false)
    let [isTransferData,setIsTransferData] = useState([])
    let [isWithdrawData,setIsDepositData] = useState([])
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let {user } = useSelector(state => state.userAuth)
    let [isInfoModal, setIsInfoModal] = useState(false)
    let [isData, setIsData] = useState({})


    /*
    {
    _id: 65781558bd75dd1618054de7,
    transactionId: 'kP47h0phLO',
    date: 2023-11-12T00:00:00.000Z,
    amount: '200',
    transactionType: 'Spend',
    accountNumber: '0060006000',
    routeNumber: '7878',
    reason: '0000000',
    accountName: 'Jogn stwart',
    nameOfBank: 'America Bank',
    nameOfCountry: 'Jamiaca',
    user: 6570d93871a7bc27181e9e0a,
    __v: 0
  },





   
    
})



















    */


   

    //initialising reduzx
    let dispatch = useDispatch()
    let { color } = useSelector(state => state.userAuth)
    //initialise router
    let navigate = useNavigate()

    //fetch favourite List
    
    useEffect(()=>{
        fetchTransfer()
        fetchAllDeposit()

    },[])



    let fetchTransfer = async()=>{
        let res = await dispatch(fetchTransfersAccount())
        if (!res.bool) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(res.message)
            return
        }
        setIsTransferData(res.message)
        setIsLoading(false)
    }


    let fetchAllDeposit = async()=>{
        let res = await dispatch(fetchDeposits())
        if (!res.bool) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(res.message)
            return
        }
        setIsDepositData(res.message)
        setIsLoading(false)
    }


    let receiveFundHandler = ()=>{
        setIsSpend(false)
    }


    let spendMoneyHandler =() =>{
        setIsSpend(true)
    }

    let closeModal = () => {
        setIsError(false)
    }



    let navigateHandler =(data)=>{
        setIsInfoModal(true)
        setIsError(false)
        setIsData(data)
    }


    let closeFormModal = ()=>{
        setIsInfoModal(false)
        setIsError(false)
    }


   


    


    return (<>
        {isLoading && <Loader />}
        {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
        {isInfoModal && <FormModal closeModal={closeFormModal} data={isData} status={isSpend}/>}

        <div className={styles.screenContainer}>
            <SideBar />
            <div className={styles.maindashboard} style={{ height: '100vh' }} >
                <Header home={false} title={'History'} />

                <div className={styles.mainscreen}>
                    <div className={styles.mainscreenleft}>

                        <div className={styles.buttonHeading}>
                            <button onClick={spendMoneyHandler} style={{backgroundColor:isSpend?'orange':' rgb(246, 237, 224)',color:isSpend?'#fff':'orange'}}>
                                Spend Money

                            </button>
                            
                            <button onClick={receiveFundHandler} style={{backgroundColor:isSpend?' rgb(241, 255, 241)':'rgb(109, 156, 109)',color:isSpend?'rgb(109, 156, 109)':'#fff'}}>
                                Receive Fund
                            </button>

                        </div>

                        {isSpend && isTransferData.map(data => <div className={styles.transactionCard} key={data._id} onClick={()=>navigateHandler(data)}>
                            <div className={styles.photoContainer}>
                            <img src={'../assets/img/boy-2.png'} alt='' />
                            </div>

                            <div className={styles.infoContainer}>
                                <p className={styles.name}>{data.accountName}</p>
                                <p>AC: {data.accountNumber}</p>
                            </div>

                            <div className={styles.priceContainer}>
                                <p>${data.amount}</p>

                                <span className='material-icons'>
                                    arrow_forward
                                </span>
                            </div>
                        </div>)}

                        {!isSpend && isWithdrawData.map(data => <div className={styles.transactionCard} key={data._id} onClick={()=>navigateHandler(data)}>
                            <div className={styles.photoContainer}>
                            <img src={'../assets/img/boy-2.png'} alt='' />
                            </div>

                            <div className={styles.infoContainer}>
                                <p className={styles.name}>{user.firstName}</p>
                                <p>AC: {user.accountNumber}</p>
                            </div>

                            <div className={styles.priceContainer}>
                                <p>${data.amount}</p>

                                <span className='material-icons'>
                                    arrow_forward
                                </span>
                            </div>
                        </div>)}
                    </div>
                </div>


            </div>
        </div>
    </>);

}


export default TransactionHistory