import React from 'react'
import {NavLink, Route, Link} from 'react-router-dom'

const Home = (props) => {
    console.log(props, 'home');
    return <h1>Home</h1>
}

const App = ({history,match,location}) => (
    <div>
        <AddressBar/>
        <Link to="/router1">home</Link>
        <Link to={`${match.url}/props/1?name=zyh`}>props</Link>
        <Link
            to={{
            pathname: 'router1/props/1',
            search: '?name=zyh',
            state: {
                price: 123
            }
        }}>props obj</Link>
        <NavLink to="/router1/query/user?id=123&name=router" isActive={console.info('active')}>query1</NavLink>

        <div>
            <Route exact path="/" component={Home}/>
            <Route
                path="/router1/props/:id"
                render={({history, location, match}) => {
                console.log(history, location, match);
                return <button onClick={() => history.push('/router1')}>to home</button>
            }}/>
            
            <Route
            path='/router1/query/user'
            render={({match, location}) => (
            <div>
                <p>query</p>
                <p>match:{JSON.stringify(match)}</p>
                <p>location:{JSON.stringify(location)}</p>
                <p>id:{new URLSearchParams(location.search).get('id')}</p>
                <p>name:{new URLSearchParams(location.search).get('name')}</p>
            </div>
        )}/>
        </div>
       
    </div>
)


/* 为了展示URL的变化的组件 请无视我*/
const AddressBar = () => (<Route
    render={({location: {
        pathname
    }, history}) => (
    <div className="address-bar">
        <div>
            <button className="ab-button" onClick={history.goBack}>◀︎</button>
        </div>
        <div>
            <button className="ab-button" onClick={history.goForward}>▶</button>
        </div>
        <div className="url">URL: {location.pathname}</div>
    </div>
)}/>)

export default App