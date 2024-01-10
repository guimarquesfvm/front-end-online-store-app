"use client";
import React from 'react'
import useProduct from '@/hooks/useProduct'
import BackBtnIcon from '@/components/icons/back-btn';
import styled from 'styled-components';

interface Props {
  searchParams: {
    id: string
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

    section {
      display: flex;
      justify-content: center;
      align-items: center;
  }
`

function Page({searchParams}: Props) {
  const { data, isLoading } = useProduct(searchParams.id);
  console.log(data);
  
  return (
    <Container>
      <button>
        <BackBtnIcon />
        Voltar
      </button>
      <section>
        <div>
          <h2>{data.title}</h2>
          <img src={data.thumbnail} alt="foto do produto" />
        </div>
        <div>
          <h2>Especificações técnicas</h2>
          <ul>
            {data?.attributes.map((att: any) => (
              <li>{att.name}: {att.value_name}</li>
            ))}
          </ul>
          <div>
            <h2>{data.price}</h2>
            <div>Quatity</div>
            <button>Adicionar ao Carrinho</button>
          </div>
        </div>
      </section>
      <section>
        <h2>Avaliações</h2>
        <input type="email" />
        <div>estrelas</div>
        <textarea name="" id=""></textarea>
        <button>Avaliar</button>
        <div>
          <ul>
            <li>avaliações</li>
            <li>avaliações</li>
            <li>avaliações</li>
          </ul>
        </div>
      </section>
    </Container>
  )
}

export default Page