import React from 'react';
import Input from '../../../components/UI/Input';
import Model from '../../../components/UI/Model';
import {Container,Row,Col,Modal,Button} from 'react-bootstrap';

const AddCategoryModal=(props)=>{
  const {
        show,
        onHide,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage,
        onSubmit,
         onClick
    } = props;

  return(
    <Modal show={show} onHide={onHide}>
     <Modal.Header closeButton>
       <Modal.Title>{modalTitle}</Modal.Title>
     </Modal.Header>
     <Modal.Body>

      <Row>
        <Col>
        <Input
            className=" form-control-sm"
            value={categoryName}
            placeholder={'Category Name'}
            onChange={(e) => setCategoryName(e.target.value)}
            autoComplete="off"
            type="text"


        />

        </Col>

        <Col>
        <select value={parentCategoryId} className="form-control form-control-sm " onChange={(e)=>setParentCategoryId(e.target.value)}>
            <option>Select Category</option>
            {
            categoryList.map(option=>
                <option key={option.value} value={option.value}>{option.name}</option>

              )
            }
        </select>

        </Col>
      </Row>

      <Row>
        <Col>
            <Input type="file" name="categoryImage" onChange={handleCategoryImage}/>
        </Col>
      </Row>




     </Modal.Body>
     <Modal.Footer>
       <Button variant="primary" {...props} className="btn-sm" style={{backgroundColor:"#333"}}  onClick={onClick}>
         Save
       </Button>
     </Modal.Footer>
   </Modal>
  );
}

export default AddCategoryModal;
