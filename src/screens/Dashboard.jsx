import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Tab from '../components/Tab';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import MenuCard from '../components/MenuCard';
import WelcomeModal from '../components/Modal/WelcomeModal';
import PaymentModal from '../components/Modal/PaymentModal';
import { fetchDeposits, fetchTransfersAccount } from '../store/action/userAppStorage';
import Modal from '../components/Modal/Modal';



let menuData = [
    {
        icon: 'payments',
        title: 'Deposit',
        url: 'deposit'
    },
    {
        icon: 'toll',
        title: 'Send Money',
        url: 'send-card'
    },
    {
        icon: 'people',
        title: 'Manage friends',
        url: 'beneficiaries'
    },
    {
        icon: 'add_card',
        title: 'Bill Pay',
        url: 'billpay'
    },
  
   
]


function Dashboard() {
    let [isError, setIsError] = useState(false)
    let [isUrl, setIsUrl] = useState(false)
    //initialising reduzx

    let [isTransfer, setIsTransfer] = useState([])

    let { user } = useSelector(state => state.userAuth)
    //initialise router
    let navigate = useNavigate()
    let [isWelcome, setIsWelcome] = useState(true)
    let [isShow, setIsShow] = useState(true)
    let [isPay, setIsPay] = useState(false)
    let [isDeposits, setIsDeposits] = useState(false)
    let [amount, setAmount] = useState('')
    let [isLoading, setIsLoading] = useState(true)
    let [isErrorInfo, setIsErrorInfo] = useState('')

    let dispatch = useDispatch()



    useEffect(() => {
        fetchDeposit()
    }, [])


    let fetchDeposit = async () => {
        setIsLoading(true)
        let res = await dispatch(fetchDeposits())
        if (!res.bool) {
            setIsLoading(false)
            return
        }
        setIsDeposits(res.message)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchTransfers()
    }, [])


    let fetchTransfers = async () => {
        let res = await dispatch(fetchTransfersAccount())
        if (!res.bool) {
            setIsError(true)
            setIsErrorInfo(res.message)
            setIsLoading(false)
            return
        }
        setIsLoading(false)
        //filtering trnsfer
        let allTransfers = res.message
        let filteredTransfer = allTransfers.filter(data => data.medium === 'Account Number')
        setIsTransfer(filteredTransfer)
        setIsLoading(false)

    }



    let navigateHandler = (data) => {
        navigate(`/${data}`)
    }

    let clickHandler = ()=>{
        setIsErrorInfo('Contact admin to continue')
        setIsError(true)
    }




  




    let closeWelcomeModal = () => {
        setIsWelcome(false)
    }

    let payHandler = () => {
        setIsPay(true)
    }

    let togglePayModal = () => {
        setIsPay(false)
    }

    let changeHandler = (dataType) => {
        setIsShow(prev => !prev)
    }

    let closeModal=()=>{
        setIsError(false)
        setIsErrorInfo('')
    }







    return (<>
    {isError && <Modal closeModal={closeModal} content={isErrorInfo} />}
        {isPay ? <PaymentModal closeFun={togglePayModal} /> : ''}
        {isWelcome && <WelcomeModal closeFavorite={closeWelcomeModal} />}
        <div className={styles.screenContainer}>
            <SideBar />
            <div className={styles.maindashboard}>
                <Header home={true} title={'Home'} />
                <div className={styles.mainscreen}>
                    <div className={styles.mainscreenleft}>
                        {/*<Wallet />*/}
                        <div className={styles.chartSection}>

                            <div className={styles.bankName}>
                                {/*<h3>First bank Nigeria</h3>*/}
                            </div>

                            <div className={styles.bankInfoCon}>
                                <div className={styles.bankInfo}>
                                    <h6>ACCOUNT NUMBER</h6>
                                    <p>{user.acountNumber}</p>

                                </div>
                                <div className={styles.bankInfo}>
                                    <h6>ACCOUNT TYPE</h6>
                                    <p>savings</p>


                                </div>
                                <div className={styles.bankInfo}>
                                    <h6>BALANCE</h6>
                                    <p>${user.walletBalance}</p>


                                </div>


                            </div>



                            <div className={styles.buttonCon}>
                                <button className={styles.button} onClick={clickHandler}><span className='material-icons'>add</span>Add account</button>
                            </div>




                        </div>

                        <div className={styles.summarySection}>
                            <div className={styles.summarySectionLeft}>
                                <h6>Account passport:</h6>

                                <div className={styles.imageContainer}>
                                    <img src={user.passportUrl}  alt='passport'/>

                                </div>


                            </div>

                            <div className={styles.summarySectionLeft}>
                                <h6>Account summary</h6>

                                <div className={styles.accountSummary}>

                                    <div className={styles.properties}>
                                        Account Number:
                                    </div>
                                    <div className={styles.propertiesValue}>
                                        {user.acountNumber}
                                    </div>



                                </div>




                                <div className={styles.accountSummary}>

                                    <div className={styles.properties}>
                                        Account Name:
                                    </div>
                                    <div className={styles.propertiesValue}>
                                        {user.firstName} {user.lastName}
                                    </div>



                                </div>

                                <div className={styles.accountSummary}>

                                    <div className={styles.properties}>
                                        Account Type:
                                    </div>
                                    <div className={styles.propertiesValue}>
                                        savings
                                    </div>



                                </div>


                                <div className={styles.accountSummary}>

                                    <div className={styles.properties}>
                                        Account Balance:
                                    </div>
                                    <div className={styles.propertiesValue}>
                                        ${user.walletBalance}
                                    </div>



                                </div>


                            </div>


                        </div>

                        <div className={styles.helpCard}>

                            <div className={styles.header} onClick={() => changeHandler()}>
                                <h4>Transfer History</h4>
                                <span className='material-icons'>
                                    {isShow ? 'expand_more' : 'chevron_right'}

                                </span>

                            </div>

                            {isShow ? <div className={styles.body}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>TransferId</th>
                                            <th> Date Of Transfer</th>
                                            <th>Amount</th>
                                            <th>Account Number</th>
                                            <th> Route Number</th>
                                            <th>Reason for transfer</th>
                                            <th>Account Name</th>
                                            <th>Name Of Bank</th>
                                            <th>Name Of Country</th>
                                            <th>  Medium</th>
                                            <th>Status</th>

                                        </tr>

                                    </thead>
                                    <tbody>

                                        {isTransfer.map(data => <tr>
                                            <td>{data.transferId}</td>
                                            <td> {data.dateOfTransfer.substring(0,10) }</td>
                                            <td>{data.amount}</td>
                                            <td>{data.accountNumber}</td>
                                            <td>{data.routeNumber}</td>
                                            <td>{data.reason}</td>
                                            <td>{data.accountName}</td>
                                            <td>{data.nameOfBank}</td>
                                            <td>{data.nameOfCountry}</td>
                                            <td>{data.medium}</td>
                                            <td style={{ color: data.status === 'Pending' ? 'red' : 'green' }}>{data.status}</td>
                                        </tr>)}


                                    </tbody>


                                </table>



                            </div> : ""}
                        </div>

                        <div className={styles.helpCard}>

                            <div className={styles.header} onClick={() => changeHandler()}>
                                <h4>Deposit History</h4>
                                <span className='material-icons'>
                                    {isShow ? 'expand_more' : 'chevron_right'}

                                </span>

                            </div>

                            {isShow ? <div className={styles.body}>

                                <table style={{ width: '800px' }}>
                                    <thead>
                                        <tr>


                                            <th>

                                                Deposit ID


                                            </th>

                                            <th>

                                                Date Of Deposit


                                            </th>
                                            <th>

                                                Amount


                                            </th>
                                            <th>

                                                Status


                                            </th>
                                            <th>

                                                action


                                            </th>

                                        </tr>

                                    </thead>
                                    <tbody>

                                        {isDeposits && isDeposits.map(data => <tr>
                                            <td>
                                                {data.depositId}
                                            </td>
                                            <td>
                                                {data.dateOfDeposit.substring(0,10)}
                                            </td>
                                            <td>
                                                ${data.amount}

                                            </td>
                                            <td className={styles.status} style={{ color: data.status === 'Pending' ? 'red' : 'green' }}>

                                                {data.status}
                                            </td>
                                            <td className={styles.pay} onClick={() => payHandler(data.amount)}>
                                                pay now
                                            </td>

                                        </tr>)}


                                    </tbody>


                                </table>



                            </div> : ""}

                        </div>



                    </div>

                    <div className={styles.mainscreenright}>
                        <div className={styles.menuContainer}>

                            {menuData.map(data => <MenuCard key={data.icon} data={data} fun={navigateHandler} />)}


                        </div>

                    </div>
                </div>


            </div>
        </div >
        {/* tab sections */}
        < Tab />
    </>);

}


export default Dashboard