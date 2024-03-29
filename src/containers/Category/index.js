import React,{useEffect,useState} from "react";
import Layout from "../../components/layout";
import {Container,Row,Col,Modal,Button} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import {getAllCategory,addCategory,updateCategories,deleteCategories as deleteCategoriesAction} from "../../actions";
import Input from "../../components/UI/Input";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Model from "../../components/UI/Model";
import { IoCheckboxOutline,
  IoCheckbox
 } from "react-icons/io5";
 import { IoIosArrowForward,
   IoIosArrowDown,IoIosAdd,IoIosTrash,IoIosCloudUpload
 } from "react-icons/io";
 import UpdateCategoriesModal from './components/UpdateCategoriesModal';
 import AddCategoryModal from './components/AddCategoryModal';
import "./style.css";
const Category=function(props){

    const category=useSelector(function(state){
      return state.category;
    });
    const [categoryName,setCategoryName]=useState('');
    const [parentCategoryId,setParentCategoryId]=useState('');
    const [categoryImage,setCategoryImage]=useState('');
    const [checked,setChecked]=useState([]);
    const [expanded,setExpanded]=useState([]);
    const [checkedArray,setCheckedArray]=useState([]);
    const [expandedArray,setExpandedArray]=useState([]);
    const [updateCategoryModal,setUpdateCategoryModal]=useState(false);
    const [deleteCategoryModal,setDeleteCategoryModal]=useState(false);
    const dispatch=useDispatch();

    useEffect(() => {

       if (!category.loading) {
           setShow(false);
       }

   }, [category.loading]);

    const handleClose = () => {
      const form=new FormData();
      if (categoryName === "") {
           alert('Category name is required');
           setShow(false);
           return;
       }
      form.append("name",categoryName);
      form.append("parentId",parentCategoryId);
      form.append("categoryImage",categoryImage);
      dispatch(addCategory(form));
      setCategoryName("");
      setParentCategoryId("");
      setCategoryImage("");
      // const cat={
      //   categoryName,
      //   parentCategoryId,
      //   categoryImage
      // };
      // console.log(cat);

      setShow(false);
    }

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

  const renderCategories=function(categories){
      let myCategories=[];
      for(let category of categories){
        myCategories.push(
          {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }

        );
      }
      return myCategories;
  }

  const createCategoryList=function(categories,options=[]){
    for(let category of categories){
      options.push({value:category._id,name:category.name,parentId:category.parentId,type:category.type});
      if(category.children.length>0){
        createCategoryList(category.children,options);
      }
    }
    return options;
  }

  const handleCategoryImage=function(e){
    setCategoryImage(e.target.files[0]);
  }

  const updateCategory= ()=>{
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);

  }

  const updateCheckedAndExpandedCategories= ()=>{
    const categories=createCategoryList(category.categories);
    const checkedArray=[];
    const expandedArray=[];
    checked.length >0 && checked.forEach((categoryId,index)=>{
      const category=categories.find((category,_index)=> categoryId==category.value);
      category && checkedArray.push(category);
    })
    expanded.length >0 && expanded.forEach((categoryId,index)=>{
      const category=categories.find((category,_index)=> categoryId==category.value);
      category && expandedArray.push(category);
    })
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);


  }

  const handleCategoryInput=(key,value,index,type)=>{
    if(type=="checked"){
      const updatedCheckedArray=checkedArray.map((item,_index)=>index==_index ? {...item,[key]:value} : item);
      setCheckedArray(updatedCheckedArray);
    }
    else if (type=="expanded") {
      const updatedExpandedArray=expandedArray.map((item,_index)=>index==_index ? {...item,[key]:value} : item);
      setExpandedArray(updatedExpandedArray);
    }
  }

const updateCategoriesForm= () =>{
  const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        dispatch(updateCategories(form));
        setUpdateCategoryModal(false);
}

// const renderUpdateCategoriesModal=()=>{
//   return (
//
//     <Modal size="lg" show={updateCategoryModal} onHide={updateCategoriesForm}>
//      <Modal.Header closeButton>
//        <Modal.Title>Update Categories</Modal.Title>
//
//      </Modal.Header>
//      <Modal.Body>
//         <Row>
//            <Col>
//                <h6>Expanded Categories</h6>
//            </Col>
//         </Row>
//         {
//           expandedArray.length >0 &&
//           expandedArray.map((item,index)=>
//           <Row key={index}>
//              <Col>
//              <Input
//                  value={item.name}
//                  placeholder={'Category Name'}
//                  onChange={(e)=> handleCategoryInput('name',e.target.value,index,'expanded')}
//                  autoComplete="off"
//                  type="text"
//
//              />
//              </Col>
//
//              <Col>
//              <select value={item.parentId} className="form-control" onChange={(e)=> handleCategoryInput('parentId',e.target.value,index,'expanded')}>
//                  <option>Select Category</option>
//                  {
//                    createCategoryList(category.categories).map(option=>
//                      <option key={option.value} value={option.value}>{option.name}</option>
//
//                    )
//                  }
//              </select>
//              </Col>
//
//              <Col>
//                  <select className="form-control">
//                     <option value="">Select Type</option>
//                     <option value="store">Store</option>
//                     <option value="product">Product</option>
//                     <option value="page">Page</option>
//                  </select>
//              </Col>
//           </Row>
//         )
//         }
//              <h6>Checked Categories</h6>
//         {
//           checkedArray.length >0 &&
//           checkedArray.map((item,index)=>
//           <Row key={index}>
//              <Col>
//              <Input
//                  value={item.name}
//                  placeholder={'Category Name'}
//                  onChange={(e)=> handleCategoryInput('name',e.target.value,index,'checked')}
//                  autoComplete="off"
//                  type="text"
//
//              />
//              </Col>
//
//              <Col>
//              <select value={item.parentId} className="form-control" onChange={(e)=> handleCategoryInput('parentId',e.target.value,index,'checked')}>
//                  <option>Select Category</option>
//                  {
//                    createCategoryList(category.categories).map(option=>
//                      <option key={option.value} value={option.value}>{option.name}</option>
//
//                    )
//                  }
//              </select>
//              </Col>
//
//              <Col>
//                  <select className="form-control">
//                     <option value="">Select Type</option>
//                     <option value="store">Store</option>
//                     <option value="product">Product</option>
//                     <option value="page">Page</option>
//                  </select>
//              </Col>
//           </Row>
//         )
//         }
//
//
//       {/*  <Input type="file" name="categoryImage" onChange={handleCategoryImage}/> */}
//
//      </Modal.Body>
//      <Modal.Footer>
//        <Button variant="primary" onClick={updateCategoriesForm }>
//          Save Changes
//        </Button>
//      </Modal.Footer>
//    </Modal>
//  );
// }

const deleteCategory=() =>{
  updateCheckedAndExpandedCategories();
  setDeleteCategoryModal(true);
}

const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
        if(checkedIdsArray.length>0){
          dispatch(deleteCategoriesAction(checkedIdsArray))
          .then(result=>{
            if(result){
              dispatch(getAllCategory());
              setDeleteCategoryModal(false);
            }
          });
        }
          setDeleteCategoryModal(false);
        }

const renderDeleteCategoryModal=() => {
  console.log('delete',checkedArray);
  return(
    <Model
      show={deleteCategoryModal}
      handleClose={() => setDeleteCategoryModal(false)}
      modalTitle={'Confirm'}
      buttons={[
                   {
                       label: 'No',
                       color: 'primary',
                       onClick: () => {
                           alert('no');
                       }
                   },
                   {
                       label: 'Yes',
                       color: 'danger',
                       onClick: deleteCategories

                   }
               ]}
      >

      <h5>Expanded</h5>
                { expandedArray.map((item, index) => <span key={index}>{item.name}</span>) }
      <h5>Checked</h5>
                { checkedArray.map((item, index) => <span key={index}>{item.name}</span>) }

   </Model>
  );
}

// const renderAddCategoryModal=()=>{
//   return(
//     <Modal show={show} onHide={handleClose}>
//      <Modal.Header closeButton>
//        <Modal.Title>Add new Category</Modal.Title>
//      </Modal.Header>
//      <Modal.Body>
//         <Input
//             value={categoryName}
//             placeholder={'Category Name'}
//             onChange={(e) => setCategoryName(e.target.value)}
//             autoComplete="off"
//             type="text"
//
//         />
//
//         <select value={parentCategoryId} className="form-control" onChange={(e)=>setParentCategoryId(e.target.value)}>
//             <option>Select Category</option>
//             {
//               createCategoryList(category.categories).map(option=>
//                 <option key={option.value} value={option.value}>{option.name}</option>
//
//               )
//             }
//         </select>
//
//         <Input type="file" name="categoryImage" onChange={handleCategoryImage}/>
//
//      </Modal.Body>
//      <Modal.Footer>
//        <Button variant="primary" onClick={handleClose}>
//          Save Changes
//        </Button>
//      </Modal.Footer>
//    </Modal>
//   );
// }

const categoryList=createCategoryList(category.categories);

  return(
    <Layout sidebar>
       <Container>
            <Row>
               <Col md={12}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                   <h3>Category</h3>
                   <div className="actionBtnContainer">
                   <span>Actions</span>
                   <button onClick={handleShow}><IoIosAdd/><span>Add</span></button>
                   <button onClick={deleteCategory}><IoIosTrash/><span>Delete</span></button>
                   <button onClick={updateCategory}><IoIosCloudUpload/><span>Edit</span></button>
                   </div>

                </div>

               </Col>
            </Row>
            <Row>
               <Col md={12}>
                {  // <ul>
                  //    {renderCategories(category.categories)}
                  // </ul>
                }
                  <CheckboxTree
                  nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                  check:<IoCheckbox/>,
                                  uncheck:<IoCheckboxOutline/>,
                                  halfCheck:<IoCheckboxOutline/>,
                                  expandClose: <IoIosArrowForward/>,
                                  expandOpen:<IoIosArrowForward/> ,
                                }}
                  />
               </Col>
            </Row>

       </Container>

      {/* {renderAddCategoryModal()} */}
      <AddCategoryModal
      show={show}
      onHide={() =>setShow(false)}

      modalTitle={'Add new Category'}
      categoryName={categoryName}
      setCategoryName={setCategoryName}
      parentCategoryId={parentCategoryId}
      setParentCategoryId={setParentCategoryId}
      categoryList={categoryList}
      handleCategoryImage={handleCategoryImage}
      onClick={handleClose}

      />
     <UpdateCategoriesModal
                show={updateCategoryModal}
                 onHide={()=> setUpdateCategoryModal(false)}

                modalTitle={'Update Categories'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
                onClick={updateCategoriesForm }
      />
      {/*  {renderUpdateCategoriesModal()} */}
        {renderDeleteCategoryModal()}

    </Layout>
  );
}

export default Category;
