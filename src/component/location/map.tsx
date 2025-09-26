import { useState, useRef } from "react"
import nmapIcon from "../../icons/nmap-icon.png"
import LockIcon from "../../icons/lock-icon.svg?react"
import UnlockIcon from "../../icons/unlock-icon.svg?react"
import {
  LOCATION,
  NMAP_PLACE_ID,
  WEDDING_HALL_POSITION,
} from "../../const"
import { NAVER_MAP_CLIENT_ID } from "../../env"

export const Map = () => {
  const [locked, setLocked] = useState(true)
  const [showLockMessage, setShowLockMessage] = useState(false)
  const lockMessageTimeout = useRef(0)

  // Static map URL using Naver Static Map API (fetched at build time into public/static-map.png)
  const [lng, lat] = WEDDING_HALL_POSITION
  const staticMapUrl = `/static-map.png`

  const checkDevice = () => {
    const userAgent = window.navigator.userAgent
    if (userAgent.match(/(iPhone|iPod|iPad)/)) {
      return "ios"
    } else if (userAgent.match(/(Android)/)) {
      return "android"
    } else {
      return "other"
    }
  }

  return (
    <>
      <div className="map-wrapper">
        {locked && (
          <div
            className="lock"
            onTouchStart={() => {
              setShowLockMessage(true)
              window.clearTimeout(lockMessageTimeout.current)
              lockMessageTimeout.current = window.setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
            onMouseDown={() => {
              setShowLockMessage(true)
              window.clearTimeout(lockMessageTimeout.current)
              lockMessageTimeout.current = window.setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
          >
            {showLockMessage && (
              <div className="lock-message">
                <LockIcon /> 자물쇠 버튼을 눌러
                <br />
                터치 잠금 해제 후 확대 및 이동해 주세요.
              </div>
            )}
          </div>
        )}
        <button
          className={"lock-button" + (locked ? "" : " unlocked")}
          onClick={() => {
            window.clearTimeout(lockMessageTimeout.current)
            setShowLockMessage(false)
            setLocked((locked) => !locked)
          }}
        >
          {locked ? <LockIcon /> : <UnlockIcon />}
        </button>
        {!locked && (
          <a 
            href={`https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              className="map-inner" 
              src={staticMapUrl} 
              alt="시산교회 위치 지도" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/preview_image.png";
              }}
            />
          </a>
        )}
      </div>
      <div className="navigation">
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                window.open(`nmap://place?id=${NMAP_PLACE_ID}`, "_self")
                break
              default:
                window.open(
                  `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`,
                  "_blank",
                )
                break
            }
          }}
        >
          <img src={nmapIcon} alt="naver-map-icon" />
          네이버 지도
        </button>
      </div>
    </>
  )
}
