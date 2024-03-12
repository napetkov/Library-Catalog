const { expect, test } = require('@playwright/test');
const baseURL = "http://localhost:3000";


test("Verify All Book link is visible", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
})

test("Verify Login button link is visible", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();

    expect(isLoginButtonVisible).toBe(true);
})

test("Verify Register button link is visible", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();

    expect(isRegisterButtonVisible).toBe(true);
})


test("Verify All Book link is visible after user logged in", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', "peter@abv.bg")
    await page.fill('#password', "123456")
    await page.click('input[type="submit"]');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
})

test("Verify 'My Books' button is visible after user logged in", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', "peter@abv.bg")
    await page.fill('#password', "123456")
    await page.click('input[type="submit"]');

    const myBookButton = await page.$('a[href="/profile"]');
    const isButtonVisible = await myBookButton.isVisible();

    expect(isButtonVisible).toBe(true);
})


test("Verify 'Add Book' button is visible after user logged in", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', "peter@abv.bg")
    await page.fill('#password', "123456")
    await page.click('input[type="submit"]');

    const addBookButton = await page.$('a[href="/create"]');
    const isButtonVisible = await addBookButton.isVisible();

    expect(isButtonVisible).toBe(true);
})

test("Verify Logout button is visible after user logged in", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', "peter@abv.bg")
    await page.fill('#password', "123456")
    await page.click('input[type="submit"]');

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutButtonVisible = await logoutButton.isVisible();

    expect(isLogoutButtonVisible).toBe(true);
})

test("Verify username email address is visible after user logged in", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', "peter@abv.bg")
    await page.fill('#password', "123456")
    await page.click('input[type="submit"]');

    const addBookButton = await page.$('#user > span');
    const isButtonVisible = await addBookButton.isVisible();

    expect(isButtonVisible).toBe(true);
})
