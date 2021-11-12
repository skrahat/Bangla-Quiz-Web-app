import React, { Component } from 'react';
import { Input, Button, Progress, Divider } from "antd";
import { dataLevel1 } from './dataLevel1';
import { Link } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import badge from './badge.svg';

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">END...</div>;
    }
    return (
        <div className="timer">
          <div style={{ display: 'flex',justifyContent: 'center', alignItems: 'center' }}>সময় বাকি</div>
          <div style={{ display: 'flex',justifyContent: 'center', alignItems: 'center' }}>{remainingTime}</div>
          <div style={{ display: 'flex',justifyContent: 'center', alignItems: 'center' }}>সেকেন্ড</div>
        </div>
      );
    };
class Level1 extends Component {

    state = {
        value: "",
        timeOut: false,
        round: 0,
        timer: 10,
        randomTense: "",
        wrongAnswer: "",
        correctAnswer:0,
        currentQuestion: 0,
        setCurrentQuestion: 0,
	    showScore: false,
        setShowScore: false,
	    score: 0, 
        setScore: 0,
        nextQuestion: 0,
        nextLevel: false,
        wonPrize: false,
        NumberHolder : 0
    }
    GenerateRandomNumber=()=>
    {

    var RandomNumber =Math.floor(Math.random() * (10 - 1) + 1);

    this.setState({

    NumberHolder : RandomNumber

    })
    }

    componentDidMount() {
        this.randomTense()
        this.startTimeOut()
    }

    startTimeOut = () => {
        this.timeout = setTimeout(() => {
            this.setState({ timeOut: true })
        }, 20000)


        this.interval = setInterval(() => {
            this.setState({ timer: this.state.timer - 1 })
        }, 1000)
    }


    componentDidUpdate() {
        if (this.state.timer === 0) {
            clearInterval(this.interval)
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
        clearInterval(this.interval)
    }


    randomTense = async () => {
        let TenseArray = ['simple', 'past']
        //We need to get one tense between simple and past randomly 
        let randomTense = await TenseArray[Math.floor(Math.random() * TenseArray.length)]
        this.setState({ randomTense: randomTense })
    }

    handleRestart = () => {
        //1. set state  timer : 0
        this.setState({ timer: 20, timeOut: false, wrongAnswer: "" })

        //2. trigger startTimeOut again 
        this.startTimeOut();
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.timeOut) return alert("Please click restart button to keep doing it");

        if (!this.state.value.trim()) return alert("Please Type something first!")

        this.setState({ value: "", wrongAnswer: "" })

        //we need to check if our answer is right or not  
        this.checkMatched()

    }

    

    handleRedirect = () => {
        setTimeout(() => {
            window.location.reload();
        }, 10);
    }
    

	 handleAnswerOptionClick = (isCorrect) => {
        this.GenerateRandomNumber();


        if ( this.state.correctAnswer>9){
            this.state.nextLevel=true;
        }
        else{
            this.state.nextLevel=false;
        }
        
		if (isCorrect) {
            if (this.state.timeOut) return alert("Please click restart button to keep doing it");
			this.state.setScore=this.state.score + 1;
            this.state.correctAnswer=  this.state.correctAnswer + 1;
            this.setState({ round: this.state.round + 1, wrongAnswer: "" }, () => {

               
                
                
            })
            this.state.currentQuestion = this.state.currentQuestion + 1;
            this.state.nextQuestion = this.state.currentQuestion + 1;
		}
        else {
            if (this.state.timeOut) return alert("Please click restart button to keep doing it");
            this.state.currentQuestion = this.state.currentQuestion + 1;
            this.state.nextQuestion = this.state.currentQuestion + 1;
            this.setState({
                wrongAnswer: 'yes'
            }, () => {
                this.setState({
                    round: this.state.round + 1, 
                    
                })
                this.randomTense()
                
            })
        }
        
		if (this.state.nextQuestion<11) {
		} else {
			this.state.setShowScore=true;
            
		}
		
	};
    

    

    render() {
        const { name } = this.props.location
        return (
            <div  class = "background-red" style={{  border: '1px solid grey', borderRadius: '4px', minHeight:500, maxWidth: 600, margin: '3rem auto'}}>

                {this.state.timeOut == false ? this.state.setShowScore == false  ?
                    <>
                        <h1 style={{ fontSize:'3rem', color: 'white', display:'flex', justifyContent:'center'}}>শুদ্ধ বানান চিনি গেইমস  </h1>
 
                        <Progress percent={this.state.round / dataLevel1.length * 100} status="active" />

                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5,marginLeft: 30,}}>
                            <h2 style={{ fontSize:'2rem', color: 'black', display:'flex', justifyContent:'center'}}>প্রথম পর্বে </h2>
                            
                        </div>

                        <span style={{ display:'flex', justifyContent:'center', fontSize:'1rem', marginBottom: 5,marginLeft: 30, color: 'orange',  }}>২০ সেকেন্ডে ১০টি সঠিক উত্তর</span>


                        <div style={{ fontSize: '2rem',marginLeft: 30,  marginTop: 20, display:'flex', justifyContent:'center' }}>
                            সঠিক বানান? {name}<span style={{ color: 'red' }}>
                                
                            </span>
                        </div>
                       
                        <div  class = "background-red" style={{ padding: '2rem', borderRadius: '4px', minHeight:200, minWidth: 200, margin: '0 auto', backgroundColor: 'white'}}>
                            <div className="mb-2" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                {dataLevel1[this.state.NumberHolder].answerOptions.map((answerOption) => (
                                    <Button style={{ fontSize:'2rem', minHeight:100,minWidth: 200, border: '2px solid grey'}}
                                    onClick={() => this.handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</Button>
                                    ))}
                            </div>
                            
                            
                            
                            
                            <form style={{ padding: '1rem 0' }} >
                                <div style={{ display: 'flex' }}>
                                    
                                <Button
                                    onClick={this.state.setShowScore == true}
                                    style={{ display: this.state.timeOut ? 'block' : 'none' }}
                                >
                                    Click to Restart!
                                </Button>
                            
                                </div>
                            </form>
                            
                            

                            {/* Timer */}
                            <div className="App">
                                
                                <div className="timer-wrapper" style={{ display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
                                    <CountdownCircleTimer
                                    isPlaying
                                    strokeWidth={5}
                                    size={100}
                                    duration={20}
                                    colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                                    onComplete={() => [false, 1000]}
                                    >
                                    {renderTime}
                                    </CountdownCircleTimer>
                                </div>
                                
                            </div>


                            {/* Results */}

                            {this.state.wrongAnswer && (
                                <React.Fragment>
                                    <Divider />
                                    <h3>Wrong! </h3>
                                    <div>
                                

                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    </>
                    :
                    <>
                        <div className='score-section'>
                            <h1 style={{ display: 'flex', color: "white", justifyContent: 'center' }}>
                                You scored { this.state.correctAnswer} out of 10</h1>
                            <br></br>
                            <h1 style={{ display: 'flex', color: "white", justifyContent: 'center' }}>
                                অংশগ্রহণের জন্য তোমাকে ধন্যবাদ
                            </h1>
                            <h1 style={{  justifyContent: 'center',fontSize:'3rem', color: "white", display: this.state.correctAnswer == 9 ? 'flex' : 'none' }}>You Won a Bandge!! </h1>
                            <br></br>
                            <div style={{ justifyContent: 'center', color: "white", display: this.state.correctAnswer == 9 ? 'flex' : 'none'}}>
                                <img src={badge} alt="Badge Image" height={100} width={120} />
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button >
                                <Link to="/" >restart</Link>
                            </Button>
                            <Button 
                            style={{ display: this.state.correctAnswer == 10 ? 'block' : 'none' }}>
                                <Link to="/Level2" >Level2</Link></Button>
                        </div>
                    </>
                    :
                    <>
                        <div >
                            <h1 style={{ display: 'flex', justifyContent: 'center'  ,color: "white"}}>You scored { this.state.correctAnswer} out of 10</h1>
                            <h1 style={{ display: 'flex', justifyContent: 'center'  ,color: "white"}}>
                                অংশগ্রহণের জন্য তোমাকে ধন্যবাদ
                            </h1>
                        </div>
                        <br></br>
                        <div >
                            <h1 style={{justifyContent: 'center',fontSize:'3rem', color: "white", display: this.state.correctAnswer == 9 ? 'flex' : 'none' }}>
                                You Won a Bandge!!!!! </h1>
                            <br></br>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly', display: this.state.correctAnswer == 9 ? 'flex' : 'none' }}>
                                <img src={badge} alt="Badge Image" height={100} width={120} />
                            </div>
                        
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button >
                            <Link to="/" >restart</Link>
                        </Button>
                            
                        <Button 
                            style={{ display: this.state.correctAnswer == 10 ? 'block' : 'none' }}>
                                <Link to="/Level2" >Level2</Link></Button>
                        </div>
                    </>
                }
            </div>
        )
    }

}

export default Level1;