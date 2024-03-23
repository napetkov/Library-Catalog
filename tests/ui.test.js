const { expect, test } = require('@playwright/test');
const baseURL = "http://localhost:3000/";
const testEmail = "peter@abv.bg";
const testPassword = "123456";



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
    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)
    await page.click('input[type="submit"]');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
})

test("Verify 'My Books' button is visible after user logged in", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)
    await page.click('input[type="submit"]');

    const myBookButton = await page.$('a[href="/profile"]');
    const isButtonVisible = await myBookButton.isVisible();

    expect(isButtonVisible).toBe(true);
})


test("Verify 'Add Book' button is visible after user logged in", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)
    await page.click('input[type="submit"]');

    const addBookButton = await page.$('a[href="/create"]');
    const isButtonVisible = await addBookButton.isVisible();

    expect(isButtonVisible).toBe(true);
})

test("Verify Logout button is visible after user logged in", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)
    await page.click('input[type="submit"]');

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutButtonVisible = await logoutButton.isVisible();

    expect(isLogoutButtonVisible).toBe(true);
})

test("Verify username email address is visible after user logged in", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)
    await page.click('input[type="submit"]');

    const addBookButton = await page.$('#user > span');
    const isButtonVisible = await addBookButton.isVisible();

    expect(isButtonVisible).toBe(true);
})

test("Login with valid credential", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');

    expect(page.url()).toBe(baseURL + "/catalog");
})

test("Submit form with empty input fields", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept();

        await page.$('a[href="/login"]');
        expect(page.url()).toBe(baseURL + "/login")
    })
})

test("Submit form with empty Email input field", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#password', testPassword)
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept();

        await page.$('a[href="/login"]');
        expect(page.url()).toBe(baseURL + "/login")
    })
})

test("Submit form with empty Password input field", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/login"]');
    await page.fill('#email', testEmail)
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept();

        await page.$('a[href="/login"]');
        expect(page.url()).toBe(baseURL + "/login")
    })
})



test("Submit the Register Form with Empty Values", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/register"]');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept();

        await page.$('a[href="/register"]');
        expect(page.url()).toBe(baseURL + "/register")
    })
})


test("Submit the Register Form with Empty email field", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/register"]');
    await page.fill('#password', testPassword)
    await page.fill('#repeat-pass', testPassword)
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept();

        await page.$('a[href="/register"]');
        expect(page.url()).toBe(baseURL + "/register")
    })
})

test("Submit the Register Form with Empty Password field", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/register"]');
    await page.fill('#email', testEmail)
    await page.fill('#repeat-pass', testPassword)
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept();

        await page.$('a[href="/register"]');
        expect(page.url()).toBe(baseURL + "/register")
    })
})

test("Submit the Register Form with Empty Confirm password field", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/register"]');
    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept();

        await page.$('a[href="/register"]');
        expect(page.url()).toBe(baseURL + "/register")
    })
})

test("Submit the Register Form with Empty email & password fields", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/register"]');
    await page.fill('#repeat-pass', testPassword)
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept();

        await page.$('a[href="/register"]');
        expect(page.url()).toBe(baseURL + "/register")
    })
})

test("Submit the Register Form with Empty Password & Confirm password fields", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/register"]');
    await page.fill('#email', testEmail)
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept();

        await page.$('a[href="/register"]');
        expect(page.url()).toBe(baseURL + "/register")
    })
})

test("Submit the Register Form with Empty Email & Confirm password fields", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/register"]');
    await page.fill('#email', testEmail)
    await page.fill('#repeat-pass', testPassword)
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept();

        await page.$('a[href="/register"]');
        expect(page.url()).toBe(baseURL + "/register")
    })
})

const registerEmail = "pesho2@abv.bg"

test("Submit the Form with Valid Values", async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('nav.navbar');

    await page.click('a[href="/register"]');
    await page.fill('#email', registerEmail)
    await page.fill('#password', testPassword)
    await page.fill('#repeat-pass', testPassword)
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');

    expect(page.url()).toBe(baseURL + "/catalog");
    await page.click('#logoutBtn');
})

test('Add book with correct data', async({ page }) => {
    await page.goto(baseURL + "/login");

    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)

    await Promise.all([
          page.click('input[type="submit"]'),
          page.waitForURL(baseURL + "/catalog")
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is the test book description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form input[type="submit"]');
    
    await page.waitForURL(baseURL + "/catalog")

    expect(page.url()).toBe(baseURL + "/catalog")
})

test('Add book with empty title input field', async({ page }) => {
    await page.goto(baseURL + "/login");

    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)

    await Promise.all([
          page.click('input[type="submit"]'),
          page.waitForURL(baseURL + "/catalog")
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#description', 'This is the test book description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form input[type="submit"]');
    
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept();

        await page.$('a[href="/create"]');
        expect(page.url()).toBe(baseURL + "/create")
    })
})

test('Add book with empty image URl input field', async({ page }) => {
    await page.goto(baseURL + "/login");

    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)

    await Promise.all([
          page.click('input[type="submit"]'),
          page.waitForURL(baseURL + "/catalog")
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is the test book description');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form input[type="submit"]');
    
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept();

        await page.$('a[href="/create"]');
        expect(page.url()).toBe(baseURL + "/create")
    })
})

test('Add book with empty description input field', async({ page }) => {
    await page.goto(baseURL + "/login");

    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)

    await Promise.all([
          page.click('input[type="submit"]'),
          page.waitForURL(baseURL + "/catalog")
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    
    await page.fill('#title', 'Test Book');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form input[type="submit"]');
    
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept();

        await page.$('a[href="/create"]');
        expect(page.url()).toBe(baseURL + "/create")
    })
})

test('Login and verify all books are displayed', async ({ page }) => {
    await page.goto(baseURL + "/login");

    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)
  
    await Promise.all([
      page.click('input[type="submit"]'), 
      page.waitForURL(baseURL + "/catalog") 
    ]);
  
    await page.waitForSelector('.dashboard');
  
    const bookElements = await page.$$('.other-books-list li');
  
    expect(bookElements.length).toBeGreaterThan(0);
  });

  test('Login and navigate to Details page', async ({ page }) => {
    await page.goto(baseURL + "/login");

    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)
  
    await Promise.all([
      page.click('input[type="submit"]'), 
      page.waitForURL(baseURL + "/catalog") 
    ]);

    await page.click('a[href="/catalog"]');
  
    await page.waitForSelector('.otherBooks');
  
    await page.click('.otherBooks a.button');
  
    await page.waitForSelector('.book-information');
  
    const detailsPageTitle = await page.textContent('.book-information h3');

    expect(detailsPageTitle).toBe('Test Book'); 
  });

  test('Verify visibility of Logout button after user login', async ({ page }) => {
    await page.goto(baseURL + "/login");

    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)

    await page.click('input[type="submit"]');
  
    const logoutLink = await page.$('a[href="javascript:void(0)"]');
  
    const isLogoutLinkVisible = await logoutLink.isVisible();
  
    expect(isLogoutLinkVisible).toBe(true);
  });
  
  test('Verify redirection of Logout link after user login', async ({ page }) => {
    await page.goto(baseURL + "/login");

    await page.fill('#email', testEmail)
    await page.fill('#password', testPassword)

    await page.click('input[type="submit"]');
    
    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    await logoutLink.click();
    await page.waitForURL(baseURL)

    const redirectedURL = page.url();
    expect(redirectedURL).toBe(baseURL);
  });