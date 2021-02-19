import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Clock2, Counter} from './hook';
import {Calculator} from "./lifting-state-up";
import {WelcomeDialog} from "./composition-vs-inheritance";
import {FilterableProductTable, IProductCategory} from "./thinking-in-react";
import {Weather, WeatherHook} from "./api-data";

interface IUser {
    firstName: string;
    lastName: string;
}

function formatName(iUser: IUser): string {
    return iUser.firstName + ' ' + iUser.lastName;
}

// 1
function Welcome(props: IUser) {
    return <h1>Hello, {formatName(props)}</h1>
}

const element = <Welcome firstName='123' lastName='456'/>

// 2
const Welcome2 = (iUser: IUser) =>
    <h1>Hello, {formatName(iUser)}</h1>
const element2 = <Welcome2 firstName='123' lastName='456'/>

// 3
const Welcome3 = ({firstName, lastName}: { firstName: string, lastName: string }) =>
    <h1>Hello, {firstName + ' ' + lastName}</h1>
const element3 = <Welcome3 firstName='123' lastName='456'/>

// 4
class Welcome4 extends React.Component<IUser, {}> {
    render() {
        return (<h1>Hello, {this.props.firstName + ' ' + this.props.lastName}</h1>);
    }
}

const element4 = <Welcome4 firstName='123' lastName='456'/>

const allElement = <div>
    <div>
        "t1:"
        {element}
    </div>
    <div>
        "t2:"
        {element2}
    </div>
    <div>
        "t3:"
        {element3}
    </div>
    <div>
        "t4:"
        {element4}
    </div>
</div>

//----------------------------- 组件拆分-----------------------------

type UserProp = {
    name: string,
    avatarUrl: string,
}

type CommentProp = {
    author: UserProp,
    text: string,
    date: Date,
}


const Avatar = (props: UserProp) => (
    <img className="Avatar"
         src={props.avatarUrl}
         alt={props.name}
    />
)

const UserInfo = (props: UserProp) => (
    <div className="UserInfo">
        <Avatar name={props.name} avatarUrl={props.avatarUrl}/>
        <div className="UserInfo-name">
            {props.name}
        </div>
    </div>
)

const comment: CommentProp = {
    date: new Date(),
    text: 'I hope you enjoy learning React!',
    author: {
        name: 'Hello Kitty',
        avatarUrl: 'https://placekitten.com/g/64/64',
    },
};

const SimpleComment = (props: CommentProp) => (
    <div className="Comment">
        <UserInfo name={props.author.name} avatarUrl={props.author.avatarUrl}/>
        <div className="Comment-text">
            {props.text}
        </div>
        <div className="Comment-date">
            {props.date.toLocaleDateString}
        </div>
    </div>
)

const simpleComment = <SimpleComment author={comment.author} text={comment.text} date={comment.date}/>

// ----------------------state--------------------------------
type SomeDate = {
    date: Date
}

class Clock extends React.Component<{}, SomeDate> {
    timerID: NodeJS.Timeout

    constructor(props: Date, tID: NodeJS.Timeout) {
        super(props);
        this.state = {date: new Date()};
        this.timerID = tID
    }


    componentDidMount() {
        console.log(this.state.date)
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            date: new Date(),
        })
    }


    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

//------------------------事件处理----------------------------
const EventCom = () => {
    function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        console.log('The link was clicked.');
    }

    return (<a href="https://baidu.com" onClick={handleClick}>
        Click me
    </a>)
}

type ToggleType = {
    isToggleOn: boolean
}

class Toggle extends React.Component<{}, ToggleType> {
    constructor(props: {}) {
        super(props);
        this.state = {isToggleOn: true};

        // 为了在回调中使用 `this`，这个绑定是必不可少的
        // this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}


const Toogle2 = () => {
    const [toggle, setToggle] = useState(true)
    const handleClick = () => {
        setToggle(!toggle)
    }
    return (
        <button onClick={handleClick}>
            {toggle ? 'ON' : 'OFF'}
        </button>
    );
}

interface GreetingProp {
    isLoggedIn: boolean
}

const Getting = (props: GreetingProp) => {
    if (props.isLoggedIn) {
        return <h1>Welcome back!</h1>
    } else {
        return <h1>Please sign up.</h1>
    }
}

interface btnProp {
    onClick(): void
}

function LoginButton(p: btnProp) {
    return (
        <button onClick={p.onClick}>
            Login
        </button>
    );
}

function LogoutButton(p: btnProp) {
    return (
        <button onClick={p.onClick}>
            Logout
        </button>
    );
}

const LoginControl = () => {
    const [loginState, setLoginState] = useState({isLoggedIn: false})

    const handleLoginClick = () => {
        setLoginState({isLoggedIn: true})
    }

    const handleLogoutClick = () => {
        setLoginState({isLoggedIn: false})
    }

    let button;
    if (loginState.isLoggedIn) {
        button = <LogoutButton onClick={handleLogoutClick}/>;
    }

}

interface NumberListProp {
    numbers: number[]
}

//------------------------------list----------------------------------
const NumberList = (props: NumberListProp) => {
    const listItems = props.numbers.map((number) =>
        <li key={number.toString()}>
            {number}
        </li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

const numbers = [1, 2, 3, 4, 5];

//--post--
interface post {
    id: number
    title: string
    content: string
}

interface blogList {
    posts: post[],
}

const Blog = (props: blogList) => {
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
                <li key={post.id}>
                    {post.title}
                </li>
            )}
        </ul>
    )

    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    )
    return (
        <div>
            {sidebar}
            <hr/>
            {content}
        </div>
    )
}

const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

//---------------------------------------form-------------------------------
interface IEvent {
    value: string,
}

const NameForm = () => {
    const [event, setEvent] = useState("");
    const handleChange = (e: React.ChangeEvent<IEvent>) => {
        setEvent(e.target.value)
    }
    const handleSubmit = () => {
        alert('提交的名字: ' + event);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>名字：
                <input type="text" value={event} onChange={(e) => {
                    setEvent(e.target.value)
                }}/>
            </label>
            <input type="submit" value="提交"/>
        </form>
    )
}

//-------textarea--------
const EssayForm = () => {
    const [content, setContent] = useState("请撰写一篇关于你喜欢的 DOM 元素的文章.")

    return (
        <form onSubmit={(e) => {
            alert('提交的文章: ' + content)
            e.preventDefault()
        }}>
            <label>
                文章:
                <textarea value={content} onChange={(e) => {
                    setContent(e.target.value)
                }}/>
            </label>
            <input type="submit" value="提交"/>
        </form>
    )
}
//---------select----------
const FlavorForm = () => {
    const [selected, setSelect] = useState("coconut")
    return (
        <form onSubmit={(e) => {
            alert('你喜欢的风味是: ' + selected);
            e.preventDefault()
        }}>
            <label>
                选择你喜欢的风味:
                <select value={selected} onChange={(e) => {
                    setSelect(e.target.value);
                }}>
                    <option value="grapefruit">葡萄柚</option>
                    <option value="lime">酸橙</option>
                    <option value="coconut">椰子</option>
                    <option value="mango">芒果</option>
                </select>
            </label>
            <input type="submit" value="提交"/>
        </form>
    )
}

//--------multiInput----------
const Reservation = () => {
    const [isGoing, setIsGoing] = useState(true)
    const [numberOfGuests, setNumberOfGuests] = useState(2)

    return (
        <form>
            <label>
                参与:
                <input
                    name="isGoing"
                    type="checkbox"
                    checked={isGoing}
                    onChange={(e) => setIsGoing(e.target.checked)}/>
            </label>
            <br/>
            <label>
                来宾人数:
                <input
                    name="numberOfGuests"
                    type="number"
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(+e.target.value)}/>
            </label>
        </form>
    )
}

//---非受控组件---
const RefNameForm = () => {
    const input = React.createRef<HTMLInputElement>()
    return (
        <form onSubmit={(e) => {
            console.log(input.current?.value)
            e.preventDefault()
        }}
        >
            <label>
                Name:
                <input type="text" ref={input}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    )
}

const data = [
    {
        category: "Sporting Goods",
        products:[
            {price: "$49.99", stocked: true, name: "Football"},
            {price: "$9.99", stocked: true, name: "Baseball"},
            {price: "$29.99", stocked: false, name: "Basketball"},
        ],
    },
    {
        category: "Electronics",
        products:[
            {price: "$99.99", stocked: true, name: "iPod Touch"},
            {price: "$399.99", stocked: false, name: "iPhone 5"},
            {price: "$199.99", stocked: true, name: "Nexus 7"},
        ],
    },
];

ReactDOM.render(
    // <Calculator  scale={'c'} temperature={'100'}/>,
    // <FilterableProductTable categories={data}/>,
    <WeatherHook/>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
