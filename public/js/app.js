class Garage extends React.Component {
  state = {
    name: '',
    image: '',
    description: '',
    price: '',
    location: '',
    items: []
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios
    .post('/items', this.state)
    .then((response) => {
      this.setState({
        items: response.data,
        name: '',
        image: '',
        description: '',
        price: '',
        location: ''
      })
    })
  }

  deleteItem = (event) => {
    axios
    .delete('/items/' + event.target.value)
    .then((response) => {
      this.setState({
        items: response.data,
      })
    })
  }

  updateItem = (event) => {
    event.preventDefault()
    const id = event.target.id
    axios
    .put('/items/' + id, this.state)
    .then((response) => {
      this.setState({
        items: response.data,
        name: '',
        image: '',
        description: '',
        price: '',
        location: ''
      })
    })
  }

  openModal = () => {
    document.getElementById('modal').style.display = 'inline'
  }

  closeModal = () => {
    document.getElementById('modal').style.display = "none"
  }

  componentDidMount = () => {
    axios.get('/items').then((response) => {
      this.setState({
        items: response.data
      })
    })
  }

  render = () => {
    return( <div className="main">
          <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper blue-grey lighten-2">
              <a href="#!" class="brand-logo">Logo</a>
              <ul className="right hide-on-med-and-down">
                <li><a href="#">Home</a></li>
                <li><a href="#"onClick={this.openModal}>Post</a></li>
                <li><a href="#">Categories</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Sign Up</a></li>
              </ul>
            </div>
          </nav>
        </div>
          <br/><br/>
          <div id="modal">
            <div id="modal-textbox">
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="name"><p className="inputText">Name</p></label>
                  <input type="text" id="name" className="textbox" onChange={this.handleChange} />
                <label htmlFor="image"><p className="inputText">Image</p></label>
                  <input type="text" id="image" className="textbox" onChange={this.handleChange} />
                <label htmlFor="description"><p className="inputText">description</p></label>
                  <input type="text" id="description" className="textbox" onChange={this.handleChange} />
                <label htmlFor="price"><p className="inputText">Price</p></label>
                  <input type="text" id="price" className="textbox" onChange={this.handleChange} />
                <label htmlFor="location"><p className="inputText">Location</p></label>
                  <input type="text" id="location" className="textbox" onChange={this.handleChange} />
                  <br/><br/>
                  <input type="submit" onClick={this.closeModal} id="updatebtn" value="Create" />
                  <button id="closeModal" onClick={this.closeModal}>Cancel</button>
              </form>
              <br/>
            </div>
          </div>
              <div id="itemContainer">
                <ul>
                  {this.state.items.map((item) => {
                    return(
                      <div id="itemblock">
                      <li>
                      <p id="itemTitle">{item.name}</p>
                      <p id="itemDesc">{item.description}</p>
                      <img src={item.image} alt={item.name} />
                      <br/>
                      <p id="itemPrice">${item.price}</p>
                      <p id="itemLoc">{item.location}</p>
                      <button id="deleteBtn" value={item._id} onClick={this.deleteItem}>DELETE</button>
                      <br/><br/>
                        <details>
                          <summary>Edit this item</summary>
                            <form id={item._id} onSubmit={this.updateItem}>
                            <label htmlFor="name"><p className="inputText">Name</p></label>
                              <input type="text" id="name" className="textbox" onChange={this.handleChange} />
                            <label htmlFor="image"><p className="inputText">Image</p></label>
                              <input type="text" id="image" className="textbox" onChange={this.handleChange} />
                            <label htmlFor="description"><p className="inputText">description</p></label>
                              <input type="text" id="description" className="textbox" onChange={this.handleChange} />
                            <label htmlFor="price"><p className="inputText">Price</p></label>
                              <input type="text" id="price" className="textbox" onChange={this.handleChange} />
                            <label htmlFor="location"><p className="inputText">Location</p></label>
                              <input type="text" id="location" className="textbox" onChange={this.handleChange} />
                              <br/><br/>
                              <input type="submit" onClick={this.closeModal} id="updatebtn" value="Create" />
                              <br/><br/>
                                <input id="updatebtn" type="submit" value="Update Item" />
                            </form>
                          </details>
                        </li>
                      </div>
                    )
                  })}
                </ul>
              </div>
            </div>
    )
  }
}


ReactDOM.render(
  <Garage></Garage>,
  document.querySelector('main'))
