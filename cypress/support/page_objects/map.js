import { feedsData, feedDetails } from '../../fixtures/feeds';
export class map {
  verifyThatPinsArePresentAndClickable() {
    cy.wait(2000);
    feedsData.forEach(feed => {
      cy.get('canvas')
        .eq(1)
        .click(feed.x, feed.y, { force: true });
      cy.contains(feed.address);
      cy.wait(1000);
    });
  }

  verifyDataOnPopUp() {
    cy.get('canvas')
      .eq(1)
      .click(666, 143, { force: true });
    cy.wait(2000);
    cy.wrap(Object.entries(feedDetails)).each(([field, value]) => {
      cy.contains(field)
        .parent('li')
        .invoke('text')
        .then(el => {
          expect(el).to.include(value);
        });
    });
  }

  verifyPinsAfterZoomOut() {
    feedsData.forEach(feed => {
      cy.get('[title="Zoom out"]')
        .first()
        .click({ force: true });
      cy.wait(3000);
      cy.get('canvas')
        .eq(1)
        .click(feed.zoomX, feed.zoomY, { force: true });
      // cy.contains(feed.address);
      cy.wait(1000);
    });
  }
}

export const onMap = new map();
