import { connect } from '@/app/dbConfig/dbConfig';
import Configuration from '@/models/oldmodels/configurationModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { Sidenav, VideoContainer, LiveLogs, LiveCaptions } = reqBody;

        // Fetch the existing configuration document
        const existingConfig = await Configuration.findOne();

        if (existingConfig) {
            // Update the existing configuration
            existingConfig.Sidenav = Sidenav;
            existingConfig.VideoContainer = VideoContainer;
            existingConfig.LiveLogs = LiveLogs;
            existingConfig.LiveCaptions = LiveCaptions;
            
            const updatedConfig = await existingConfig.save();

            return NextResponse.json({
                message: "Configuration updated successfully",
                success: true,
                updatedConfig
            });
        } else {
            // Create a new configuration document if none exists
            const newConfig = new Configuration({
                Sidenav,
                VideoContainer,
                LiveLogs,
                LiveCaptions,
            });

            const savedConfig = await newConfig.save();

            return NextResponse.json({
                message: "Configuration created successfully",
                success: true,
                savedConfig
            });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
