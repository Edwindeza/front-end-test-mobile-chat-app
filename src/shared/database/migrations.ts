import { db } from './db';

export async function runMigrations() {
  try {
    console.log('Running migrations...');
    
    // Since we clear the database before seeding, we can safely recreate the messages table
    // with the status column included
    await db.run(`DROP TABLE IF EXISTS messages;`);
    
    await db.run(`
      CREATE TABLE messages (
        id TEXT PRIMARY KEY NOT NULL,
        chat_id TEXT NOT NULL,
        sender_id TEXT NOT NULL,
        text TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        status TEXT DEFAULT 'sent' NOT NULL,
        FOREIGN KEY (chat_id) REFERENCES chats(id)
      );
    `);
    
    console.log('Migration completed successfully');
  } catch (error: any) {
    console.error('Migration error:', error);
    throw error;
  }
}
