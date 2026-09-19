async function loadArtworkMetadata() {
    const response = await fetch("metadata.tsv");
    if (!response.ok) {
        throw new Error(`Unable to load metadata.tsv: ${response.status}`);
    }

    const lines = (await response.text()).trim().split(/\r?\n/);
    const headers = lines.shift().split("\t");

    return new Map(lines.map(line => {
        const values = line.split("\t");
        const record = Object.fromEntries(headers.map((header, index) => [header, values[index] || "Unknown"]));
        return [record.path, record];
    }));
}

function metadataForImage(metadata, imagePath) {
    const fileName = imagePath.split("/").pop();
    return metadata.get(imagePath) || {
        name: fileName,
        dimensions: "Unknown",
        technique: "Unknown",
        date: "Unknown",
        path: imagePath
    };
}
