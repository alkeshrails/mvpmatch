import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { DeleteFilled , EditFilled , ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { Modal , Button  , Select , notification, Spin} from 'antd';
import _ from 'lodash'
import {fetchProductById, createProduct, deleteProduct, updateProduct} from '../Api/productApi'

const { Option } = Select;
const { confirm } = Modal;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export function SellerDashboard() {

    const [createProductModal, setCreateProductModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [prize, setPrize] = useState<number>(0);
    const [error, setError] = useState<any>({});
    const [products, setProducts] = useState<any>([]);
    const [editId, setEditId] = useState<string>('');
    const [editProductModal, setEditProductModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const naviate = useNavigate();

    React.useEffect(()=>{
        setIsLoading(true)
        if(products.length === 0) {
            setTimeout(getProducts, 3000)
        }
    },[])

    const getProducts = async() => {
        setIsLoading(true)
        try {
            const response = await fetchProductById();
            if(response.status === 200) {
                setProducts(response?.data?.data)
                setIsLoading(false)
            }
        }catch(error) {
            setIsLoading(false)
            notification.error({
                //@ts-ignore
                message: error.message,
                onClick: () => {
                  console.log('Notification Clicked!');
                },
            });
        }
    } 

    const handleSubmit=async(event:any)=> {
        event.preventDefault()
        const err: any = {}
        if (title === '') {
          err.title = 'Title is required';
        } 
        if (description === '' ) {
          err.password = 'Description is required.'
        }
        if (prize === 0) {
            err.prize = "Prize should be more then 0"
        }
        setError(err);
        if (!Object.keys(err).length) {
            const response = editId === '' ? await createProduct({title, description, prize}) : await updateProduct({title, description, prize, _id: editId})
            if(response.status === 200) {
                setDefaultValue();
            }
        }
    }

    const setDefaultValue = () => {
        setTitle('');
        setDescription('');
        setPrize(0);
        setError({});
        setEditId('');
        setCreateProductModal(false)
        setEditProductModal(false)
        getProducts();
    }

    const showDeleteConfirm = async(data:any)=> {
	    confirm({
	      title: 'Are you sure delete this Product?',
	      icon: <ExclamationCircleOutlined />,
	      content: '',
	      okText: 'Yes',
	      okType: 'danger',
	      cancelText: 'No',
	      async onOk() {
	        const response = await deleteProduct({_id:data._id})
            if(response.status === 200) {
                getProducts();
            }
	      },
	      onCancel() {
	        console.log('Cancel');
	      },
	    });
	}

    const showEditModal = (data:any) => {
	    setEditProductModal(true)
        setTitle(data.title)  
        setDescription(data.description)
        setPrize(data.prize)
        setEditId(data._id)
	};

    const handleSignOut=async() => {
        localStorage.removeItem('token');
        naviate('/login')
    }

    return(
        <div>
            <div className="col-md-6 col-md-offset-3 product-listview">
            <div className="product-action">
                <h2 className="product-title">Products</h2>
                <form  name="form">
		        <div className="form-group">
		         <Button  className="btn btn-primary" onClick={()=>setCreateProductModal(!createProductModal)}>Create Product</Button>
                 <Button  className="btn btn-primary" onClick={()=>handleSignOut()}>Signout</Button>
		        </div>
		      </form>
              </div>
              {isLoading && <Spin indicator={antIcon} />}
              {!isLoading && products.length > 0 && (
                <table className="buyer-saler-table table-bordered saler-table">
                    <thead>
                    <tr>
                        <th className='paddingLeft'>{'Title'}</th>
                        <th className='paddingLeft'>{'Description'}</th>
                        <th className='paddingLeft'>{'Prize'}</th>
                        <th className='paddingLeft action'>{'Edit'}</th>
                        <th className='paddingLeft action'>{'Delete'}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map ((pr: any, i:any) => {
                        return(
                            <tr key = {i}>
                                <td className='paddingLeft'>{_.get(pr,'title' , '')}</td>
                                <td className='paddingLeft'>{_.get(pr,'description' , '')}</td>
                                <td className='paddingLeft'>{_.get(pr,'prize' , '')}</td>
                                <td className='paddingLeft action'><EditFilled onClick={() => showEditModal(pr)}/></td>
                                <td className='paddingLeft action'><DeleteFilled onClick={() => showDeleteConfirm(pr)}/></td>
                            </tr>
                        )
                    })}
                    </tbody>
		       </table>
              )} 
              {!isLoading && products.length === 0 && <h2>No products created by you</h2>}
               <Modal
		          title="Create Product"
		          visible={createProductModal}
		          onOk={(event) => handleSubmit(event)}
		          onCancel={()=>setCreateProductModal(!createProductModal)}
	           >
			       <form>
			          <div className={'form-group'}>
			            <label htmlFor="title">Title</label>
			            <input type="text" className="form-control" name="title" value={title} onChange={(event)=>setTitle(event.target.value)}/> 
                        { error && error.title ?
                            <div className="error-block">{error.title}</div> : ''
                        }  
			          </div> 
			          <div className={'form-group'}>
			            <label htmlFor="description">Description</label>
			            <input type="text" className="form-control" name="description" value={description} onChange={(event)=>setDescription(event.target.value)}/>
                        { error && error.description ?
                            <div className="error-block">{error.description}</div> : ''
                        }    
			          </div> 
                      <div className={'form-group'}>
			            <label htmlFor="prize">Prize</label>
			            <input type="number" className="form-control" name="prize" value={prize} onChange={(event)=>setPrize(parseInt(event.target.value))}/>  
                        { error && error.prize ?
                            <div className="error-block">{error.prize}</div> : ''
                        }  
			          </div>  
			      </form> 
	           </Modal>
               <Modal
		          title="Edit Product"
		          visible={editProductModal}
		          onOk={(event)=>handleSubmit(event)}
		          onCancel={()=>setEditProductModal(false)}
	           >
			        <form>
			          <div className={'form-group'}>
			            <label htmlFor="title">Title</label>
			            <input type="text" className="form-control" name="title" value={title} onChange={(event)=>setTitle(event.target.value)}/> 
                        { error && error.title ?
                            <div className="error-block">{error.title}</div> : ''
                        }  
			          </div> 
			          <div className={'form-group'}>
			            <label htmlFor="description">Description</label>
			            <input type="text" className="form-control" name="description" value={description} onChange={(event)=>setDescription(event.target.value)}/>
                        { error && error.description ?
                            <div className="error-block">{error.description}</div> : ''
                        }    
			          </div> 
                      <div className={'form-group'}>
			            <label htmlFor="prize">Prize</label>
			            <input type="number" className="form-control" name="prize" value={prize} onChange={(event)=>setPrize(parseInt(event.target.value))}/>  
                        { error && error.prize ?
                            <div className="error-block">{error.prize}</div> : ''
                        }  
			          </div>  
			      </form> 
	           </Modal>
            </div>
        </div>
    )
}