import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2025-12-27 13:00", "Asia/Seoul")
export const HOLIDAYS = [15]

export const LOCATION = "수원시 팔달구 수산교회"
export const LOCATION_ADDRESS = "수원시 팔달구 인계로 39번길 11"

export const SHARE_ADDRESS = LOCATION
export const SHARE_ADDRESS_TITLE = LOCATION 

export const WEDDING_HALL_POSITION = [127.032063, 37.287463]

export const NMAP_PLACE_ID = 13321741

export const BRIDE_FULLNAME = "김주선"
export const BRIDE_FIRSTNAME = "주선"
export const BRIDE_TITLE = "장녀"
export const BRIDE_FATHER = "김시형"
export const BRIDE_MOTHER = "김영미"
export const BRIDE_INFO = [
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-0000-0000",
    account: "우리은행 268-009655-02-001",
  },
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-3517-8627",
    account: "카카오뱅크 3333-07-6220722",
  }
]

export const GROOM_FULLNAME = "송동선"
export const GROOM_FIRSTNAME = "동선"
export const GROOM_TITLE = "장남"
export const GROOM_FATHER = "송지영"
export const GROOM_MOTHER = "양은혜"
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-3946-6503",
    account: "카카오뱅크 3333-02-1871160",
  }
]
