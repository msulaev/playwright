import { test, expect } from "@playwright/test"

test('Product page add to basket', async ({ page }) => {
  await page.goto("http://localhost:2221");
  const addToBasketBtn = page.locator('[data-qa=product-button]').first();
  const busketCounter = page.locator('[data-qa=header-basket-count]');
  await addToBasketBtn.waitFor();
  await expect(addToBasketBtn).toHaveText("Add to Basket");
  await expect(busketCounter).toHaveText('0');
  await addToBasketBtn.click();
  await expect(addToBasketBtn).toHaveText("Remove from Basket");
  await expect(busketCounter).toHaveText('1');
  const checkoutLink = await page.locator('[data-qa=desktop-nav-link]').filter({ hasText: 'Checkout' });
  await checkoutLink.click();
  await page.waitForURL("http://localhost:2221/busket");
})