import { PropsWithChildren, useCallback, useRef, useState } from "react"
import { type ModalInfo, ModalContext } from "./context"

type ModalInfoWithKey = ModalInfo & { key: number }

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalInfoList, setModalInfoList] = useState<ModalInfoWithKey[]>([])
  const nextKeyRef = useRef(0)

  const openModal = useCallback((modalInfo: ModalInfo) => {
    setModalInfoList((currentList) => {
      if (currentList.length === 0) {
        document.body.classList.add("modal-open")
      }
      return [...currentList, { ...modalInfo, key: nextKeyRef.current++ }]
    })
  }, [])

  const closeModal = useCallback(() => {
    setModalInfoList((currentList) => {
      if (currentList.length === 0) return currentList

      const nextList = currentList.slice(0, -1)
      if (nextList.length === 0) {
        document.body.classList.remove("modal-open")
      }
      return nextList
    })
  }, [])

  return (
    <ModalContext.Provider value={{ modalInfoList, openModal, closeModal }}>
      {children}
      <div className="modals-wrappeer">
        {modalInfoList.map((modalInfo, idx) => (
          <div
            key={modalInfo.key}
            className="modal-background"
            style={{ zIndex: 4 + idx }}
            onClick={() => {
              if (modalInfo.closeOnClickBackground) closeModal()
            }}
          >
            <div
              className={`modal${modalInfo.className ? ` ${modalInfo.className}` : ""}`}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <div className="header">
                <div className="close-button-wrapper">
                  <button className="close-button" onClick={closeModal} />
                </div>
                {modalInfo.header}
              </div>
              <div className="content">{modalInfo.content}</div>
              <div className="footer">{modalInfo.footer}</div>
            </div>
          </div>
        ))}
      </div>
    </ModalContext.Provider>
  )
}
