
const express = require("express");
const { faker } = require('@faker-js/faker');
const app = express();
const port = 8000;
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

const createUser = () => {
    const newUser = {
        _id: faker.datatype.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(firstName, lastName),
        password: faker.internet.password(),
        phoneNumber: faker.phone.phoneNumber('###-###-###')
    };
    return newUser;
};

const createCompany = () => {
    const newCompany = {
        _id: faker.datatype.uuid(),
        name: faker.person.fullName(),
        address: {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode(),
            country: faker.address.country()
        }
    };
    return newCompany;
};

app.get("/api/users/new", (req, res) => {
    const newFakerUser = createUser();
    res.json({ newFakerUser });
});

app.get("/api/companies/new", (req, res) => {
    const newFakerCompany = createCompany();
    res.json({ newFakerCompany });
});

app.get("/api/user/company", (req, res) => {
    const newFakerUser = createUser();
    const newFakerCompany = createCompany();
    res.json({ newFakerUser, newFakerCompany });
});

app.listen( port, () => console.log(`Listening on port: ${port}`) );