const express = require("express");

const app = express();

function gcd(a, b) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

app.get("/merintaj3_gmail_com", (req, res) => {

    const x = Number(req.query.x);
    const y = Number(req.query.y);

    if (
        !Number.isInteger(x) ||
        !Number.isInteger(y) ||
        x <= 0 ||
        y <= 0
    ) {
        return res.send("NaN");
    }

    res.send(String(lcm(x, y)));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});