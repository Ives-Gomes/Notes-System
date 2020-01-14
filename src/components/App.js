import React,{ Component } from 'react';
import { Container } from './styles.js';

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

  fSubmit = (e) =>{
    e.preventDefault();

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;

    if(name === '' || address === '') {
      this.setState({ alertBool: true });
    } else {
      this.setState({ titles: {...this.state.titles, name} });
      this.setState({ annotations: {...this.state.annotations, address} });

      if(this.state.verify === 0) {
        let data = {
          name, address
        }

        datas.push(data);
      } else {
        let index = this.state.index;
        datas[index].name = name;
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
    this.refs.name.value = data.name;
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
              <input maxLength="27" type="text" ref="name" placeholder="Title" className="formField" />
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
                <label> {data.name} </label> <br /> 
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