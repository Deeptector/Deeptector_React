import React, { Component } from 'react';
import axios from 'axios'; 
import PagerService from './pager.service.js';
import download3 from './img/download3.png';
import left from './img/left.png';
import right from './img/right.png';



class List extends Component{
    //생성자에서 필요한 state 선언과 함수 binding
    constructor(props){
        super(props);
        this.state = {
            input : 0,
            file : '',
            index : 0,
            pagerMap : new Map(),
            pagedItems : [],
            getlist : []
        };
        this.pagerService = new PagerService();
        this.andAtSpring = this.andAtSpring.bind(this);
        this.getListAtSpring = this.getListAtSpring.bind(this);
        this.pagerMapSetting = this.pagerMapSetting.bind(this);
        this.setPage = this.setPage.bind(this);
    }
    
   
    //Rendering이 끝난 후 Spring Sever에서 동영상 목록 받아옴
    componentWillMount() {
        this.getListAtSpring();
    }
    //화면 Renderng
    render() {
        return (
            <div>
            <table>
                <tbody>
                {this.state.pagedItems.map((list, i) =>
               <tr key={i}>
                   <td>
                       {list.date}
                   </td>
                   <td>
                       <img src={ download3 } onClick={() => this.andAtSpring(list.date)} width="20" height="20" alt=""/>
                   </td>
               </tr>
               )}
                </tbody>
            </table>
            <br/>
            <ul className="pagination" >
               <li>
               <img src={ left } onClick={() => this.setPage(this.state.pagerMap.get("currentPage") - 1)} width="20" height="20" alt=""/>
               </li>
               <li>
               <img src={ right } onClick={() => this.setPage(this.state.pagerMap.get("currentPage") + 1)} width="20" height="20" alt=""/>
               </li>
            </ul>
            </div>
            
        );
    }

    //Spring Server에 /getList 요청 보내기
    getListAtSpring = () => {
        axios.get('http://localhost:8080/getList')
          .then(response => { this.setState({ input : response.data })
               let pager = this.pagerService.getPager(this.state.input.length, 1, 8);
               this.pagerMapSetting(pager);
               this.setState({ pagedItems : this.state.input.slice(this.state.pagerMap.get("startIndex"), this.state.pagerMap.get("endIndex") + 1) });
               })
          .catch(response => {console.log(response);});
        }
    //페이징을 위한 Map 설정
    pagerMapSetting(pager) {
            this.state.pagerMap.set("currentPage", pager[0]);
            this.state.pagerMap.set("startIndex", pager[1]);
            this.state.pagerMap.set("endIndex", pager[2]);
    }    
    
    //Spring Server에 동영상 다운로드 요청 보내기
    andAtSpring = (data) => {
        let videoName = data;
        axios.post('http://localhost:8080/and',{videoName :  videoName})
        .then(response => {console.log(response.data);})
        .catch(response => {console.log(response)})
    }

    //사용자가 화살표를 눌렀을 때 다음 혹은 이전 페이지 나타내는 함수
    setPage = (currentPage) => {
        let pager = this.pagerService.getPager(this.state.input.length, currentPage, 8);
        this.pagerMapSetting(pager);
        this.setState({ pagedItems : this.state.input.slice(this.state.pagerMap.get("startIndex"),this.state.pagerMap.get("endIndex")+1) });
    }
}
   

    


export default List;