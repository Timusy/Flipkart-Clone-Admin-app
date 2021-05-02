import React,{useState} from "react";
import Layout from "../../components/layout";
import {Container,Row,Col,Modal,Button,Table} from "react-bootstrap";
import Input from "../../components/UI/Input";
import {useDispatch,useSelector} from "react-redux";
import {addProduct,deleteProductById } from "../../actions";
import Model from "../../components/UI/Model";
import "./style.css";
import {generatePublicUrl} from "../../urlConfig";

const Products=function(props){

  const category=useSelector(function(state){
    return state.category;
  });

  const [name,setName]=useState('');
  const [quantity,setQuantity]=useState('');
  const [price,setPrice]=useState('');
  const [description,setDescription]=useState('');
  const [categoryId,setCategoryId]=useState('');
  const [productPicture,setProductPicture]=useState('');
  const [show, setShow] = useState(false);
  const [productDetailModal,setProductDetailModal]=useState(false);
  const [productDetails,setProductDetails]=useState(null);
  const product=useSelector(state=>state.product);

  const dispatch=useDispatch();


  const handleClose = () => {
    const form=new FormData();
    form.append("name",name);
    form.append("quantity",quantity);
    form.append("price",price);
    form.append("description",description);
    form.append("category",categoryId);
    for(let pic of productPicture){
      form.append("productPicture",pic);
    }

    dispatch(addProduct(form));

    setShow(false);
  }
  const handleShow = () => setShow(true);

  const createCategoryList=function(categories,options=[]){
    for(let category of categories){
      options.push({value:category._id,name:category.name});
      if(category.children.length>0){
        createCategoryList(category.children,options);
      }
    }
    return options;
  }

  const handleProductPictures=function(e){

    setProductPicture([
      ...productPicture,
      e.target.files[0]
    ]);
  }

console.log(productPicture);
const renderProducts=function(){
  return (
    <Table style={{fontSize:14}} responsive="sm">
<thead>
<tr>
<th>#</th>
<th>Name</th>
<th>Price</th>
<th>Quantity</th>

<th>Category</th>
 <th>Actions</th>
</tr>
</thead>
<tbody>
{
  product.products.length>0?
  product.products.map(product=>
  <tr  key={product._id}>
  <td>1</td>
  <td>{product.name}</td>
  <td>{product.price}</td>
  <td>{product.quantity}</td>

  <td>{product.category.name}</td>
  <td>
                    <button onClick={() => showProductDetailsModal(product)}>
                      info
                    </button>
                 <button
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                      del
                    </button>
      </td>

  </tr>):null
}


</tbody>
</Table>
  );
}

const renderAddProductModal=function(){
  return ( <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add new Product</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Input
        value={name}
        placeholder={'Product Name'}
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
        type="text"

    />
       <Input
           value={price}
           placeholder={'Price'}
           onChange={(e) => setPrice(e.target.value)}
           autoComplete="off"
           type="text"

       />
       <Input
           value={quantity}
           placeholder={'Quantity'}
           onChange={(e) => setQuantity(e.target.value)}
           autoComplete="off"
           type="text"

       />

       <Input
           value={description}
           placeholder={'Description'}
           onChange={(e) => setDescription(e.target.value)}
           autoComplete="off"
           type="text"

       />
       <select value={categoryId} className="form-control" onChange={(e)=>setCategoryId(e.target.value)}>
           <option>Select Category</option>
           {
             createCategoryList(category.categories).map(option=>
               <option key={option.value} value={option.value}>{option.name}</option>

             )
           }
       </select>
       {
         productPicture.length>0?
         productPicture.map((pic,index)=> <div key={index}>{pic.name}</div>):null
       }

       <Input type="file" name="productPicture" onChange={handleProductPictures}/>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleClose}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
);
}
const handleCloseProductDetailsModal=()=>{
   setProductDetailModal(false);
}
const showProductDetailsModal=(product)=>{
  setProductDetails(product);
  setProductDetailModal(true);
   //console.log(product)
}

const renderProductDetailsModal=function(){
  if(!productDetails){
    return null;
  }
  return (
    <Model
      show={productDetailModal}
      handleClose={handleCloseProductDetailsModal}
      modalTitle={'Product Details'}
      size="lg">

     <Row>
     <Col md='6'>
        <label className="key">Name</label>
        <p className="value">{productDetails.name}</p>
     </Col>
     <Col md='6'>
        <label className="key">Price</label>
        <p className="value">{productDetails.price}</p>
     </Col>
     </Row>
     <Row>
     <Col md='6'>
        <label className="key">Quantity</label>
        <p className="value">{productDetails.quantity}</p>
     </Col>
     <Col md='6'>
        <label className="key">Category</label>
        <p className="value">{productDetails.category.name}</p>
     </Col>
     </Row>
     <Row>
     <Col md='12'>
        <label className="key">Description</label>
        <p className="value">{productDetails.description}</p>
     </Col>

     </Row>
     <Row>
     <Col >
        <label className="key">Product Pictures</label>
        <div style={{display:"flex"}}>
        {productDetails.productPicture.map(picture=>
          <div className="productImgContainer">
            <img className="pic" src={generatePublicUrl(picture.img)}/>
          </div>
        )}
        </div>

     </Col>
     </Row>

    </Model>
  );
}

  return(
    <Layout sidebar>
        <Container>
        <Row>
           <Col md={12}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
               <h3>Product</h3>
               <button onClick={handleShow}>Add</button>
            </div>

           </Col>
        </Row>
        <Row>
            <Col>
               {renderProducts()}
            </Col>
        </Row>
        </Container>
          {renderAddProductModal()}
          {renderProductDetailsModal()}
    </Layout>
  );
}

export default Products;
