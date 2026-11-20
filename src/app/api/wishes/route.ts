import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface WishItem {
  id: string;
  name: string;
  message: string;
  status: 'hadir' | 'tidak_hadir';
  pax?: number;
  created_at: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'wishes.json');

// Ensure data folder and file exists
function readWishesFromFile(): WishItem[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading wishes file:', error);
    return [];
  }
}

function writeWishesToFile(wishes: WishItem[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(wishes, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing wishes file:', error);
  }
}

export async function GET() {
  const wishes = readWishesFromFile();
  return NextResponse.json({ wishes });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message, status, pax } = body;

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    const newWish: WishItem = {
      id: `wish-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: String(name).trim(),
      message: String(message).trim(),
      status: status === 'tidak_hadir' ? 'tidak_hadir' : 'hadir',
      pax: status === 'hadir' ? Number(pax || 1) : 0,
      created_at: new Date().toISOString(),
    };

    const currentWishes = readWishesFromFile();
    const updated = [newWish, ...currentWishes];
    writeWishesToFile(updated);

    return NextResponse.json({ success: true, wish: newWish });
  } catch (error) {
    console.error('API /api/wishes error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
