import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Chat from './chat.js'
import Message from './message.js'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare displayName: string

  @column()
  declare handle: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Chat, { pivotTable: 'chat_profiles' })
  declare chats: ManyToMany<typeof Chat>

  @hasMany(() => Message, { foreignKey: 'senderId' })
  declare messages: HasMany<typeof Message>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
