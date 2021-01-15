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
        podcasts: response.data,
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
                        <input type="text" className="textbox" onChange={this.handleChange} />
                      <label htmlFor="image"><p className="inputText">Image</p></label>
                        <input type="text" className="textbox" onChange={this.handleChange} />
                      <label htmlFor="description"><p className="inputText">description</p></label>
                        <input type="text" className="textbox" onChange={this.handleChange} />
                      <label htmlFor="price"><p className="inputText">Price</p></label>
                        <input type="text" className="textbox" onChange={this.handleChange} />
                      <label htmlFor="location"><p className="inputText">Location</p></label>
                        <input type="text" className="textbox" onChange={this.handleChange} />
                        <br/><br/>
                        <input id="updatebtn" type="submit" value="Create" />
                    </form>
                    <br/>
                    <button id="closeModal" onClick={this.closeModal}>Cancel</button>
                  </div>
                </div>
                <button id="openModal" onClick={this.openModal}> Add an item for sale </button>
                  <h2 id="list">items for sale</h2>
                    <div id="itemContainer">
                      <ul>
                        {this.state.items.map((items) => {
                          return(
                            <li>
                            <p id="itemName">{items.name}</p>
                            <br/>
                            <p id="itemDesc">{items.description}</p>
                            <br/>
                            <img src={items.image} alt={items.name} />
                            <br/>
                            <p id="itemPrice">{items.price}</p>
                            <br/>
                            <p id="itemLoc">{items.location}</p>
                            <br/>
                            <button value={items._id} onClick={this.deleteItem}>DELETE</button>
                            <br/><br/>
                              <details>
                                <summary>Edit this item</summary>
                                  <form id={items._id} onSubmit={this.updateItem}>
                                    <label htmlFor="name">Name</label>
                                    <br />
                                      <input
                                      type="text"
                                      id="name"
                                      onChange={this.handleChange}
                                      />
                                    <br />
                                    <label htmlFor="description">description</label>
                                    <br />
                                      <input
                                      type="text"
                                      id="description"
                                      onChange={this.handleChange}
                                      />
                                    <br />
                                    <label htmlFor="price">Price</label>
                                    <br />
                                      <input
                                      type="text"
                                      id="price"
                                      onChange={this.handleChange}
                                      />
                                    <br />
                                    <label htmlFor="location">Location</label>
                                    <br />
                                      <input
                                      type="text"
                                      id="location"
                                      onChange={this.handleChange}
                                      />
                                    <br /><br />
                                      <input id="updatebtn" type="submit" value="Update Item" />
                                  </form>
                                </details>
                              </li>

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
