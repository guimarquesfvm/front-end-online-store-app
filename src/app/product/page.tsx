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
import { Attribute } from "@/types/product-type";
import PrimaryButton from "@/components/primary-button";

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
    width: 100%;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: ${(props) => props.theme.mediumScreenBreakpoint}) {
    flex-direction: row;
  }
`;

const ProductImageAndName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  max-width: 580px;
  min-width: 400px;
  border-radius: 24px;
  box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.25);
  padding: 36px;
  img {
    width: 100%;
  }

  @media (max-width: ${(props) => props.theme.mediumScreenBreakpoint}) {
    max-width: none;
    min-width: none;
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

  .price-and-quantity {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 50%;
    gap: 24px;
  }

  @media (max-width: ${(props) => props.theme.desktopBreakpoint}) {
    flex-direction: column;
    gap: 12px;
  }

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
      newCart[itemExists].quantity!! += selectedQuantity;
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

  const starsHandler = (star: number): any => {
    if (userRating.stars >= star) return <RatingStar.Filled />;
    return <RatingStar.NotFilled />;
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
                {data?.attributes?.map((att: Attribute) => (
                  <li key={att.id}>
                    {att.name}: {att.value_name}
                  </li>
                ))}
              </ul>
            </InfosContainer>
            <CartHandlers>
              <div className="price-and-quantity">
                <h2>{formatPrice(data?.price)}</h2>
                <div className="handle-quantity-container">
                  <button onClick={() => handleQuantity("-")}>-</button>
                  <span>{selectedQuantity}</span>
                  <button onClick={() => handleQuantity("+")}>+</button>
                </div>
              </div>
              <PrimaryButton handler={() => handleAddToCart()} title="Adicionar ao carrinho"/>
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
                <li onClick={() => handleRating(1)}>{starsHandler(1)}</li>
                <li onClick={() => handleRating(2)}>{starsHandler(2)}</li>
                <li onClick={() => handleRating(3)}>{starsHandler(3)}</li>
                <li onClick={() => handleRating(4)}>{starsHandler(4)}</li>
                <li onClick={() => handleRating(5)}>{starsHandler(5)}</li>
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
          <PrimaryButton handler={() => handleSubmitRating()} title="Avaliar" disabled={userRating.stars === 0 || userRating.email === ""}/>
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
