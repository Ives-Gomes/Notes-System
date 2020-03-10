import React,{ Component } from 'react';
import { Container } from './styles.js';
import axios from 'axios';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'Notes System',
      alertBool: false,
      alert: 'Required fields!',
      titles: [],
      annotations: [],
      verify: 0,
      delete: 0,
      index: '',
      datas: [],
    }
  } 

  componentDidMount() {
    axios.get(`https://annotation-to-ives.herokuapp.com/notes/1`)
      .then(data => {
        const title = data.title;
        const annotation = data.description;
        this.setState({ titles: {...this.state.titles, title} });
        this.setState({ annotations: {...this.state.annotations, annotation} });

        let datas = this.state.datas;
        let bd = {
          title,
          annotation
        }
        datas.push(bd);
        console.log(datas);
      });
  }

  fSubmit = (e) =>{

    e.preventDefault();

    let datas = this.state.datas;
    let title = this.refs.title.value;
    let address = this.refs.address.value;

    if(title === '' || address === '') {
      this.setState({ alertBool: true });
    } else { 
      this.setState({ titles: {...this.state.titles, title} });
      this.setState({ annotations: {...this.state.annotations, address} });

      if(this.state.verify === 0) {
        let data = {
          title, address
        }

        datas.push(data);
      } else {
        let index = this.state.index;
        datas[index].title = title;
        datas[index].address = address;
      }   
      
      this.setState({
        datas: datas,
        verify: 0,
      });

      this.setState({ alertBool: false });

      this.refs.myForm.reset();
    }  
  }

  fRemove = (i) => {
    const del = window.confirm("Do you really want to delete?");

    if(del) {
      let datas = this.state.datas;
      datas.splice(i,1);
      this.setState({
        datas: datas
      });
    } 

    this.refs.myForm.reset();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.title.value = data.title;
    this.refs.address.value = data.address;

    this.setState({
      verify: 1,
      index: i,
    });
  }  

  render() {
    let datas = this.state.datas;

    return (
      <div className="App">
        <div>
          <h2>{this.state.title}</h2>
        </div>

        <Container>
          <div className="grid">
            <form ref="myForm" className="myForm">
              <input maxLength="27" type="text" ref="title" placeholder="Title" className="formField" />
              <textarea type="text" ref="address" placeholder="Annotation" className="formField" />
              <div>
                <label className="alert" style={{
                    display: this.state.alertBool ? null : 'none' 
                  }}>{this.state.alert}</label>
                <button onClick={(e)=>this.fSubmit(e)} className="myButton">ADD</button>
              </div>           
            </form>  
                            
            {datas.map((data, i) =>  
              <div key={i} className="myList">
                <p>Title:</p> 
                <label> {data.title} </label> <br /> 
                <p>Annotation:</p> 
                <textarea readOnly className="annotationText" value={data.address} /> <br />
                <div className="div__button">
                  <button onClick={()=>this.fRemove(i)} className="myListButton">DELETE</button>
                  <button onClick={()=>this.fEdit(i)} className="myListButton1">EDIT</button>
                </div>               
              </div>                   
            )} 
          </div>                           
        </Container>        
      </div>
    );
  }
}