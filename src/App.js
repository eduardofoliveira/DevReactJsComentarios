import React, { Component } from 'react'
import 'bootstrap-css-only'

import NewComment from './NewComment'
import Comments from './Comments'

class App extends Component {
  constructor(props){
    super(props)

    this.postNewComment = this.postNewComment.bind(this)

    this.state = {
      comments: {
      },
      isLoggedIn: false,
      user: {}
    }

    this.refComments = this.props.base.syncState('comments', {
      context: this,
      state: 'comments'
    })

    this.props.auth.onAuthStateChanged((user)=>{
      if(user){
        this.setState({ isLoggedIn: true, user })
      }else{
        this.setState({ isLoggedIn: false, user: {} })
      }
    })

  }
  postNewComment(comment){
    comment.user = {
      uid: this.state.user.uid,
      name: this.state.user.displayName
    }
    let comments = { ...this.state.comments }
    let timestamp = Date.now()
    comments[`comm-${timestamp}`] = comment

    this.setState({
      comments: comments
    })
  }
  auth(provider){
    this.props.auth.signInWithPopup(this.props.providers[provider])
  }
  render() {
    return (
      <div className="container">
        { this.state.isLoggedIn && 
          <div>
            <div className="div-header">
              <img className="img-thumbnail" alt={this.state.user.displayName} src={this.state.user.photoURL}/>
              {this.state.user.displayName}
              
              <button id="btn-logout" onClick={() => this.props.auth.signOut()} className="btn btn-danger">Deslogar</button>
            </div>
            <NewComment postNewComment={this.postNewComment}/>
          </div> 
        }
        { !this.state.isLoggedIn && 
          <div className="alert alert-info" align="center">
            <button onClick={() => this.auth('facebook')} className="btn btn-primary">Entre com o Facebook para comentar</button>
          </div> }
        <Comments comments={this.state.comments} />
      </div>
    )
  }
}

export default App
