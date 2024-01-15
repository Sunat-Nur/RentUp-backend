const Product = require("../models/Product");
const Member = require("../models/Member");
const member = require("../schema/member.model")
const Company = require("../models/Company")
const Definer = require("../lib/error");
const assert = require("assert");
const companyController = module.exports;

companyController.getCompanies = async (req, res) => {
    try {
        console.log("GET: cont/getCompanies");
        const data = req.query;
        company = new Company();

        result = await company.getCompaniesData(req.member, data);
        res.json({state: "success", data: result});
    } catch (err) {
        console.log(`ERROR, cont/getCompanies, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};

companyController.getChosenCompany = async (req, res) => {
    try {
        console.log("GET: cont/getChosenCompany");
        const id = req.params.id;
        company = new Company();

        result = await company.getCompaniesData(req.member, id);
        res.json({state: "success", data: result});
    } catch (err) {
        console.log(`ERROR, cont/getChosenCompany, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
}

/**********************************
 *    Company related methods   *
 **********************************/


companyController.home = (req, res) => {
    try {
        console.log("GET: cont/home");
        res.render('home-page');
    } catch (err) {
        console.log(`ERROR: cont/home, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};

companyController.getMyCompaniesProducts = async (req, res) => {
    try {
        console.log("GET: cont/getMyCompaniesProducts");
        const product = new Product();
        const data = await product.getAllProductsDataResto(res.locals.member);
        res.render("company-menu", {company_data: data});
    } catch (err) {
        console.log(`ERROR: cont/getMyCompaniesProducts, ${err.message}`);
        res.redirect("/resto");
    }
}

companyController.getSignupMyCompany = async (req, res) => {
    try {
        console.log("GET: cont/getSignupMyCompany");
        res.render("signup");
    } catch (err) {
        console.log(`ERROR: cont/getSignupMyCompany, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};


companyController.signupProcess = async (req, res) => {
    try {
        console.log("POST: cont/signupProcess");
        assert(req.file, Definer.general_err3);
        let new_member = req.body;
        new_member.mb_type = "COMPANY";
        new_member.mb_image = req.file.path;

        const member = new Member();
        const result = await member.signupData(new_member);
        assert(req.file, Definer.general_err1);
        req.session.member = result;
        req.session.save(function () {
            res.redirect('/resto/products/menu');
        })
    } catch (err) {
        console.log(`ERROR, cont/signupProcess, ${err.message}`);
        res.json({state: 'fail', message: err.message});
    }
};


companyController.getLoginMyCompany = async (req, res) => {
    try {
        console.log("GET: cont/getLoginMyCompany");
        res.render('login-page')
    } catch (err) {
        console.log(`ERROR, cont/getLoginMyCompany, ${err.message}`)
        res.json({state: "fail", message: err.message});
    }
};

companyController.loginProcess = async (req, res) => {
    try {
        console.log("POST: cont/loginProcess");
        const data = req.body,
            member = new Member();
        result = await member.loginData(data);

        req.session.member = result;
        req.session.save(function () {
            result.mb_type === "ADMIN"
                ? res.redirect("/resto/all-company")
                : res.redirect("/resto/products/menu");
        });
    } catch (err) {
        console.log(`ERROR, cont/login, ${err.message}`)
        res.json({state: "fail", message: err.message});
    }
};

companyController.logout = (req, res) => {
    try {
        console.log("GET cont/logout");
        req.session.destroy(function () {
            res.redirect("/resto");
        });
    } catch (err) {
        console.log(`ERROR, cont/logout, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};

companyController.validateAuthCompany = (req, res, next) => {
    if (req.session?.member?.mb_type === "COMPANY") {
        req.member = req.session.member;
        next();
    } else res.json({state: "fail", message: "only authenticated members with company type"})
};

companyController.validateAdmin = (req, res, next) => {
    if (req.session?.member?.mb_type === "ADMIN") {
        req.member = req.session.member;
        next();
    } else {
        const html = `<script>
                      alert("Admin page: Permission denied!");
                      window.location.replace("/resto");
                      </script>`
        res.end(html);
    }
};

companyController.checkSessions = (req, res) => {
    if (req.session?.member) {
        res.json({state: 'success', data: req.session.member});
    } else {
        res.json({state: "fail", message: "You aren't authenticated"});
    }
};

companyController.getAllCompanies = async (req, res) => {
    try {
        console.log("GET cont/getAllCompanies");
        const company = new Company();
        const companies_data = await company.getAllCompaniesData();
        res.render("all-companies", {companies_data: companies_data});

    } catch (err) {
        console.log(`ERROR, cont/getAllCompanies, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
}


companyController.updateCompanyByAdmin = async (req, res) => {
    try {
        console.log("GET cont/updateCompanyByAdmin");

        const company = new Company();
        const result = await company.updateCompanyByAdminData(req.body);  // body qismdan datani oladi
        await res.json({state: "success", data: result});  // natija success bolsa res.json ko'rinishda front-ent ga  ma'lumot yuboryabdi
    } catch (err) {
        console.log(`ERROR, cont/updateCompanyByAdmin, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
}
