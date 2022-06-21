/* eslint-disable no-underscore-dangle */
import { model, Schema } from 'mongoose'

export interface IKomiRole {
  id: string
  label: string
  emoji: string
  role: string
}

const komiRoleSchema = new Schema<IKomiRole>({
  id: { type: String, required: true },
  label: { type: String, required: true },
  emoji: { type: String, required: true },
  role: { type: String, required: true },
})

const KomiRole = model<IKomiRole>('KomiRole', komiRoleSchema)
export default KomiRole
