import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'


import { mainRouter } from './routes'
import Frame from './components/Frame'

export default class App extends Component {
    render() {
        return (
          <Frame>
            <Switch>
              { 
                mainRouter.map(route=>{
                    return (<Route 
                        key={route.path} 
                        path={route.path} 
                        render={(routeProps)=>{
                            return <route.component {...routeProps} />
                        }}
                        />)
                    })
                }
                <Redirect to={mainRouter[0].path} from='/'/>
            </Switch>
          </Frame>
        )
    }
}
