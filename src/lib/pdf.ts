import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportToPdf(elementId: string, fileName: string = "resume.pdf") {
    console.log("exportToPdf called with elementId:", elementId);
    const element = document.getElementById(elementId);
    console.log("Found element:", element);

    if (!element) {
        const errorMsg = `Element with ID "${elementId}" not found`;
        console.error(errorMsg);
        alert(errorMsg);
        return;
    }

    try {
        console.log("Creating clone for PDF export...");
        // Clone the element to avoid modifying the original
        const clone = element.cloneNode(true) as HTMLElement;
        clone.style.position = "absolute";
        clone.style.left = "-9999px";
        clone.style.top = "0";
        // Enforce A4 dimensions
        clone.style.width = "210mm";
        clone.style.minHeight = "297mm";
        clone.style.height = "auto"; // Allow it to grow
        clone.style.overflow = "visible"; // Ensure nothing is hidden
        // Reset any max-width that might interfere
        clone.style.maxWidth = "none";
        clone.style.margin = "0";
        document.body.appendChild(clone);

        // Helper to convert any color string to hex/rgb using a temporary canvas
        const getComputedColor = (color: string): string => {
            if (!color || color === 'transparent') return color;
            // If it's already a simple format, return it (optimization)
            if (color.startsWith('#') || color.startsWith('rgb')) return color;

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = 1;
            tempCanvas.height = 1;
            const ctx = tempCanvas.getContext('2d');
            if (!ctx) return color;

            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            const data = ctx.getImageData(0, 0, 1, 1).data;
            return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
        };

        // Convert all modern color formats (like lab, lch) to rgb/rgba
        const convertColors = (el: HTMLElement) => {
            const computed = window.getComputedStyle(el);

            // Properties to check for color values
            const colorProperties = [
                'color',
                'backgroundColor',
                'borderColor',
                'borderTopColor',
                'borderRightColor',
                'borderBottomColor',
                'borderLeftColor',
                'outlineColor',
                'textDecorationColor'
            ] as const;

            colorProperties.forEach(prop => {
                const value = computed[prop as any];
                if (value && (value.includes('lab(') || value.includes('lch(') || value.includes('oklab(') || value.includes('oklch('))) {
                    // @ts-ignore
                    el.style[prop] = getComputedColor(value);
                }
            });

            // Recursively process children
            Array.from(el.children).forEach(child => {
                if (child instanceof HTMLElement) {
                    convertColors(child);
                }
            });
        };

        convertColors(clone);

        // Remove page break markers from the clone
        const pageBreaks = clone.querySelectorAll(".resume-page-break");
        pageBreaks.forEach(el => el.remove());

        // Remove any other print:hidden elements (like visual gaps)
        const hiddenElements = clone.querySelectorAll(".print\\:hidden");
        hiddenElements.forEach(el => el.remove());

        // Give the browser a moment to render the clone's layout
        await new Promise(resolve => setTimeout(resolve, 100));

        console.log("Starting html2canvas...", {
            scrollHeight: clone.scrollHeight,
            offsetHeight: clone.offsetHeight,
            clientHeight: clone.clientHeight
        });

        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: false,
            logging: true, // Enable logging to see if there are issues
            allowTaint: true,
            backgroundColor: "#ffffff",
            height: clone.scrollHeight,
            windowHeight: clone.scrollHeight,
            width: clone.scrollWidth,
            windowWidth: clone.scrollWidth
        });

        // Remove the clone
        document.body.removeChild(clone);

        console.log("Canvas created, converting to image...");
        // Use JPEG with 0.75 quality for better compression (significantly smaller file size)
        const imgData = canvas.toDataURL("image/jpeg", 0.75);
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        console.log("Adding image to PDF...", { imgWidth, imgHeight, pageHeight });

        // Add first page
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add subsequent pages if content overflows
        while (heightLeft > 0) {
            position -= pageHeight; // Shift image up by one page height
            pdf.addPage();
            pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        console.log("Saving PDF with name:", fileName);
        pdf.save(fileName);

        console.log("PDF saved successfully!");
        alert(`PDF downloaded as "${fileName}"`);
    } catch (error) {
        console.error("Error exporting PDF:", error);
        alert(`Failed to export PDF: ${error instanceof Error ? error.message : String(error)}`);
    }
}
