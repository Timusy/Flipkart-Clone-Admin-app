import React,{useState,useEffect} from "react";
import Layout from "../../components/layout";
import {Container,Form,Row,Col,Button} from "react-bootstrap";
import Input from "../../components/UI/Input";
import {login} from "../../actions";
import {useDispatch,useSelector} from "react-redux";
import {Redirect} from "react-router-dom";


const Signin=function(props){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const auth=useSelector(state=>state.auth);
  const dispatch=useDispatch();



  const userLogin=function(e){
    e.preventDefault(); //prevents reloading of entire page
    const user={email,password};
    dispatch(login(user));
  }
  if(auth.authenticate){
    return <Redirect to={'/'}/>
  }
  return (
    <div className="Signin">
   <Layout>
        <Container>
           <Row style={{marginTop: "50px"}}>
              <Col md={{span:6 ,offset: 3}}>
              <Form onSubmit={userLogin}>
              <Input
                  label="Email address"
                  type="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />

               <Input
                   label="Password"
                   type="password"
                   autoComplete="off"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                />

                <Button variant="primary" type="submit">
                  Signin
                 </Button>
               </Form>
              </Col>
           </Row>

        </Container>
   </Layout>
    </div>
  );
}

export default Signin;
