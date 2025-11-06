"use client";

import { useEffect } from "react";

export default function FileDownloadPage() {
    useEffect(() => {
        // Create a temporary anchor element to trigger download
        const link = document.createElement("a");
        link.href = "/file.pdf";
        link.download = "file.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    return null; // Blank page
}

