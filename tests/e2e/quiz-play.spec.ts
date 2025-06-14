import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/**', (route, request) => {
    const headers = {
      ...request.headers(),
      'X-Test-Run': 'true',
    };
    route.continue({ headers });
  });
});

test('test', async ({ page }) => {
  await page.goto('https://localhost:4200/');
  await page.getByRole('link', { name: 'quiz image 1 Question' }).click();
  await page.getByRole('button', { name: 'Commencer le quiz !' }).click();
  await page.getByText('une réponse').click();
  await page.getByRole('button', { name: 'Valider' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.locator('app-play-final-step')).toContainText('Avec un score de 1 / 1');
  await expect(page.getByRole('heading', { name: 'Vous avez fini le quiz' })).toBeVisible();
  await expect(page.getByText('Question#01 ma questiondes dé')).toBeVisible();
  await expect(page.locator('app-play-final-step')).toMatchAriaSnapshot(`
    - heading "Vous avez fini le quiz" [level=1]
    - paragraph: Avec un score de 1 / 1
    - paragraph: Voulez-vous sauvegarder votre score ?
    - link "Se connecter":
      - /url: /login?redirectUrl=%2Fplay%2F682f33b68e000018365bd65c
    - link "S'inscrire":
      - /url: /register?redirectUrl=%2Fplay%2F682f33b68e000018365bd65c
    - paragraph: Question
    - paragraph: /#\\d+/
    - paragraph: ma question
    - paragraph: des détails
    - paragraph: "Vous avez répondu:"
    - list:
      - listitem: une réponse
    - link "Retour à la page d'accueil":
      - /url: /
    `);
});