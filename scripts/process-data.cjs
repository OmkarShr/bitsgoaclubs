const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvPath = path.join(__dirname, 'ClubDetails.csv');
const imagesDir = path.join(__dirname, '../public/club-images');
const outputPath = path.join(__dirname, '../src/data/clubs.json');

const seenIds = new Set();

const csvContent = fs.readFileSync(csvPath, 'utf8');

Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
        const clubs = results.data.map((row, index) => {
            // Helper to get value with potential leading space in key
            const getVal = (key) => row[key] || row[' ' + key] || row[key + ' '];

            const name = getVal('Student Body Full Name')?.trim();
            if (!name) return null;

            // Generate a safe ID/Slug
            let id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

            if (seenIds.has(id)) {
                let counter = 1;
                let newId = `${id}-${counter}`;
                while (seenIds.has(newId)) {
                    counter++;
                    newId = `${id}-${counter}`;
                }
                id = newId;
            }
            seenIds.add(id);

            // Let's look at the file list to find matches.
            const files = fs.readdirSync(imagesDir);

            // Helper to find image
            const findImage = (suffix) => {
                const candidates = files.filter(f => f.includes(suffix));

                // Strategy: Normalize the club name and the filenames and try to match.
                // Observed: Spaces -> Underscores. Commas -> Underscores.
                // "The Wall Street Club , BITS Goa" -> "The_Wall_Street_Club___BITS_Goa"

                const sanitizedName = name
                    .replace(/ /g, '_')
                    .replace(/,/g, '_')
                    .replace(/'/g, '_')
                    .replace(/"/g, '_');

                // Try exact match with sanitized name
                let match = candidates.find(f => f.startsWith(sanitizedName + '_' + suffix));

                if (match) return '/club-images/' + match;

                // What about "Department of Finance & Asset Management"?
                // File: "Department_of_Finance___Asset_Management_Image1.jpeg"
                // & -> _

                const sanitizedName2 = name
                    .replace(/ /g, '_')
                    .replace(/,/g, '_')
                    .replace(/&/g, '_')
                    .replace(/'/g, '_')
                    .replace(/"/g, '_');

                match = candidates.find(f => f.startsWith(sanitizedName2 + '_' + suffix));
                if (match) return '/club-images/' + match;

                // Fallback: Try to find a file that starts with the first few words?
                // Or try to strip special chars?
                const strippedName = name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_');
                const matchStripped = candidates.find(f => f.startsWith(strippedName + '_' + suffix));
                if (matchStripped) return '/club-images/' + matchStripped;

                return null;
            };

            // Auto-categorization Helper
            const getCategory = (name, desc, dept) => {
                const text = (name + ' ' + desc + ' ' + dept).toLowerCase();
                if (text.includes('sport') || text.includes('cricket') || text.includes('football') || text.includes('basketball') || text.includes('ultimate') || text.includes('kabaddi')) return 'Sports';
                if (text.includes('robot') || text.includes('code') || text.includes('program') || text.includes('tech') || text.includes('engineer') || text.includes('finance') || text.includes('invest') || text.includes('consult')) return 'Technical';
                if (text.includes('dance') || text.includes('music') || text.includes('art') || text.includes('drama') || text.includes('theatre') || text.includes('photo') || text.includes('film') || text.includes('fashion') || text.includes('culture') || text.includes('literary')) return 'Cultural';
                return 'Others';
            };

            const category = getCategory(name, getVal('Write-Up') || '', getVal('Department') || '');

            return {
                id,
                name,
                category,
                abbreviation: getVal('Abbreviation/Short Form'),
                description: getVal('Write-Up'),
                instagram: getVal('Instagram Handle - '),
                linkedin: getVal('LinkedIn Handle - '),
                github: getVal('GitHub / Facebook Handle - '),
                image1: findImage('Image1'),
                image2: findImage('Image2'),
                // whatsapp: getVal('Link to the WhatsApp group...') // Removed as requested
            };
        }).filter(Boolean); // Filter out nulls

        fs.writeFileSync(outputPath, JSON.stringify(clubs, null, 2));
        console.log(`Processed ${clubs.length} clubs.`);
    }
});
