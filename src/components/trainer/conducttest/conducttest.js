import React, { Component } from 'react';
import { connect } from 'react-redux';
import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, Typography, Tabs } from 'antd';
import './conducttes.css';
import { changeConducttestId, updateCandidatesTest,updateQuestiosnTest } from '../../../actions/conductTest';
import TestDetails from './details';
import Candidates from './candidates';
import Questions from './questions';
const { Title } = Typography;
const { TabPane } = Tabs;


class ConductTestS extends Component {
    constructor(props){
        super(props);
        this.props.changeConducttestId(this.props.testid);
        this.state={
            localTestId:null,
            needRedirect:false
        }
    }

    ChangeLocalTestId = (d)=>{
        this.setState({
            localTestId : d.target.value
        })
    }

    ChangetestId = (d)=>{
        this.setState({
            needRedirect:true
        })
    }



    render() {
        if(this.state.needRedirect){
            return window.location.href=`/user/conducttest?testid=${this.state.localTestId}`
        }
        else{
            return (
                <div className="conduct-test-main-wrapper">
                    {!this.props.conduct.id ? 
                    <div>
                        <Title style={{width:'100%',textAlign:'center'}} level={4}>Enter Test Id</Title>
                        <div className="test-conduct-testid-form">
                            <Input placeholder="Enter test id" onChange={this.ChangeLocalTestId} value={this.state.localTestId}/>
                            <Button onClick={this.ChangetestId}  type="primary" style={{marginTop:'30px'}}>Proceed</Button>
                        </div>
                    </div>:
                    <div>
                        <CC key={this.props.conduct.basictestdetails.testconducted} />
                    </div>}
                </div>
            )
        }
    }
}




class C extends Component {
    render() {
        console.log(this.props.conduct.basictestdetails.testconducted);
        if(this.props.conduct.basictestdetails.testconducted){
            return(
                <div className="reasendmail-container-register">
                    <Title style={{color:'#fff'}} level={4}>The Test has ended! Go to all tests to check the results</Title>    
                </div>
            )
        }
        else{
            return (
                <div>
                    <TestDetails/>
                    <Tabs defaultActiveKey="1" style={{marginTop:'20px'}}>
                        <TabPane tab={<span><UserOutlined />Registered Trainee</span>} key="1">
                            <Candidates />
                        </TabPane>
                        <TabPane tab={<span><QuestionCircleOutlined />Questions</span>} key="2">
                            <Questions id={this.props.conduct.id} questionsOfTest={this.props.conduct.questionsOfTest} updateQuestiosnTest={this.props.updateQuestiosnTest}  />
                        </TabPane>
                    </Tabs>
                </div>
            );
        }
        
    }
}




const mapStateToProps = state => ({
    trainer : state.trainer,
    conduct : state.conduct
});


let CC=connect(mapStateToProps,{
    changeConducttestId,
    updateCandidatesTest,
    updateQuestiosnTest
})(C);


export default connect(mapStateToProps,{
    changeConducttestId,
    updateCandidatesTest,
    updateQuestiosnTest
})(ConductTestS);