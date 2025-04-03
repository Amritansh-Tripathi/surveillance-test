// storage/create-directory.ts
import os from 'os';
import { exec } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { location, directory } = await req.json();

  if (!location || !directory) {
    return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 });
  }

  let command: string;

  switch (os.platform()) {
    case 'win32':
      command = `mkdir "${location}\\${directory}"`;
      break;
    case 'darwin':
    case 'linux':
      command = `mkdir -p "${location}/${directory}"`;
      break;
    default:
      return NextResponse.json({ success: false, error: 'Unsupported platform' }, { status: 500 });
  }

  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        resolve(NextResponse.json({ success: false, error: 'Failed to create directory' }, { status: 500 }));
        return;
      }
      resolve(NextResponse.json({ success: true }));
    });
  });
}
