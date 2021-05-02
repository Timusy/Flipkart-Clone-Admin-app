import React from 'react';
import Input from '../../../components/UI/Input';
import Model from '../../../components/UI/Model';
import {Container,Row,Col,Modal,Button} from 'react-bootstrap';


const UpdateCategoriesModal=(props)=>{
const {
       show,
       onHide,
       modalTitle,
       size,
       expandedArray,
       checkedArray,
       handleCategoryInput,
       categoryList,
       onSubmit,
       onClick
   } = props;

   console.log({expandedArray, checkedArray})
  return (

    <Modal size={size} show={show} onHide={onHide}>
     <Modal.Header closeButton>
       <Modal.Title>{modalTitle}</Modal.Title>

     </Modal.Header>
     <Modal.Body>
        <Row>
           <Col>
               <h6>Expanded Categories</h6>
           </Col>
        </Row>
        {
          expandedArray.length >0 &&
          expandedArray.map((item,index)=>
          <Row key={index}>
             <Col>
             <Input
                 value={item.name}
                 placeholder={'Category Name'}
                 onChange={(e)=> handleCategoryInput('name',e.target.value,index,'expanded')}
                 autoComplete="off"
                 type="text"

             />
             </Col>

             <Col>
             <select value={item.parentId} className="form-control" onChange={(e)=> handleCategoryInput('parentId',e.target.value,index,'expanded')}>
                 <option>Select Category</option>
                 {
                   categoryList.map(option=>
                     <option key={option.value} value={option.value}>{option.name}</option>

                   )
                 }
             </select>
             </Col>

             <Col>
                 <select className="form-control" value={item.type} onChange={(e)=> handleCategoryInput('type',e.target.value,index,'expanded')}>
                    <option value="">Select Type</option>
                    <option value="store">Store</option>
                    <option value="product">Product</option>
                    <option value="page">Page</option>
                 </select>
             </Col>
          </Row>
        )
        }
             <h6>Checked Categories</h6>
        {
          checkedArray.length >0 &&
          checkedArray.map((item,index)=>
          <Row key={index}>
             <Col>
             <Input
                 value={item.name}
                 placeholder={'Category Name'}
                 onChange={(e)=> handleCategoryInput('name',e.target.value,index,'checked')}
                 autoComplete="off"
                 type="text"

             />
             </Col>

             <Col>
             <select value={item.parentId} className="form-control" onChange={(e)=> handleCategoryInput('parentId',e.target.value,index,'checked')}>
                 <option>Select Category</option>
                 {
                   categoryList.map(option=>
                     <option key={option.value} value={option.value}>{option.name}</option>

                   )
                 }
             </select>
             </Col>

             <Col>
                 <select  className="form-control" value={item.type} onChange={(e)=> handleCategoryInput('type',e.target.value,index,'checked')}>
                    <option value="">Select Type</option>
                    <option value="store">Store</option>
                    <option value="product">Product</option>
                    <option value="page">Page</option>
                 </select>
             </Col>
          </Row>
        )
        }


      {/*  <Input type="file" name="categoryImage" onChange={handleCategoryImage}/> */}

     </Modal.Body>
     <Modal.Footer>
       <Button variant="primary" {...props} className="btn-sm" style={{backgroundColor:"#333"}} onClick={onClick }>
         Save
       </Button>
     </Modal.Footer>
   </Modal>
 );
}
export default UpdateCategoriesModal;
