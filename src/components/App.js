import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        items: [],
        results: []
      };
      this.fetchData()
  }
  fetchData = () =>{
    fetch('http://localhost:3333/')
      .then((resp) => resp.json())
      .then((result) => {
          this.setState({items: result, results: result});
    });
  }
   find = (arr, name) => {
    return (arr.filter(i => i.categories.some(j => j.name === name)));
  }

  setData = (e) =>{
    this.setState({ results: this.find (this.state.items, e.target.attributes.getNamedItem('data-filter').value) })
  }

handleSearch = (event) =>{
  console.log(this.state.items);
  console.log(event.target.value);
  const res = this.state.items;
  const updatedRes = res.filter(item => {
    return item.title.search(event.target.value) !== -1;
  });
   this.setState({
     results: updatedRes,
     searchValue: event.target.value
    });
}

  render() {
      return(
          <div>

          <nav className="navbar navbar-default">
        <div className="container-fluid">



          <div classNameName="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li data-filter="Popular Games" onClick={this.setData}>Popular Games</li >
              <li  data-filter="Slots" onClick={this.setData}>Slots</li >
              <li  data-filter="All Games" onClick= {this.setData}>All Games</li >
              <li  data-filter="Jackpots" onClick= {this.setData}>Jackpots</li >
            </ul>
            <form className="navbar-form navbar-left">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" value={this.state.searchValue} onChange = {this.handleSearch}/>
              </div>
            </form>

             </div>
        </div>
      </nav>
        <div className="container">
              <div className="row">
                    { this.state.results.map((item, index)=> {
                        return(
                            <div className="col-md-6 col-lg-3" key={index}>
                              <div className="item">
                                <img src={item.image} />
                                <div className="info" >
                                    <p className="title">{item.title}</p>
                                    <a className="button" href="#" ><p>play</p></a>
                                </div>

                              </div>
                            </div>
                        )
                      })
                    }
                  </div>
              </div>
          </div>
      );
    }
}
export default App;
