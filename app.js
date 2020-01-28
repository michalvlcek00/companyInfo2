const request = require("request");
const base64 = require("base-64");
const readline = require("readline-sync");

const key = "t0GZcGYb3GuxKe9gvrowWqnMMXxVOosptKLq05sC";
let reg_num = readline.question("Type company registration number: ");

const options = {
    url: `https://api.companieshouse.gov.uk/company/${reg_num}`,
    headers: {
        Authorization: `Basic ${base64.encode(key)}`
    }
};

request(options, (error, response, body) => {
    if (error || response.statusCode != 200) {
        console.warn("This company doesn't exist.");
    } else {
        let company = JSON.parse(body);
        let name = company.company_name.toUpperCase();
        let address = Object.values(company.registered_office_address).join(", ");

        console.log("Name: " + name + "\nAdress: " + address);
    }
});
