const express = require("express");
const app = express();

function gcd(a, b) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

function lcm(a, b) {
    // Use (a / gcd(a,b)) * b to prevent potential overflow
    return (a / gcd(a, b)) * b;
}

// Middleware to disable 'x-powered-by' header for cleaner response
app.disable('x-powered-by');

app.get("/app/merintaj3_gmail_com", (req, res) => {
    // Ensure Content-Type is explicitly set to plain text
    res.setHeader('Content-Type', 'text/plain');
    
    const xRaw = req.query.x;
    const yRaw = req.query.y;

    // Check if parameters are missing
    if (xRaw === undefined || yRaw === undefined) {
        return res.send("NaN");
    }

    // Convert to number and validate as natural numbers
    const x = Number(xRaw);
    const y = Number(yRaw);

    // isInteger check ensures whole number; x > 0 && y > 0 for natural number check
    if (!Number.isInteger(x) || !Number.isInteger(y) || x <= 0 || y <= 0) {
        return res.send("NaN");
    }

    // Calculate LCM and send as string
    const result = lcm(x, y);
    res.send(result.toString());
});

// Export the app for testing
module.exports = app;

// Start server only when run directly
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`LCM Service running on port ${PORT}`);
    });
}