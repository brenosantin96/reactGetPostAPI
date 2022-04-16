import { ChangeEvent, useEffect, useState } from 'react'
import logo from './logo.svg'
import { Post } from './Types/Post';
import './App.css'

function App() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const [addTitleText, setAddTitleText] = useState('');
  const [addBodyText, setAddBodyText] = useState('');

  useEffect(() => {
    loadPosts();
  }, [])

  const loadPosts = async () => {
    setLoading(true)
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();
    setPosts(json);
    setLoading(false);
  }

  const handleAddTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddTitleText(e.target.value);
  }

  const handleAddBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAddBodyText(e.target.value);
  }

  const handleAddClick = async () => {
    if(addTitleText && addBodyText){

      let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: addTitleText,
          body: addBodyText,
          userId: 1
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let json = await response.json();
      console.log(json);

      if(json.id){
        alert("Post adicionado com sucesso")
      } else {
        alert("Ocorreu algum erro.")
      }

    } else {
      alert("Preencha com todos os dados")
    }
  };



  return (
    <div className='p-6'>
      {loading && <div>Carregando...</div>}


      <fieldset className='border-2 mb-3 p-3'>
        <legend>Adicionar novo Post</legend>
        <input value={addTitleText} className='border block' onChange={handleAddTitleChange} type="text" placeholder='Digite um titulo' />
        <textarea value={addBodyText} className='border block' onChange={handleAddBodyChange} name="" id="" />
        <button className='border block' onClick={handleAddClick}>Adicionar</button>

      </fieldset>


      {!loading && posts.length > 0 &&
        <>
          <div>Total de posts: {posts.length}</div>
          <div>
            {posts.map((item, index) => (
              <div key={index} className="my-4">
                <h4 className='font-bold'>{item.title}</h4>
                <small>#{item.id} - Usuário: {item.userId}</small>
                <p>{item.body}</p>
              </div>
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
