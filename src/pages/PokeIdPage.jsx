import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import '../pages/styles/pokeIdPage.css';

const PokeIdpage = () => {

  const [ pokeData, getPokeData ] = useFetch();
  const param = useParams();  

  useEffect(()=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${param.id}`;
    getPokeData(url);
    }, []);

  return (
    <div className="container">
        <img src="https://academlo.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F0640d539-599c-477d-b514-cd74b15ced93%2F3ce5ae02-7933-496c-8bbe-b8d42997e98c%2FUntitled.png?table=block&id=1aeaf2c7-e73f-472a-9635-8bf2dee6f565&spaceId=0640d539-599c-477d-b514-cd74b15ced93&width=1600&userId=&cache=v2" alt="" />
      <div className='poke-id'>
        <article className='card-article'>
            <img src={pokeData?.sprites.other['official-artwork'].front_default} alt="pokemon photo" /> <br />
            <h3>{pokeData?.name}</h3>
        </article>
      </div>
    </div>
  )
}

export default PokeIdpage;
