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
const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 1
      }}
  />
);
class Home extends Component {

 
 render() {
    return (
      
      <div  class = "background-red" style={{  border: '1px solid grey', borderRadius: '4px', minHeight:200, maxWidth: 600, margin: '3rem auto'}}>
          
          <h2 style={{display:'flex', justifyContent:'center', color: 'white',  fontSize:'2rem'}}>
              Bangla Shothik Quiz
          </h2>
          <ColoredLine color="white" />
          <div style={{display:'flex', justifyContent:'center', color: 'white', fontSize:'2rem'}}>
              আপনার নাম
          </div>
          
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
          
          <h2 style={{ color: 'white', display:'block', justifyContent:'center',padding:'1px'}}>
          তথ্য: কুইজে 2 রাউন্ড রয়েছে। প্রতিটি রাউন্ডে, পুরস্কারগুলি সম্পূর্ণ করতে এবং জিততে আপনার কাছে 20 সেকেন্ড রয়েছে।
          </h2>
          <h3 style={{display:'flex', justifyContent:'center',color: 'orange'}}>
            পুরষ্কার: পেনড্রাইভ (স্তর 2-10 পয়েন্ট), টি-শার্ট (স্তর 2-9 পয়েন্ট), স্তর 2 তে প্রবেশ (স্তর 1- 10 পয়েন্ট), ব্যাজ (স্তর 1-9 পয়েন্ট)</h3>
        </div>
      
    );
  }
}

export default Home;