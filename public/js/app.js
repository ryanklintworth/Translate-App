class Garage extends React.Component {
  state = {
    name: '',
    image: '',
    description: '',
    price: '',
    location: '',
    items: []
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
            <h2 id="sell">Sell</h2>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="name"><p className="inputText">Name</p></label>
                  <input type="text" id="name" onChange={this.handleChange} />
                <label htmlFor="image"><p className="inputText">Image</p></label>
                  <input type="text" id="image" onChange={this.handleChange} />
                <label htmlFor="description"><p className="inputText">description</p></label>
                  <input type="text" id="description" onChange={this.handleChange} />
                <label htmlFor="price"><p className="inputText">Price</p></label>
                  <input type="text" id="price" onChange={this.handleChange} />
                <label htmlFor="location"><p className="inputText">Location</p></label>
                  <input type="text" id="location" onChange={this.handleChange} />
              </form>
                  <h2 id="list">items for sale</h2>
                    <div id="itemContainer">
                      <ul>
                        {this.state.}
                    </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Garage></Garage>,
  document.querySelector('main')
)
