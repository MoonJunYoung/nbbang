import styled from "styled-components";

const BillingResultContainer = styled.div`
  z-index: 1;
  position: absolute;
`;

const WrapperModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  max-height: 80%;
  height: auto;
  width: 90%;
  background: white;
  border-radius: 8px;
  transition: all 400ms ease-in-out 2s;
  animation: fadeIn 400ms;
  overflow-y: auto;
  overflow-x: hidden;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ModalClose = styled.span`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 5px;
`;

const ModalCloseBottmBar = styled.span`
  padding: 10px;
  width: 100%;
  font-size: 14px;
  font-weight: 700;
  background-color: #ffeb3c;
  cursor: pointer;
`;

const Img = styled.img`
  margin-left: 12px;
  width: 80%;
`;

const LinkExplain = styled.p`
  color: teal;
  font-weight: 700;
`;

const Explain = styled.p`
  margin-left: 12px;
  color: darkblue;
  width: 270px;
  margin: 20px 0px 0px 0px;
  font-size: 14px;
`;

const Explainfirst = styled(Explain)`
  margin-left: 12px;
  width: 250px;
`;

const Icon = styled.p`
  font-size: 25px;
  margin: 10px 0px 0px 0px;
`;

const KakaoIdExplain = ({ setModalOpen }) => {
  return (
    <BillingResultContainer>
      <WrapperModal>
        <Modal>
          <ModalClose onClick={() => setModalOpen(false)}>X</ModalClose>
          <LinkExplain>
            카카오 링크란? <br></br>
            <br></br> 카카오링크를 등록하면 카카오톡으로<br></br> 더 쉽게 송금을
            받을 수 있어요!😎 <br></br>
            <br></br>아래에서 카카오 링크<br></br> 발급 받는 법을 함께
            알아볼까요?<br></br>
            <Icon>🏃🏻‍♂️</Icon>
          </LinkExplain>
          <Explainfirst>
            1. 카카오톡 더보기 상단의 QR코드 아이콘을 눌러주세요
          </Explainfirst>
          <Img alt="explain3" src="/images/explain3.jpeg" />
          <Explain>2. QR코드 아래 송금코드를 눌러주세요</Explain>
          <Img alt="explain2" src="/images/explain2.jpeg" />
          <Explain>3. 송금코드를 눌러서 송금코드를 복사 해주세요</Explain>
          <Img alt="explain" src="/images/explain.jpeg" />
          <Explain>
            4. 이제 카카오톡 송금링크를 등록하러 가볼까요?<Icon>👇🏻</Icon>
          </Explain>
          <ModalCloseBottmBar onClick={() => setModalOpen(false)}>
            링크 입력하러가기
          </ModalCloseBottmBar>
        </Modal>
      </WrapperModal>
    </BillingResultContainer>
  );
};
export default KakaoIdExplain;
