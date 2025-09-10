import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { ChatType } from '../enums/chat_type_enum.js'
import Profile from './profile.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Message from './message.js'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare type: ChatType

  @column()
  declare name: string | null

  @hasMany(() => Message, { foreignKey: 'chatId' })
  declare messages: HasMany<typeof Message>

  @manyToMany(() => Profile, { pivotTable: 'chat_profiles' })
  declare members: ManyToMany<typeof Profile>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
