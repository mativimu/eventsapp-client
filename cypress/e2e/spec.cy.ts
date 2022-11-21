describe('Login', () => {
  it('Try to login with valid data and then logout', () => {
    cy.visit('/login')
    cy.get('[name="email"]').eq(0).type('mativimu@gmail.com');
    cy.get('[name="password"]').eq(1).type('M4T!');
    cy.get('[name="login-btn"]').click();
    cy.url().should('include', 'main');
    cy.get('[name="logout-btn"]').click();
    cy.url().should('include', 'home');
  },);
  it('Try to login with invalid data', () => {
    cy.visit('/login')
    cy.get('[name="email"]').eq(0).type('matias@gmail.com');
    cy.get('[name="password"]').eq(1).type('M4T$');
    cy.get('[name="login-btn"]').click();
    cy.contains('Usuario no registrado.');
  },);
  it('Try to login with valid email and invalid password', () => {
    cy.visit('/login')
    cy.get('[name="email"]').eq(0).type('mativimu@gmail.com');
    cy.get('[name="password"]').eq(1).type('M4T$');
    cy.get('[name="login-btn"]').click();
    cy.contains('Contraseña inválida.');
  },);
  it('Try to login with invalid email and valid password', () => {
    cy.visit('/login')
    cy.get('[name="email"]').eq(0).type('mativim@gmail.com');
    cy.get('[name="password"]').eq(1).type('M4T!');
    cy.get('[name="login-btn"]').click();
    cy.contains('Usuario no registrado.');
  },)
})
