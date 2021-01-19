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
    document.getElementById('form').reset()
  }

  deleteItem = (event) => {
    axios
    .delete('/items/' + event.target.value)
    .then((response) => {
      alert('are you sure you want to delete')
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

  editForm = () => {
    document.getElementByClass('editForm').style.display = "none"
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
    <nav class="nav-extended">
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo"><img src="infinitelogo.png" className="logo"/></a>
      <ul class="right hide-on-med-and-down">
      </ul>
    </div>
    <div class="nav-content">
      <span class="nav-title"></span>
      <a class="btn-floating btn-large halfway-fab waves-effect waves-light teal">
        <i class="material-icons" onClick={this.openModal}>add</i>
      </a>
    </div>
  </nav>
    </div>
    <br/><br/>
    <div id="modal">
      <div id="modal-textbox">
        <form id="form" onSubmit={this.handleSubmit}>
          <label htmlFor="name"><p className="inputText">Name</p></label>
            <input
            type="text"
            id="name"
            className="textbox"
            onChange={this.handleChange} />
          <label htmlFor="image"><p className="inputText">Image</p></label>
            <input
            type="text"
            id="image"
            className="textbox"
            onChange={this.handleChange} />
          <label htmlFor="description"><p className="inputText">description</p></label>
            <input
            type="text"
            id="description"
            className="textbox"
            onChange={this.handleChange} />
          <label htmlFor="price"><p className="inputText">Price</p></label>
            <input
            type="text"
            id="price"
            className="textbox"
            onChange={this.handleChange} />
          <label htmlFor="location"><p className="inputText">Location</p></label>
            <input
            type="text"
            id="location"
            className="textbox"
            onChange={this.handleChange} />
            <br/><br/>
            <input type="submit" onClick={this.closeModal} id="createBtn" class="waves-effect btn-large #b388ff deep-purple accent-1" value="Create" /><br/><br/>
        </form>
        <button class="waves-effect btn-large #b388ff deep-purple accent-1" id="cancel" onClick={this.closeModal}>Cancel</button>
        <br/>
      </div>
    </div>
      <section id="gifdiv">
      <img src="isvideo.gif" id="gif" />
      </section>
        <div id="itemContainer">
          <ul>
            {this.state.items.map((item) => {
              return(
                <div id="itemblock">
                <li>
                <p id="itemTitle">{item.name}</p>
                <p id="itemDesc">{item.description}</p>
                <img src={item.image} className="itemImg" alt={item.name} />
                <br/>
                <p id="itemPrice">${item.price}</p>
                <p id="itemLoc">{item.location}</p>
                  <details>
                    <summary>Edit this item</summary>
                      <form className="editForm" id={item._id} onSubmit={this.updateItem}>
                      <label htmlFor="name"><p className="inputText">Name</p></label>
                        <input
                        type="text"
                        id="name"
                        className="textbox"
                        onChange={this.handleChange} />
                      <label htmlFor="image"><p className="inputText">Image</p></label>
                        <input
                        type="text"
                        id="image"
                        className="textbox"
                        onChange={this.handleChange} />
                      <label htmlFor="description"><p className="inputText">description</p></label>
                        <input
                        type="text"
                        id="description"
                        className="textbox"
                        onChange={this.handleChange} />
                      <label htmlFor="price"><p className="inputText">Price</p></label>
                        <input
                        type="text"
                        id="price"
                        className="textbox"
                        onChange={this.handleChange} />
                      <label htmlFor="location"><p className="inputText">Location</p></label>
                        <input
                        type="text"
                        id="location"
                        className="textbox"
                        onChange={this.handleChange} />
                        <br/><br/>
                        <input type="submit" onClick={this.closeModal} id="edit" class="waves-effect btn-large #b388ff deep-purple accent-1" value="EDIT" />
                        <button class="waves-effect btn-large #b388ff deep-purple accent-1" value={item._id} onClick={this.deleteItem}><i class="material-icons right"></i>DELETE</button>
                        <br/><br/>
                      </form>
                    </details><br/>
                  </li>
                </div>
              )}
            )}
          </ul>
        </div>
        <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">infinite savannah</h5>
                <p class="grey-text text-lighten-4">Premium long boards</p>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2020 Copyright infinite savannah
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

ReactDOM.render(
  <Garage></Garage>,
  document.querySelector('main'))
