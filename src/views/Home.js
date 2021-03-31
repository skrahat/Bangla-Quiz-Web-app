import "./Home.css";
import styled from "styled-components";
import React, { Component }  from 'react';

import { Input, Button, Progress, Divider } from "antd";
import { Link } from 'react-router-dom';

const name="tom";
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Home extends Component {

 
 render() {
    return (
      
      <div  class = "background-red" style={{  border: '1px solid grey', borderRadius: '4px', minHeight:200, maxWidth: 600, margin: '3rem auto'}}>
          <h1 style={{display:'flex', justifyContent:'center', color: 'white', padding: '1rem ', fontSize:'2rem'}}>
              আপনার নাম
          </h1>
        
          <form style={{ padding: '1rem ' }} >
              <div style={{ display: 'flex' }}>
                  <Input
                      name="value"

                      id="voca"
                      type="text"
                  />

                  <Button className type="submit"> 
                    <Link 
                      to={{
                        pathname: '/Level1',
                        state: {
                          name : "tommy"
                        }
                      }}
                     >Start Quiz
                    </Link>
                  </Button>
              </div>
          </form>
        </div>
      
    );
  }
}

export default Home;