import React ,{useState} from "react";
import Layout from "../../components/layout";
import {Container,Form,Row,Col,Button} from "react-bootstrap";
import Input from "../../components/UI/Input";
import {Redirect} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {signup} from "../../actions";
import { useEffect } from "react";


const Signup=function(props){
  const [firstName,setfirstName]=useState('');
  const [lastName,setlastName]=useState('');
  const [userName,setuserName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const auth=useSelector(state=>state.auth);
  const user=useSelector(state=>state.user);

  const dispatch=useDispatch();

  useEffect(() => {
   if (!user.loading) {
     setfirstName("");
     setlastName("");
     setEmail("");
     setPassword("");
     setuserName("");
   }
 }, [user.loading]);

  const userSignup=function(e){
    e.preventDefault();
        const user={firstName,lastName,userName,email,password};
        dispatch(signup(user));
  }

  if(auth.authenticate){
    return <Redirect to={'/'}/>
  }

  if(user.loading){
    return <h1>Loading...</h1>
  }


  return (
    <div className="Signup">
    <Layout>
         <Container>

            <Row style={{marginTop: "50px"}}>
               <Col md={{span:6 ,offset: 3}}>
               <Form onSubmit={userSignup}>
                 <Row>
                    <Col md={6}>
                      <Input
                          label="First Name"
                          type="text"
                          autoComplete="off"
                          value={firstName}
                          onChange={(e) => setfirstName(e.target.value)}
                       />
                       </Col>
                       <Col md={6}>
                         <Input
                             label="Last Name"
                             type="text"
                             autoComplete="off"
                             value={lastName}
                             onChange={(e) => setlastName(e.target.value)}
                          />
                          </Col>
                 </Row>
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
                   <Input
                       label="User Name"
                       type="text"
                       autoComplete="off"
                       value={userName}
                       onChange={(e) => setuserName(e.target.value)}
                    />

                 <Button variant="primary" type="submit">
                   Signup
                  </Button>
                </Form>
               </Col>
            </Row>

         </Container>
    </Layout>
    </div>
  );
}

export default Signup;
