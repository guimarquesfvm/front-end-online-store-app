"use client";
import React from "react";
import useProduct from "@/hooks/useProduct";
import BackBtnIcon from "@/components/icons/back-btn";
import styled from "styled-components";
import RatingStar from "@/components/icons/rating-star";
import { formatPrice } from "@/helpers/formatPrice";

interface Props {
  searchParams: {
    id: string;
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 28px;

  main {
    padding: 24px 40px;
  }
  .back-btn {
    background-color: transparent;
    border: none;
    color: var(--primary-button);
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 24px;
  }

  .photo-and-info-section {
    display: flex;
    gap: 40px;
    width: 100%;

    .photo-and-name-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 50%;
      max-width: 580px;
      border-radius: 24px;
      box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.25);
      padding: 36px;
      img {
        width: 100%;
      }
    }

    .infos-and-cart-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      width: 50%;

      gap: 16px;

      .infos-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .handle-cart-container {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;

        .handle-quantity-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          button {
            background-color: transparent;
            border: none;
            cursor: pointer;
            font-size: 28px;
            color: var(--secondary-text);
          }

          span {
            font-size: 16px;
            font-weight: bold;
            line-height: 16px;
            color: white;
            background-color: var(--secondary-text);
            height: 24px;
            width: 24px;
            padding: 5px;
            text-align: center;
            border-radius: 50%;
            display: inline-block;
          }
        }

        .add-to-cart-btn {
          padding: 16px 36px;
          background-color: var(--primary-button);
          border: none;
          color: white;
          font-size: 16px;
          font-weight: 600;
          line-height: 16px;
          cursor: pointer;
        }
      }
    }
  }

  .rating-background {
    background-color: var(--rating-bg);
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 28px 40px;
    gap: 40px;
    .rating-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      background-color: white;
      gap: 12px;
      padding: 32px;

      .rating-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 16px;
  
        > div {
          display: flex;
          gap: 8px;
          input {
            width: 325px;
            padding: 8px;
            border: 1px solid var(--secondary-text);
            ::placeholder {
              color: var(--secondary-text);
            }
          }
  
          ul {
            display: flex;
            align-items: center;
            gap: 8px;
            list-style: none;
  
            li {
              cursor: pointer;
            }
          }

        }
  
        textarea {
          width: 488px;
          height: 152px;
          border: 1px solid var(--secondary-text);
          resize: none;
          font-family: inherit;
          padding: 8px;
          ::placeholder {
            color: var(--secondary-text);
          }
        }

      }
      button {
        padding: 16px 96px;
        background-color: var(--primary-button);
        border: none;
        cursor: pointer;
        color: white;
        font-size: 16px;
        font-weight: bold;
      }
    }

    .ratings-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 8px;

      .rating-card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        background-color: white;
        width: 100%;
        padding: 28px 54px;
        gap: 16px;

        div {
          display: flex;
          align-items: center;
          gap: 76px;
        }
        ul {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
        }

        p {
          color: var(--secondary-text);
        }
      }
    }
  }
`;

function Page({ searchParams }: Props) {
  const { data, isLoading } = useProduct(searchParams.id);

  return (
    <Container>
      <main>
        <button className="back-btn">
          <BackBtnIcon />
          Voltar
        </button>
        <section className="photo-and-info-section">
          <div className="photo-and-name-container">
            <h2>{data?.title}</h2>
            <img src={data?.thumbnail} alt="foto do produto" />
          </div>
          <div className="infos-and-cart-container">
            <div className="infos-container">
              <h2>Especificações técnicas</h2>
              <ul>
                {data?.attributes?.map((att: any) => (
                  <li key={att.id}>
                    {att.name}: {att.value_name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="handle-cart-container">
              <h2>{formatPrice(data?.price)}</h2>
              <div className="handle-quantity-container">
                <button>-</button>
                <span>0</span>
                <button>+</button>
              </div>
              <button className="add-to-cart-btn">Adicionar ao Carrinho</button>
            </div>
          </div>
        </section>
      </main>
      <div className="rating-background">
        <section className="rating-section">
          <h2>Avaliações</h2>
          <div className="rating-container">
            <div>
              <input type="email" placeholder="Email" />
              <ul>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
              </ul>
            </div>
            <textarea name="" id="" placeholder="Mensagem (opcional)"></textarea>
          </div>
          <button>Avaliar</button>
        </section>
        <section className="ratings-section">
          <div className="rating-card">
            <div>
              <h2>foo@bar.com</h2>
              <ul>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
              </ul>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
          </div>
          <div className="rating-card">
            <div>
              <h2>foo@bar.com</h2>
              <ul>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
              </ul>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
          </div>
          <div className="rating-card">
            <div>
              <h2>foo@bar.com</h2>
              <ul>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
                <li><RatingStar.NotFilled /></li>
              </ul>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default Page;
