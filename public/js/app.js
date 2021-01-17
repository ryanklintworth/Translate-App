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
          <nav id="navbar">
            <a href="#">Home</a>
            <a href="#">Post</a>
            <a href="#">Catergories</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Sign Up</a>
          </nav>
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
                        <input type="submit" id="updatebtn" value="Create" />
                    </form>
                    <br/>
                    <button id="closeModal" onClick={this.closeModal}>Cancel</button>
                  </div>
                </div>
                <button id="openModal" onClick={this.openModal}> Post an item for sale </button>
                  <h2 id="list">Items for sale</h2>
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
                            <button value={item._id} onClick={this.deleteItem}>DELETE</button>
                            <br/><br/>
                              <details>
                                <summary>Edit this item</summary>
                                  <form id={item._id} onSubmit={this.updateItem}>
                                    <label htmlFor="name">Name</label>
                                    <br />
                                      <input
                                      type="text" value={item.name}
                                      id="name"
                                      onChange={this.handleChange}
                                      />
                                    <br />
                                    <label htmlFor="description">description</label>
                                    <br />
                                      <input
                                      type="text" value={item.description}
                                      id="description"
                                      onChange={this.handleChange}
                                      />
                                    <br />
                                    <label htmlFor="image">Image</label>
                                    <br />
                                      <input type="text" value={item.image} id="image" onChange={this.handleChange} />
                                    <br />
                                    <label htmlFor="price">Price</label>
                                    <br />
                                      <input
                                      type="text" value={item.price}
                                      id="price"
                                      onChange={this.handleChange}
                                      />
                                    <br />
                                    <label htmlFor="location">Location</label>
                                    <br />
                                      <input
                                      type="text" value={item.location}
                                      id="location"
                                      onChange={this.handleChange}
                                      />
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
