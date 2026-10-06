import fs from "fs/promises";
import path from "path";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: "unread" | "read";
  ip?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "messages.json");

/**
 * Ensure the data directory and messages.json file exist.
 */
async function ensureDb(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DB_FILE);
    } catch {
      // File does not exist, initialize empty array
      await fs.writeFile(DB_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Failed to initialize database file:", error);
  }
}

/**
 * Retrieve all messages sorted by newest first.
 */
export async function getMessages(): Promise<ContactMessage[]> {
  await ensureDb();
  try {
    const rawData = await fs.readFile(DB_FILE, "utf-8");
    const messages: ContactMessage[] = JSON.parse(rawData || "[]");
    return messages.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Error reading messages from database:", error);
    return [];
  }
}

/**
 * Save a new message to the database.
 */
export async function saveMessage(data: {
  name: string;
  email: string;
  message: string;
  ip?: string;
}): Promise<ContactMessage> {
  await ensureDb();

  const messages = await getMessages();

  const newMessage: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    message: data.message.trim(),
    createdAt: new Date().toISOString(),
    status: "unread",
    ip: data.ip || "unknown",
  };

  messages.unshift(newMessage);

  // Write directly to file (compatible with Windows NTFS file locking)
  await fs.writeFile(DB_FILE, JSON.stringify(messages, null, 2), "utf-8");

  return newMessage;
}

/**
 * Delete a message by ID.
 */
export async function deleteMessage(id: string): Promise<boolean> {
  await ensureDb();
  const messages = await getMessages();
  const filtered = messages.filter((m) => m.id !== id);

  if (filtered.length === messages.length) {
    return false;
  }

  await fs.writeFile(DB_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

/**
 * Mark a message as read.
 */
export async function markAsRead(id: string): Promise<boolean> {
  await ensureDb();
  const messages = await getMessages();
  const message = messages.find((m) => m.id === id);

  if (!message) return false;

  message.status = message.status === "unread" ? "read" : "unread";
  await fs.writeFile(DB_FILE, JSON.stringify(messages, null, 2), "utf-8");

  return true;
}
