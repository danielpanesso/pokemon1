import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonName } from '../store/slices/pokemonName.slice';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/pokedexPage/PokeCard';
import SelectType from '../components/pokedexPage/SelectType';
import './styles/pokedexPages.css';
import Pagination from '../components/pokedexPage/Pagination';

const PokedexPage = () => {

  const [selectValue, setSelectValue] = useState('allPokemons');
  const trainerName = useSelector(store => store.trainerName);
  const pokemonName = useSelector(store => store.pokemonName);
  const dispatch = useDispatch();
  const [pokemons, getPokemons, getPerType] = useFetch();
  const [countPage, setCountPage] = useState(2);

  useEffect(() => {
    if (selectValue === 'allPokemons') {
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=30';  // Url para consumir la api
      getPokemons(url);    
    } else {
      getPerType(selectValue);
    }
  }, [selectValue]);
  

  const textInput =useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setPokemonName(textInput.current.value.trim().toLowerCase()));
    textInput.current.value=''; // Limpiamos el input
  }

  const cbFilter = () => {
    if (pokemonName){
       return pokemons?.results.filter(element => element.name.includes(pokemonName));
    } else {
      return pokemons?.results;
    }
  }
  
  const quantity = 6;
  const total = cbFilter()?.length / quantity;
  const pagination = () => {
    const end = quantity * countPage;
    const start = end - quantity;
    return cbFilter()?.slice(start, end);
  }

  return (
    <div className='pokedex'>
      <img src="https://academlo.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F0640d539-599c-477d-b514-cd74b15ced93%2F3ce5ae02-7933-496c-8bbe-b8d42997e98c%2FUntitled.png?table=block&id=1aeaf2c7-e73f-472a-9635-8bf2dee6f565&spaceId=0640d539-599c-477d-b514-cd74b15ced93&width=1600&userId=&cache=v2" alt="" />
      <section className='poke-header'>
      <h3><span>Bienvenido {trainerName},</span> Aqui podras encontrar tu pokemon favorito</h3>
      <h3>Por favor ingrese el nombre de un pokemon</h3>
        <form onSubmit={handleSubmit} className='poke-search'>
          <input className='poke-input' type="text" ref={textInput}/>
          <button className='poke-btn'>Buscar</button>
        </form>
        <SelectType 
          setSelectValue= {setSelectValue}
        />
      </section>
      <section className='poke-container'>
        {
          pagination()?.map(poke => (
            <PokeCard 
              key={poke.url}
              url={poke.url}
            />
          ))
        }
      </section>
      <Pagination 
        setCountPage= {setCountPage}
        countPage={countPage}
        total= {total}
      />
    </div>
  )
}

export default PokedexPage;

