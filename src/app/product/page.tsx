"use client";
import React, { useContext, useState } from "react";
import useProduct from "@/hooks/useProduct";
import BackBtnIcon from "@/components/icons/back-btn";
import styled from "styled-components";
import RatingStar from "@/components/icons/rating-star";
import { formatPrice } from "@/helpers/formatPrice";
import { StoreContext } from "@/context/StoreContext";
import RatingCard from "@/components/rating-card";
import { useRouter } from "next/navigation";

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

  .rating-background {
    background-color: var(--rating-bg);
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 28px 40px;
    gap: 40px;
  }
`;

const BackButton = styled.button`
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
`;

const ProductDetails = styled.section`
  display: flex;
  gap: 40px;
  width: 100%;
`;

const ProductImageAndName = styled.div`
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
`;

const ProductInfoAndCartHandlers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 50%;

  gap: 16px;
`;

const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ul {
    color: var(--infos-text);
    font-size: 16px;
  }
`;

const CartHandlers = styled.div`
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
`;

const RatingForm = styled.section`
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
  .submit-rating {
    padding: 16px 96px;
    background-color: var(--primary-button);
    border: none;
    cursor: pointer;
    color: white;
    font-size: 16px;
    font-weight: bold;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
`;

const RatingsList = styled.section`
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
`;

function Page({ searchParams }: Props) {
  const { data } = useProduct(searchParams.id);
  const { cartItems, setCartItems, ratings, setRatings } =
    useContext(StoreContext);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [userRating, setUserRating] = useState({
    id: data?.id,
    stars: 0,
    email: "",
    message: "",
  });

  const productRatings = ratings.filter((rating) => rating.id === data?.id);

  const handleAddToCart = () => {
    const itemExists = cartItems.findIndex((item) => item.id === data?.id);
    const newCart = cartItems;
    if (itemExists !== -1) {
      newCart[itemExists].quantity += selectedQuantity;
      setCartItems(newCart);
    } else {
      setCartItems([...cartItems, { ...data, quantity: selectedQuantity }]);
    }
  };

  const handleQuantity = (operation: string) => {
    if (operation === "+") {
      setSelectedQuantity(selectedQuantity + 1);
    } else if (operation === "-") {
      if (selectedQuantity === 1) {
        return;
      }
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const handleRating = (rating: number) => {
    setUserRating({ ...userRating, stars: rating });
  };

  const handleSubmitRating = () => {
    setRatings([...ratings, { ...userRating, id: data?.id }]);
    setUserRating({
      id: data?.id,
      stars: 0,
      email: "",
      message: "",
    });
  };
  const router = useRouter();

  const handleNavigateHome = () => {
    router.push("/");
  };
  return (
    <Container>
      <main>
        <BackButton onClick={() => handleNavigateHome()}>
          <BackBtnIcon />
          Voltar
        </BackButton>
        <ProductDetails>
          <ProductImageAndName>
            <h2>{data?.title}</h2>
            <img src={data?.thumbnail} alt="foto do produto" />
          </ProductImageAndName>
          <ProductInfoAndCartHandlers>
            <InfosContainer>
              <h2>Especificações técnicas</h2>
              <ul>
                {data?.attributes?.map((att: any) => (
                  <li key={att.id}>
                    {att.name}: {att.value_name}
                  </li>
                ))}
              </ul>
            </InfosContainer>
            <CartHandlers>
              <h2>{formatPrice(data?.price)}</h2>
              <div className="handle-quantity-container">
                <button onClick={() => handleQuantity("-")}>-</button>
                <span>{selectedQuantity}</span>
                <button onClick={() => handleQuantity("+")}>+</button>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart()}
              >
                Adicionar ao Carrinho
              </button>
            </CartHandlers>
          </ProductInfoAndCartHandlers>
        </ProductDetails>
      </main>
      <div className="rating-background">
        <RatingForm>
          <h2>Avaliações</h2>
          <div className="rating-container">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={userRating.email}
                onChange={(e) =>
                  setUserRating({ ...userRating, email: e.target.value })
                }
              />
              <ul>
                <li onClick={() => handleRating(1)}>
                  {userRating.stars >= 1 ? (
                    <RatingStar.Filled />
                  ) : (
                    <RatingStar.NotFilled />
                  )}
                </li>
                <li onClick={() => handleRating(2)}>
                  {userRating.stars >= 2 ? (
                    <RatingStar.Filled />
                  ) : (
                    <RatingStar.NotFilled />
                  )}
                </li>
                <li onClick={() => handleRating(3)}>
                  {userRating.stars >= 3 ? (
                    <RatingStar.Filled />
                  ) : (
                    <RatingStar.NotFilled />
                  )}
                </li>
                <li onClick={() => handleRating(4)}>
                  {userRating.stars >= 4 ? (
                    <RatingStar.Filled />
                  ) : (
                    <RatingStar.NotFilled />
                  )}
                </li>
                <li onClick={() => handleRating(5)}>
                  {userRating.stars >= 5 ? (
                    <RatingStar.Filled />
                  ) : (
                    <RatingStar.NotFilled />
                  )}
                </li>
              </ul>
            </div>
            <textarea
              name=""
              id=""
              placeholder="Mensagem (opcional)"
              value={userRating.message}
              onChange={(e) =>
                setUserRating({ ...userRating, message: e.target.value })
              }
            ></textarea>
          </div>
          <button
            className="submit-rating"
            disabled={userRating.stars === 0}
            onClick={() => handleSubmitRating()}
          >
            Avaliar
          </button>
        </RatingForm>
        <RatingsList>
          {productRatings?.map((rating, i) => (
            <RatingCard
              key={i}
              email={rating.email}
              stars={rating.stars}
              message={rating.message}
            />
          ))}
        </RatingsList>
      </div>
    </Container>
  );
}

export default Page;
