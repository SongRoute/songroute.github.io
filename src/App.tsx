import { useEffect, useRef, useState } from 'react';
import Container from '@/layout/Container.tsx';
import Wrapper from '@/components/Wrapper.tsx';
import { Heading1 } from '@/components/Text.tsx';
import Main from '@/layout/Main/Main.tsx';
import Invitation from '@/layout/Invitation/Invitation.tsx';
// import Account from '@/layout/Account/Account.tsx';
import Guestbook from '@/layout/Guestbook/Guestbook.tsx';
import FloatingBar from '@/layout/FloatingBar/FloatingBar.tsx';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  const checkScrollPosition = () => {
    if (galleryRef.current) {
      const { offsetTop } = galleryRef.current;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= offsetTop) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <Main />
      </Wrapper>
      <Wrapper>
        <Heading1>모시는 글</Heading1>
        <Invitation />
      </Wrapper>
      <Wrapper ref={galleryRef}>
        <Heading1>Gallery</Heading1>
        <div style={{ padding: '20px', border: '1px dashed #ccc' }}>
          갤러리 영역 (추후 활성화)
        </div>
      </Wrapper>
      <Wrapper>
        <Heading1>마음 전하실 곳</Heading1>
        <div style={{ padding: '20px', border: '1px dashed #ccc' }}>
          <p>신랑측 계좌 정보</p>
          <p>송동선 (신랑) - 카카오뱅크 3333-02-1871160</p>
          <br/>
          <p>신부측 계좌 정보</p>
          <p>황네모 (신부) - 토스뱅크 1234-5678-9012</p>
        </div>
      </Wrapper>
      <Wrapper>
        <Heading1>오시는 길</Heading1>
        <div style={{ padding: '20px', border: '1px dashed #ccc' }}>
          지도 영역 (추후 활성화)
        </div>
      </Wrapper>
      <Wrapper>
        <Heading1>신랑 신부에게</Heading1>
        <Guestbook />
      </Wrapper>
      <FloatingBar isVisible={isVisible} />
    </Container>
  );
}

export default App;


