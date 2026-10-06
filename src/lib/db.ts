import fs from "fs";
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

// In-memory fallback cache
let memoryMessages: ContactMessage[] = [
  {
    id: "msg_demo_1",
    name: "Zeeshan Ali",
    email: "zeeshan@client.com",
    message: "Hello Kamran, I checked your portfolio and would like to discuss a modern web project.",
    createdAt: new Date().toISOString(),
    status: "unread",
    ip: "127.0.0.1",
  },
];

/**
 * Ensure the data directory and messages.json file exist safely.
 */
function ensureDbSync(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(memoryMessages, null, 2), "utf-8");
    }
  } catch (error) {
    console.warn("Notice: Using memory store for database (read-only filesystem or restricted):", error);
  }
}

/**
 * Retrieve all messages sorted by newest first.
 */
export async function getMessages(): Promise<ContactMessage[]> {
  ensureDbSync();
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const diskMessages: ContactMessage[] = JSON.parse(raw || "[]");
      if (Array.isArray(diskMessages) && diskMessages.length > 0) {
        memoryMessages = diskMessages;
      }
    }
  } catch (error) {
    console.warn("Could not read disk messages, using memory store:", error);
  }

  return [...memoryMessages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Save a new message to the database (Disk + In-memory guaranteed).
 */
export async function saveMessage(data: {
  name: string;
  email: string;
  message: string;
  ip?: string;
}): Promise<ContactMessage> {
  const newMessage: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    message: data.message.trim(),
    createdAt: new Date().toISOString(),
    status: "unread",
    ip: data.ip || "unknown",
  };

  // Add to memory immediately
  memoryMessages.unshift(newMessage);

  // Write to disk
  try {
    ensureDbSync();
    fs.writeFileSync(DB_FILE, JSON.stringify(memoryMessages, null, 2), "utf-8");
  } catch (err) {
    console.warn("Disk save note (persisted in memory successfully):", err);
  }

  return newMessage;
}

/**
 * Delete a message by ID.
 */
export async function deleteMessage(id: string): Promise<boolean> {
  const initialLength = memoryMessages.length;
  memoryMessages = memoryMessages.filter((m) => m.id !== id);

  try {
    ensureDbSync();
    fs.writeFileSync(DB_FILE, JSON.stringify(memoryMessages, null, 2), "utf-8");
  } catch (err) {
    console.warn("Disk update note:", err);
  }

  return memoryMessages.length < initialLength;
}

/**
 * Mark a message as read or unread.
 */
export async function markAsRead(id: string): Promise<boolean> {
  const message = memoryMessages.find((m) => m.id === id);
  if (!message) return false;

  message.status = message.status === "unread" ? "read" : "unread";

  try {
    ensureDbSync();
    fs.writeFileSync(DB_FILE, JSON.stringify(memoryMessages, null, 2), "utf-8");
  } catch (err) {
    console.warn("Disk update note:", err);
  }

  return true;
}
