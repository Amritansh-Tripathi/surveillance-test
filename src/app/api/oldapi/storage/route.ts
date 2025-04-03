// storage/route.ts
import os from 'os';
import { exec } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get('location');

  let command: string;

  switch (os.platform()) {
    case 'win32':
      command = location
        ? `wmic logicaldisk where "caption='${location}'" get size,freespace,caption`
        : 'wmic logicaldisk get size,freespace,caption';
      break;
    case 'darwin':
    case 'linux':
      command = location
        ? `df -h | grep '^${location}'`
        : 'df -h';
      break;
    default:
      return NextResponse.json({ error: 'Unsupported platform' }, { status: 500 });
  }

  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        resolve(NextResponse.json({ error: 'Failed to retrieve storage information' }, { status: 500 }));
        return;
      }
      resolve(NextResponse.json({ storage: stdout }));
    });
  });
}
