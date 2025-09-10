import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('chat_id').unsigned().references('id').inTable('chats').onDelete('CASCADE')
      table.integer('sender_id').unsigned().references('id').inTable('profiles').onDelete('CASCADE')
      table.string('content', 1000).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
