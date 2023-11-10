const assert = require('assert');

Feature('Liking Restaurants');
 
Before(({ I }) => {
    I.amOnPage('/#/favorite');
});
  Scenario('showing empty liked restaurants', ({ I }) => {
    I.dontSeeElement('.restaurant-item');
});
Scenario('liking one restaurant', async ({ I }) => {
  I.dontSeeElement('.restaurant-item');

  I.amOnPage('/');

  I.seeElement('.list-city a');
  const firstRestaurant = locate('.list-city a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.list-item');
  const likedRestaurantName = await I.grabTextFrom('.list-title');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

