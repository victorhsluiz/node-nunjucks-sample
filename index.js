const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

const ageValidation = (req, res, next) => {
	const age = req.query.age;
	const regexp = new RegExp("^[0-9]*$");
	const numbersOnly = regexp.test(age);
	if (!age || !numbersOnly) {
		return res.redirect("/");
	}

	return next();
};

nunjucks.configure("views", {
	autoescape: true,
	express: app,
	watch: true
});

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");

app.get("/", (req, res) => {
	return res.render("age");
});

app.get("/major", ageValidation, (req, res) => {
	return res.render("major", { age: req.query.age });
});

app.get("/minor", ageValidation, (req, res) => {
	return res.render("minor", { age: req.query.age });
});

app.post("/check", (req, res) => {
	const age = req.body.age;
	return age >= 18
		? res.redirect(`/major?age=${age}`)
		: res.redirect(`/major?age=${age}`);
});

app.listen(3000);
