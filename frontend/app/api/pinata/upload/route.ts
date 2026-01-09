import { NextRequest, NextResponse } from 'next/server';

const PINATA_JWT = process.env.PINATA_JWT;
const PINATA_GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'https://gateway.pinata.cloud';

export async function POST(request: NextRequest) {
  if (!PINATA_JWT) {
    return NextResponse.json({ error: 'Pinata not configured' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const metadata = formData.get('metadata') as string | null;

    // If uploading a file (image)
    if (file) {
      const pinataFormData = new FormData();
      pinataFormData.append('file', file);

      const pinataMetadata = JSON.stringify({
        name: file.name,
        keyvalues: { type: 'solver-image' },
      });
      pinataFormData.append('pinataMetadata', pinataMetadata);

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
        },
        body: pinataFormData,
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('[Pinata] File upload error:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
      }

      const result = await response.json();
      return NextResponse.json({
        success: true,
        ipfsHash: result.IpfsHash,
        url: `${PINATA_GATEWAY}/ipfs/${result.IpfsHash}`,
      });
    }

    // If uploading JSON metadata
    if (metadata) {
      const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pinataContent: JSON.parse(metadata),
          pinataMetadata: {
            name: 'solver-metadata.json',
            keyvalues: { type: 'solver-metadata' },
          },
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('[Pinata] JSON upload error:', error);
        return NextResponse.json({ error: 'Failed to upload metadata' }, { status: 500 });
      }

      const result = await response.json();
      return NextResponse.json({
        success: true,
        ipfsHash: result.IpfsHash,
        url: `${PINATA_GATEWAY}/ipfs/${result.IpfsHash}`,
      });
    }

    return NextResponse.json({ error: 'No file or metadata provided' }, { status: 400 });
  } catch (error) {
    console.error('[Pinata] Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
