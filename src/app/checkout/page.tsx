"use client";
import CheckoutItemCard from "@/components/checkout-item-card";
import BackBtnIcon from "@/components/icons/back-btn";
import BoletoIcon from "@/components/icons/boleto-icon";
import IconElo from "@/components/icons/icon-elo";
import IconMasterCard from "@/components/icons/icon-mastercard";
import IconVisa from "@/components/icons/icon-visa";
import { StoreContext } from "@/context/StoreContext";
import { formatPrice } from "@/helpers/formatPrice";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 36px 48px;
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

const MainWrapper = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 40px;
`;

const SaleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 40%;
  gap: 48px;
  padding: 36px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
`;

const ItemsReview = styled.div`
  max-height: 500px;
  overflow-y: scroll;
  border-bottom: 1px solid var(--secondary-text);
`;

const CheckoutUserDetails = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 600px;
  gap: 24px;
  padding: 56px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);

  .finish-buy-btn {
    padding: 16px 36px;
    background-color: var(--primary-button);
    border: none;
    color: white;
    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

const CheckoutForm = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 10px;
  div {
    display: flex;
    gap: 10px;
    width: 100%;
    input,
    select {
      width: 50%;
      padding: 8px;
      border: 1px solid var(--secondary-text);
      font-family: inherit;
      font-size: 16px;
      ::placeholder {
        color: var(--infos-text);
      }
      color: var(--infos-text);
    }
  }
`;

const PaymentMethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const SelectPaymentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 8px;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;

    ul {
      display: flex;
      align-items: center;
      gap: 12px;
      list-style: none;
    }
  }
  .selected-payment {
    border-bottom: 4px solid var(--primary-button);
  }
`;

function Page() {
  const { cartItems, cartTotal, setCartItems } = useContext(StoreContext);

  const checkoutInfoMock = {
    name: "",
    cpf: "",
    email: "",
    phone: "",
    cep: "",
    address: "",
    complement: "",
    number: "",
    city: "",
    state: "PB",
    paymentMethod: "boleto",
  };

  const [checkoutInfo, setCheckoutInfo] = useState(checkoutInfoMock);

  const handleChangePaymentMethod = (paymentMethod: string) => {
    setCheckoutInfo({ ...checkoutInfo, paymentMethod });
  };

  const router = useRouter();

  const handleFinishBuy = () => {
    router.push("/");
    setCheckoutInfo(checkoutInfoMock);
    setCartItems([]);
  };

  const isDisabled = () => {
    const disabled = Object.values(checkoutInfo).some((value) => value === "");
    return disabled;
  };
  return (
    <Container>
      <BackButton>
        <BackBtnIcon />
        Voltar
      </BackButton>
      <MainWrapper>
        <SaleWrapper>
          <ItemsReview>
            {cartItems.map((item) => (
              <CheckoutItemCard key={item.id} item={item} />
            ))}
          </ItemsReview>
          <h2>Total: {formatPrice(cartTotal)}</h2>
        </SaleWrapper>
        <CheckoutUserDetails>
          <h2>Informações do Comprador</h2>
          <CheckoutForm>
            <div>
              <input
                type="text"
                placeholder="Nome"
                value={checkoutInfo.name}
                onChange={(e) =>
                  setCheckoutInfo({ ...checkoutInfo, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="CPF"
                value={checkoutInfo.cpf}
                onChange={(e) =>
                  setCheckoutInfo({ ...checkoutInfo, cpf: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                value={checkoutInfo.email}
                onChange={(e) =>
                  setCheckoutInfo({ ...checkoutInfo, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Telefone"
                value={checkoutInfo.phone}
                onChange={(e) =>
                  setCheckoutInfo({ ...checkoutInfo, phone: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="CEP"
                value={checkoutInfo.cep}
                onChange={(e) =>
                  setCheckoutInfo({ ...checkoutInfo, cep: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Endereço"
                value={checkoutInfo.address}
                onChange={(e) =>
                  setCheckoutInfo({ ...checkoutInfo, address: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Complemento"
                value={checkoutInfo.complement}
                onChange={(e) =>
                  setCheckoutInfo({
                    ...checkoutInfo,
                    complement: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Número"
                value={checkoutInfo.number}
                onChange={(e) =>
                  setCheckoutInfo({ ...checkoutInfo, number: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Cidade"
                value={checkoutInfo.city}
                onChange={(e) =>
                  setCheckoutInfo({ ...checkoutInfo, city: e.target.value })
                }
              />
              <select
                className="state-select"
                value={checkoutInfo.state}
                onChange={(e) =>
                  setCheckoutInfo({ ...checkoutInfo, state: e.target.value })
                }
              >
                <option value="PB">Paraíba</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="PR">Paraná</option>
                <option value="SC">Santa Catarina</option>
                <option value="GO">Goiás</option>
                <option value="DF">Distrito Federal</option>
                <option value="AM">Amazonas</option>
                <option value="TO">Tocantins</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="AC">Acre</option>
                <option value="AP">Amapá</option>
                <option value="RR">Roraima</option>
                <option value="PA">Pará</option>
                <option value="MA">Maranhão</option>
                <option value="PI">Piauí</option>
                <option value="CE">Ceará</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="PE">Pernambuco</option>
                <option value="SE">Sergipe</option>
                <option value="AL">Alagoas</option>
                <option value="BA">Bahia</option>
                <option value="ES">Espírito Santo</option>
              </select>
            </div>
          </CheckoutForm>
          <PaymentMethodContainer>
            <h2>Método de pagamento</h2>
            <SelectPaymentContainer>
              <div>
                <h4>Boleto</h4>
                <ul>
                  <li
                    className={
                      checkoutInfo.paymentMethod === "boleto"
                        ? "selected-payment"
                        : ""
                    }
                    onClick={() => handleChangePaymentMethod("boleto")}
                  >
                    <BoletoIcon />
                  </li>
                </ul>
              </div>
              <div>
                <h4>Cartão de Crédito</h4>
                <ul>
                  <li
                    className={
                      checkoutInfo.paymentMethod === "elo"
                        ? "selected-payment"
                        : ""
                    }
                    onClick={() => handleChangePaymentMethod("elo")}
                  >
                    <IconElo />
                  </li>
                  <li
                    className={
                      checkoutInfo.paymentMethod === "visa"
                        ? "selected-payment"
                        : ""
                    }
                    onClick={() => handleChangePaymentMethod("visa")}
                  >
                    <IconVisa />
                  </li>
                  <li
                    className={
                      checkoutInfo.paymentMethod === "mastercard"
                        ? "selected-payment"
                        : ""
                    }
                    onClick={() => handleChangePaymentMethod("mastercard")}
                  >
                    <IconMasterCard />
                  </li>
                </ul>
              </div>
            </SelectPaymentContainer>
          </PaymentMethodContainer>

          <button
            className="finish-buy-btn"
            onClick={() => handleFinishBuy()}
            disabled={isDisabled()}
          >
            Comprar
          </button>
        </CheckoutUserDetails>
      </MainWrapper>
    </Container>
  );
}

export default Page;
