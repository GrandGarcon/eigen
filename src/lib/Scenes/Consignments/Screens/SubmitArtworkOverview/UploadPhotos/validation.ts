import * as Yup from "yup"

export interface PhotosFormModel {
  photos: Photo[]
}

export interface Photo {
  id?: string
  geminiToken?: string
  height?: number
  isDefault?: boolean
  imageURL?: string
  internalID?: string
  path?: string
  width?: number
  imageVersions?: string[]
  loading?: boolean
  error?: boolean
  errorMessage?: string
  size?: number
  sizeDisplayValue?: string
}

export const photosEmptyInitialValues: PhotosFormModel = {
  photos: [],
}

export const photosValidationSchema = Yup.object().shape({
  photos: Yup.array()
    .min(1)
    .of(
      Yup.object().shape({
        id: Yup.string().required(),
        geminiToken: Yup.string().required(),
        path: Yup.string().required(),
      })
    ),
})
