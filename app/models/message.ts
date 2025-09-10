import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Chat from './chat.js'
import Profile from './profile.js'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  @column()
  declare chatId: number

  @column()
  declare senderId: number

  @belongsTo(() => Profile, { foreignKey: 'senderId' })
  declare sender: BelongsTo<typeof Profile>

  @belongsTo(() => Chat, { foreignKey: 'chatId' })
  declare chat: BelongsTo<typeof Chat>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
