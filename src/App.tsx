import { useEffect, useState } from 'react'
import { PostForm } from './components/PostForm';
import logo from './logo.svg'
import { Post } from './Types/Post';
import { PostItem } from './components/PostItem'
import './App.css'
import { api } from './api';

function App() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [])

  const loadPosts = async () => {
    setLoading(true);
    let json = await api.getAllPosts();
    setLoading(false);
    setPosts(json);
  }


  const handleAddPost = async (title: string, body: string) => {

    let json = await api.addNewPost(title, body, 1);
    if (json.id) {
      console.log(json);
      alert("Post adicionado com sucesso")
    } else {
      alert("Ocorreu algum erro.")
    }
  }

  return (
    <div className='p-6'>
      {loading && <div>Carregando...</div>}


      <PostForm onAdd={handleAddPost} />


      {!loading && posts.length > 0 &&
        <>
          <div>Total de posts: {posts.length}</div>
          <div>
            {posts.map((item, index) => (
              <PostItem key={index} data={item} />
            ))}
          </div>
        </>
      }

      {!loading && posts.length === 0 &&
        <div>
          Não há posts para serem exibidos.
        </div>
      }

    </div>
  )
}


//https://api.b7web.com.br/cinema/
export default App
