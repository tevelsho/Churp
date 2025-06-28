// src/app/api/report_cards/route.ts

import { NextResponse } from 'next/server';
// Make sure to import the new type and data
import { gardenData, GardenItem } from '@/lib/data'; 
import crypto from 'crypto'; // Using Node's crypto module for a unique ID

// The GET method is fine as it is. It will now return GardenItem[].
export async function GET(request: Request) {
  
  return NextResponse.json(gardenData);
   
}

// ====================================================================
// ===================  UPDATED POST HANDLER  =========================
// ====================================================================
export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // --- Extract and Map Data ---
        // We are mapping the form fields to the GardenItem structure.
        const name = formData.get('lastName') as string;          // "Post/Report Title"
        const location = formData.get('university') as string;      // "Affected Garden"
        const position = formData.get('graduationYear') as string;  // "Priority Level"
        
        // --- Handle Files ---
        const photos = formData.getAll('photos') as File[];
        console.log(photos)
       
        // For the main 'image', we'll take the name of the first file uploaded.
        // In a real app, you'd upload this file and store the URL.
        const image = photos.length > 0 ? photos[0].name : '/images/placeholder.png'; // Provide a default if no image is uploaded
        // For 'pqCount', we'll count how many photos were submitted.
        const pqCount = photos.length;

        // --- Validation ---
        if (!name || !location || !position) {
            return NextResponse.json({ message: 'Missing required fields: name, location, or position' }, { status: 400 });
        }
        
        // --- Create the new GardenItem object ---
        const newGardenItem: GardenItem = {
            id: crypto.randomUUID(), // Generate a unique string ID
            name: name,
            image: image,
            position: position,
            location: location,
            pqCount: pqCount,
        };

        // Add the new item to our in-memory data
     
        gardenData.push(newGardenItem);

        // Return a success response with the newly created item
        return NextResponse.json({ message: "Garden item added successfully!", data: newGardenItem }, { status: 201 });

    } catch (error) {
        console.error("Failed to process garden item:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}