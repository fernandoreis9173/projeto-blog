import React, {Component, Children} from 'react';
import firebase from '../../firebase';
import './home.css';

class Home extends Component{

    state={
        posts:[]
    };

    componentDidMount(){
        firebase.app.ref('posts').once('value', (snapshot) =>{
            let state = this.state;
            state.posts = [];

            snapshot.forEach((ChildItem)=>{
                state.posts.push({
                    key:ChildItem.key,
                    titulo: ChildItem.val().titulo,
                    image: ChildItem.val().image,
                    descricao: ChildItem.val().descricao,
                    autor: ChildItem.val().autor,
                })
            });
            this.setState(state);
        })
    }

    render(){
        return(
            <section id="post">
                {this.state.posts.map((post)=> {
                    return(
                        <article key={post.key}>
                            <header>
                                <div className="title">
                                    <strong>{post.titulo}</strong>
                                    <span> Autor: {post.autor}</span>
                                </div>
                            </header>
                            <img src={post.image} alt="Capa do Post"/>
                            <footer>
                                <p>{post.descricao}</p>
                            </footer>
                        </article>
                    );
                })}
            </section>
        );
    }
}

export default Home;
