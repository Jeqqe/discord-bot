import { model, Schema } from 'mongoose'
import KomiRoleTypes from '../../enums/KomiRoleTypes'

export interface IKomiRole {
  id: string
  type: KomiRoleTypes
  label: string
  emoji: string
  role: string
}

const komiRoleSchema = new Schema<IKomiRole>({
  id: { type: String, required: true },
  type: { type: String, required: true },
  label: { type: String, required: true },
  emoji: { type: String, required: true },
  role: { type: String, required: true },
})

const KomiRole = model<IKomiRole>('KomiRole', komiRoleSchema)
export default KomiRole
