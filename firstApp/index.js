const express = require("express");
const app = express();
console.dir(app);
// request ga kurutabi callback
app.use((req, res) => {
    console.log("request wo uketukemasita");
    console.dir(req);
    // res.send("response simasu");
    res.send("<h1>h1 desu.</h1>");
});

app.listen(3000, () => {
    console.log("request wo port 3000 de matiukechu");
});