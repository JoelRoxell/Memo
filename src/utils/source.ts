import { env } from 'utils/env'
import placeholder from 'assets/podcast-placeholder.png'

export default function source(img: string | null) {
  if (!img) {
    return placeholder
  }

  return env({
    dev: `https://localhost:8001/image/${img}`,
    stage: `https://{image-endpoint}/image/${img}`,
    prod: `https://{image-endpoint}/image/${img}`
  })
}
