/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext, useEffect } from "react"
import { StoreContext } from "./context"
import { KAKAO_SDK_JS_KEY, NAVER_MAP_CLIENT_ID } from "../../env"

const baseUrl = import.meta.env.BASE_URL

const NAVER_MAP_URL = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_MAP_CLIENT_ID}`
const KAKAO_SDK_URL = `${baseUrl}/kakao.min.js`

export const useNaver = () => {
  const { naver, setNaver } = useContext(StoreContext)
  useEffect(() => {
    if (!NAVER_MAP_CLIENT_ID) {
      return
    }

    // If already loaded, set immediately
    if ((window as any).naver?.maps) {
      setNaver((window as any).naver)
      return
    }

    const existing = document.querySelector(`script[src="${NAVER_MAP_URL}"]`) as HTMLScriptElement | null
    if (!existing) {
      const script = document.createElement("script")
      script.src = NAVER_MAP_URL
      script.defer = true
      script.addEventListener("load", () => {
        setNaver((window as any).naver)
      })
      script.addEventListener("error", () => {
        // no-op: allow UI to show fallback
      })
      document.head.appendChild(script)
    } else {
      existing.addEventListener("load", () => {
        setNaver((window as any).naver)
      })
    }
  }, [setNaver])

  return naver
}

export const useKakao = () => {
  const { kakao, setKakao } = useContext(StoreContext)
  useEffect(() => {
    if (!KAKAO_SDK_JS_KEY) {
      return
    }

    if (!document.querySelector(`script[src="${KAKAO_SDK_URL}"]`)) {
      const script = document.createElement("script")
      script.addEventListener("load", () => {
        if (!(window as any).Kakao.isInitialized()) {
          ;(window as any).Kakao.init(KAKAO_SDK_JS_KEY)
        }
        setKakao((window as any).Kakao)
      })
      script.src = KAKAO_SDK_URL
      document.head.appendChild(script)
    }
  }, [setKakao])

  return kakao
}
