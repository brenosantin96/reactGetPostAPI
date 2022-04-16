import { useState, useEffect, ChangeEvent } from 'react'


type Props = {
    onAdd: (title:string, body:string) => void; 
}

export const PostForm = ({onAdd}: Props) => {

    const [addTitleText, setAddTitleText] = useState('');
    const [addBodyText, setAddBodyText] = useState('');


    const handleAddTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTitleText(e.target.value);
    }

    const handleAddBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAddBodyText(e.target.value);
    }

    const handleAddClick = () => {
        if(addTitleText && addBodyText){
            onAdd(addTitleText, addBodyText);
        } else {
            alert("Preencha os campos!")
        }
    };

    return (
        <fieldset className='border-2 mb-3 p-3'>
            <legend>Adicionar novo Post</legend>
            <input value={addTitleText} className='border block' onChange={handleAddTitleChange} type="text" placeholder='Digite um titulo' />
            <textarea value={addBodyText} className='border block' onChange={handleAddBodyChange} name="" id="" />
            <button className='border block' onClick={handleAddClick}>Adicionar</button>
        </fieldset>
    );

}