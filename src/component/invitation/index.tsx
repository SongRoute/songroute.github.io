import { Fragment } from "react/jsx-runtime"
import {
  BRIDE_FULLNAME,
  BRIDE_INFO,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM_FULLNAME,
  GROOM_INFO,
  GROOM_FATHER,
  GROOM_MOTHER,
  GROOM_TITLE,
  BRIDE_TITLE,
} from "../../const"
import { useModal } from "../modal"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import PhoneIcon from "../../icons/phone-flip-icon.svg?react"
import EnvelopeIcon from "../../icons/envelope-icon.svg?react"

export const Invitation = () => {
  const { openModal, closeModal } = useModal()
  return (
    <LazyDiv className="card invitation">
      <h2 className="english">Invitation</h2>

      <div className="break" />

      <div className="content">어느 때나 하나님을 본 사람이 없으되</div>
      <div className="content">만일 우리가 서로 사랑하면</div>
      <div className="content">하나님이 우리 안에 거하시고</div>
      <div className="content">그의 사랑이 우리 안에 온전히 이루느니라</div>
      <div className="content">(요한일서 4장 12절)</div>

      <div className="break" />
      <div className="content">서로 사랑하며 섬기는 마음으로</div>
      <div className="content">하나님의 은혜 안에서 가정을 이루려 합니다.</div>
      <div className="content">새로운 시작을 따뜻한 마음으로 축복해 주시면</div>
      <div className="content">큰 기쁨이 되겠습니다.</div>
      <div className="break" />

      <div className="name">
        {GROOM_FATHER} · {GROOM_MOTHER}
        <span className="relation">
          의 <span className="relation-name">{GROOM_TITLE}</span>
        </span>{" "}
        {GROOM_FULLNAME}
      </div>
      <div className="name">
        {BRIDE_FATHER} · {BRIDE_MOTHER}
        <span className="relation">
          의 <span className="relation-name">{BRIDE_TITLE}</span>
        </span>{" "}
        {BRIDE_FULLNAME}
      </div>

      <div className="break" />

      
    </LazyDiv>
  )
}
