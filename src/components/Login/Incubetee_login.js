import React from 'react';
import axios from 'axios';

const projectID = 'df5005e2-f3ab-4398-ac75-b090411fa2c9';

class Incubetee_Login extends React.Component {

    state = { path: 'http://localhost:3000/incubetee' }

    componentDidMount() {
        const signUpButton = document.getElementById("signUp");
        const signInButton = document.getElementById("signIn");
        const container = document.getElementById("container-client");

        signUpButton.addEventListener("click", () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener("click", () => {
            container.classList.remove("right-panel-active");
        });
    }

    state = {
        groupName: '',
        no_of_members: 0,
        member1: '',
        member2: '',
        member3: '',
        member4: '',
        deadline: '',
        email: '',
        clientpassword: '',
        username: '',
        password: ''
    };

    project_id = 'df5005e2-f3ab-4398-ac75-b090411fa2c9';
    private_key = 'fae722fb-0093-47b4-8627-7fd16719780f';

    onSubmit1 = (e) => {
        e.preventDefault();
        let data = {
            groupName: this.state.groupName,
            no_of_team_members: this.state.no_of_members,
            name_of_members: [this.state.member1, this.state.member2, this.state.member3, this.state.member4],
            authorization_status: false,
            deadline: this.state.deadline,
            email: this.state.email,
            password: this.state.password,
            deadlineStatus: false,
            role: "Non Admin"
        };
        axios.post(`http://localhost:8080/api/register_incubeete`, data)
            .then((incubetee) => {
                alert("Successfully Registered");
                console.log(data);
                localStorage.setItem("groupName", incubetee.data.groupName);
                localStorage.setItem("no_of_team_members", incubetee.data.no_of_team_members);
                localStorage.setItem("clientdeadline", incubetee.data.deadline);
                localStorage.setItem("clientemail", incubetee.data.email);
                localStorage.setItem("clientpassword", this.state.password);
                axios({
                    method: 'POST',
                    url: 'https://api.chatengine.io/chats/',
                    headers: {
                        'Project-ID': this.project_id,
                        'User-Name': 'Lakshy',
                        'User-Secret': 'Welcome@123'
                    },
                    data: {
                        "title": this.state.groupName,
                        "admin_username": 'Lakshy'
                    }
                });
                if (this.state.member1 !== '') {
                    console.log(this.state.member1);
                    axios({
                        method: 'POST',
                        url: 'https://api.chatengine.io/users/',
                        headers: {
                            'PRIVATE-KEY': this.private_key
                        },
                        data: {
                            "username": this.state.member1,
                            "secret": this.state.password
                        }
                    });
                }
                if (this.state.member2 !== '') {
                    console.log(this.state.member2);
                    axios({
                        method: 'POST',
                        url: 'https://api.chatengine.io/users/',
                        headers: {
                            'PRIVATE-KEY': this.private_key
                        },
                        data: {
                            "username": this.state.member2,
                            "secret": this.state.password
                        }
                    });
                }
                if (this.state.member3 !== '') {
                    console.log(this.state.member3);
                    axios({
                        method: 'POST',
                        url: 'https://api.chatengine.io/users/',
                        headers: {
                            'PRIVATE-KEY': this.private_key
                        },
                        data: {
                            "username": this.state.member3,
                            "secret": this.state.password
                        }
                    });
                }
                if (this.state.member4 !== '') {
                    console.log(this.state.member4);
                    axios({
                        method: 'POST',
                        url: 'https://api.chatengine.io/users/',
                        headers: {
                            'PRIVATE-KEY': this.private_key
                        },
                        data: {
                            "username": this.state.member4,
                            "secret": this.state.password
                        }
                    });
                }
                this.setState({ path: 'http://localhost:3000/dashboard' })
            })
            .catch((err) => {
                console.log("Error while registering the customer");
            })
    };

    onSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.username, this.state.password);
        const authObject = { 'Project-ID': projectID, 'User-Name': this.state.username, 'User-Secret': this.state.password };
        try {
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });

            localStorage.setItem('username', this.state.username);
            localStorage.setItem('password', this.state.password);

            // window.location.reload();
            alert("Successfully passed");
            this.setState({ path: 'http://localhost:3000/dashboard' })
        } catch (err) {
            alert('Oops, incorrect credentials.');
        };
    };


    render() {
        return (
            <div className="fake-body">
                <h2 className="client-h2" style={{ color: 'black' }}>Welcome Back Incubatee</h2>
                <div className="container-client" id="container-client">
                    <div className="form-container-client sign-up-container-client">
                        <form className="client-form" >
                            <h1 className="client-h1">Create Account</h1>
                            <div class="social-container" onSubmit={this.onSubmit1}>
                                <a href="#" className="social anker-client"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social anker-client"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social anker-client"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span className="client-span">or use your email for registration</span>
                            <input type="text" style={{ color: 'black' }} value={this.state.groupName} onChange={(e) => this.setState({ groupName: e.target.value })} placeholder="Group Name" className="signup-input" />
                            <input type="text" style={{ color: 'black' }} value={this.state.no_of_members} onChange={(e) => this.setState({ no_of_members: e.target.value })} placeholder="Number of team members" className="signup-input" />
                            <input type="email" style={{ color: 'black' }} value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder="Team Leader Email" className="signup-input" />
                            <input type="password" style={{ color: 'black' }} value={this.state.clientpassword} onChange={(e) => this.setState({ clientpassword: e.target.value })} placeholder="Password" className="signup-input" />
                            <button className="btn-client" onSubmit={this.onSubmit1}>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container-client sign-in-container-client">
                        <form className="client-form" onSubmit={this.onSubmit}>
                            <h1 className="client-h1" style={{ color: 'black' }}>Sign in</h1>
                            <div className="social-container">
                                <a href="#" className="social anker-client"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social anker-client"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social anker-client"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span className="client-span">or use your account</span>
                            <input type="text" style={{ color: 'black' }} value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} placeholder="Name" className="signup-input" />
                            <input type="password" style={{ color: 'black' }} value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder="Password" className="signup-input" />
                            <a className="anker-client" href="#">Forgot your password?</a>
                            <button className="btn-client" onSubmit={this.onSubmit}><a href={this.state.path}>Sign In</a></button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className="client-h1">Welcome Back!</h1>
                                <p className="client-para">To keep connected with us please login with your personal info</p>
                                <button className="ghost btn-client" id="signIn">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="client-h1">Hello, Friends!</h1>
                                <p className="client-para">Enter your personal details and start journey with us</p>
                                <button className="ghost btn-client" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Incubetee_Login;