import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Modal , Button  , notification, Spin} from 'antd';
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import {fetchProduct, purchaseProduct, depositAmount} from '../Api/productApi'
import {getMe} from '../Api/authApi'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export function BuyerDashboard() {
    const [depositModal, setDepositModal] = useState<boolean>(false);
    const [purchaseModal ,setPurchaseModal] = useState<boolean>(false);
    const [products, setProducts] = useState<any>([]);
    const [me, setMe] = useState<any>({});
    const [productIds, setProductIds] = useState<any>([]);
    const [amount, setAmount] = useState<any>(0)
    const [selectedProduct, setSelectedProduct] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const naviate = useNavigate();
    

    React.useEffect(()=>{
        if(products.length === 0) {
            setIsLoading(true)
            setTimeout(getProducts, 3000);
        }
    },[])

    const getProducts = async() => {
        try {
            setIsLoading(true)
            const response = await fetchProduct();
            const me = await getMe();
            if(response.status === 200) {
                setProducts(response?.data?.data)
                setIsLoading(false)
                //@ts-ignore
            }
            if(me.status === 200) {
                setMe(me?.data?.data)
                //@ts-ignore
                const ids = []
                me?.data?.data?.productIds.map((obj:any) => {
                    ids.push(obj._id)
                })
                //@ts-ignore
                setProductIds(ids);
            }
        }catch(error) {
            //@ts-ignore
            setIsLoading(false)
            notification.error({
                //@ts-ignore
                message: error.message,
                onClick: () => {
                  console.log('Notification Clicked!');
                },
              });
            naviate('/login')
        }
    } 

    const handlePurchaseProduct = async()=> {
        const payload = {
            "productIds": [{"_id": selectedProduct._id}],
            "amount": amount
        }
      const response = await purchaseProduct(payload)
      if(response.status === 200) {
        getProducts()
        setPurchaseModal(false)
        notification.success({
            message: response.data.message,
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
      }else {
        notification.error({
            message: 'Network Error',
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
      }
	}

    const handleSubmit=async(event:any)=> {
        event.preventDefault()
        const response = await depositAmount({amount});
        if(response.status === 200) {
            setDepositModal(false);
            notification.success({
                message: 'Amount deposited',
                onClick: () => {
                  console.log('Notification Clicked!');
                },
              });
            getProducts()
        }else {
            notification.error({
                message: 'Network Error',
                onClick: () => {
                  console.log('Notification Clicked!');
                },
              });
        }
    }

    const handleDepositModal=async(data:any) => {
        setSelectedProduct(data);
        setPurchaseModal(true)
    }

    const handleSignOut=async() => {
        localStorage.removeItem('token');
        naviate('/login')
    }

    return(
        <div className="col-md-6 col-md-offset-3 product-listview">
            <div className="product-action">
            <h2 className="product-title">Products</h2>
            <div className="form-group">
		         <Button  className="btn btn-primary" onClick={()=>setDepositModal(true)}>Deposit Amount</Button>
                 <Button  className="btn btn-primary" onClick={()=>handleSignOut()}>Signout</Button>
                 <Button  className="btn btn-primary" onClick={()=>handleSignOut()}>Remaining Amount({me?.remainingAmount})</Button>
		    </div>
            </div>
            {isLoading && <Spin indicator={antIcon} size="large"/>}
            {!isLoading && products.length > 0 && (
                <table className="table-bordered buyer-saler-table">
                    <thead>
                    <tr>
                        <th className='paddingLeft'>{'Title'}</th>
                        <th className='paddingLeft'>{'Description'}</th>
                        <th className='paddingLeft'>{'Prize'}</th>
                        <th className='paddingLeft'>{'Purchase'}</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {products.map ((pr: any, i:any) => {
                        return(
                            <tr key = {i}>
                                <td className='paddingLeft'>{_.get(pr,'title' , '')}</td>
                                <td className='paddingLeft'>{_.get(pr,'description' , '')}</td>
                                <td className='paddingLeft'>{_.get(pr,'prize' , '')}</td>
                                <td>
                                {
                                !productIds.includes(pr._id) ? 
                                    <Button  className="paddingLeft btn btn-primary" onClick={()=>handleDepositModal(pr)}>Purchase</Button>:
                                    <Button  className="paddingLeft btn btn-primary">Already Purchased</Button>
                                }
                                </td>

                            </tr>
                        )
                    })}
                    </tbody>
		       </table>
              )}
              {!isLoading && products.length === 0 && <h2>No products purchased by you</h2>}
              <Modal
		          title="Deposit Amount"
		          visible={depositModal}
		          onOk={(event) => handleSubmit(event)}
		          onCancel={()=>setDepositModal(!depositModal)}
	           >
			       <form className={'dip-form'}>
                    <div className={'form-group'}>
                        <label htmlFor="password">Deposit Amount</label>
                        <select name="userType" id="userType" onChange={(e)=>setAmount(parseInt(e.target.value))}>
                            <option value="admin">Select deposit Amount</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
			      </form> 
	           </Modal>
               <Modal
		          title="Purchase Product"
		          visible={purchaseModal}
		          onOk={() => handlePurchaseProduct()}
		          onCancel={()=>setPurchaseModal(!purchaseModal)}
	           >
			       <form className={'dip-form'}>
                    <div className={'form-group'}>
                        <label htmlFor="password">Deposit Amount</label>
                        <select name="userType" id="userType" onChange={(e)=>setAmount(parseInt(e.target.value))}>
                            <option value="admin">Select deposit Amount</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
			      </form> 
	           </Modal>
        </div>
    )
}