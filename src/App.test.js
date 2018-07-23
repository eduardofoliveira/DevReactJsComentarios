import React from 'react'
import { shallow, mount, render } from 'enzyme'
import App from './App'

describe('<App />', () => {
  const base = {
    syncState: jest.fn()
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<App base={base}/>)
    expect(wrapper.length).toBe(1)
  })
  it('should have .container class', () => {
    const wrapper = shallow(<App base={base}/>)
    expect(wrapper.is('.container')).toBe(true)
  })
  it('shows Comments', () => {
    const wrapper = shallow(<App base={base}/>)
    expect(wrapper.find('Comments').length).toBe(1)
  })
  it('shows NewComment', () => {
    const wrapper = shallow(<App base={base}/>)
    expect(wrapper.find('NewComment').length).toBe(1)
  })
  it('adds a new comment to state when postNewComment is called', () => {
    const wrapper = mount(<App base={base}/>)
    wrapper.instance().postNewComment({comment: 'Agora'})
    wrapper.instance().postNewComment({comment: 'Vai'})
    wrapper.instance().postNewComment({comment: 'Teste'})

    setInterval(() => {
      const comments = Object.keys(wrapper.instance().state.comments)
      console.log(comments)
      expect(comments.length).toBe(3)
    }, 250)
    
  })

  /*it('outputs the <App />', () => {
    const wrapperShallow = shallow(<App />)
    const wrapperMount = mount(<App />)
    const wrapperRender = render(<App />)

    //console.log(wrapperShallow.debug())
    //console.log(wrapperMount.debug())
    //console.log(wrapperRender.html())
  })*/
})
